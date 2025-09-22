import { NotificationsService } from './../notifications/notifications.service';
import {
  BadRequestException,
  CACHE_MANAGER,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdDto, VerifyAdPaymentDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdDocument, AdStatus, AdType } from './schemas/ad.schema';
import { Model, SortOrder } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { PaymentService } from 'src/payment/payment.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { TransactionService } from 'src/wallet/transaction.service';
import { TransactionDto } from 'src/wallet/dto/transaction.dto';
import { TransactionType } from 'src/wallet/schemas/transaction.schema';
import { NotificationType } from 'src/notifications/schemas/notificationSchema';
import { ObjectId } from 'mongodb';
import { GetAdDto } from './dto/get-ad-dto';
import { isDifferenceOverAMonth } from '../utils/utils';

@Injectable()
export class AdsService {
  constructor(
    @InjectModel('Ad')
    private readonly adsModel: Model<AdDocument>,
    private readonly transactionService: TransactionService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private paymentService: PaymentService,
    private notificationService: NotificationsService,
  ) {}
  public async create(createAdDto: CreateAdDto, user: UserDocument) {
    if (!user.phoneNumberVerified && !user.emailVerified)
      throw new UnauthorizedException(
        'You have to verify one of your forms of identity before you can place ads',
      );
    if (createAdDto.type == AdType.DIRECT_LINK && createAdDto.images.length > 0)
      throw new BadRequestException(`Direct link ads don't have images`);

    const no_of_running_ads = await this.adsModel.countDocuments({
      ['completed']: false,
      ['creator']: user._id,
      ['isPaid']: true,
    });

    if (no_of_running_ads >= 6) {
      throw new ForbiddenException(
        'You cannot have more than 6 running ads per time',
      );
    }

    if (
      createAdDto.type !== 'direct-link' &&
      createAdDto.type !== 'visual' &&
      createAdDto.type !== 'detail'
    ) {
      throw new BadRequestException(
        'You can only place an advert of type direct-link, visual or detail',
      );
    }
    const res = await this.paymentService.pay({
      amount: createAdDto.budget * 100,
      email: user.email,
      callbackUrl: createAdDto.redirectUrl,
    });
    const ad = new this.adsModel({
      ...createAdDto,
      creator: user._id,
      approvalStatus: false,
      paymentRef: res.reference,
    });

    switch (createAdDto.type) {
      case 'direct-link': {
        const rate = 25;
        const target = Math.floor(createAdDto.budget / rate);

        ad.rate = rate;
        ad.approvalStatus = true;
        ad.target = target;
        break;
      }
      case 'visual': {
        const rate = 5000;
        const target = Math.floor(createAdDto.budget / rate);

        ad.rate = rate;
        ad.approvalStatus = true;
        ad.target = target;
        break;
      }
      case 'detail': {
        const rate = 50;
        const target = Math.floor(createAdDto.budget / rate);

        ad.rate = rate;
        ad.approvalStatus = true;
        ad.target = target;
        break;
      }
    }

    ad.save();
    this.notifyAllPromoters(user, ad.type, ad.productName, ad.id);
    return {
      success: true,
      data: {
        ad: await ad.populate('creator', {
          _id: 1,
          profilePicture: 1,
          accountName: 1,
        }),
        paymentDetails: res,
      },
      msg: 'advertisement created successfully',
    };
  }

  async notifyAllPromoters(
    user: UserDocument,
    adType: AdType,
    adName: string,
    adId: string,
  ) {
    const promoters = await this.userService.getAllPromoterAccounts();
    promoters.forEach((promoter) => {
      this.notificationService.createNotification({
        title: NotificationType.NewAdvert,
        body: this.notificationService.PrefillNotificationBody({
          title: NotificationType.NewAdvert,
          name: user.accountName,
          adType: adType,
          adName: adName,
        }),
        sender: user,
        ad: adId,
        receiver: promoter,
      });
    });
  }

  async updateAdStatus(status: AdStatus, id: string) {
    if (!Object.values(AdStatus).includes(status))
      throw new BadRequestException('Invalid status type');
    const ad = await this.adsModel.findByIdAndUpdate(
      id,
      {
        adStatus: status,
      },
      {
        new: true,
      },
    );

    if (!ad) throw new NotFoundException(`No ad with id ${id} was found`);
    return {
      success: true,
      data: ad,
      message: 'Ad update successful',
    };
  }

  async fetchUserAds(id: string, status: AdStatus) {
    if (!Object.values(AdStatus).includes(status))
      throw new BadRequestException('Invalid status type');
    const ads = await this.adsModel
      .find({ creator: id, adStatus: status })
      .populate('creator', {
        _id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
        userID: 1,
      })
      .exec();
    return { success: true, data: ads };
  }

  async fetchAllUserAds(
    id: string,
    active: boolean = false,
    startDate?: Date,
    endDate?: Date,
  ) {
    let query = {};
    if (active) {
      query = { isPaid: true, approvalStatus: true, completed: false };
    }
    const user = await this.userService.findById(id);
    const ads = await this.adsModel
      .find({
        creator: id,
        dateCreated: {
          $gte: startDate,
          $lte: endDate,
        },
        ...query,
      })
      .populate('creator', {
        _id: 1,
        profilePicture: 1,
        email: 1,
        accountName: 1,
      })
      .exec();
    return { success: true, data: this.mapAdObject(ads, user) };
  }

  async verifyPaymentHook(dto: VerifyAdPaymentDto) {
    const ad = await this.adsModel
      .findOne({
        paymentRef: dto.reference,
      })
      .exec();
    if (ad.isPaid && ad.approvalStatus) {
      return {
        url: `https://app.ad-promoter.com/placers/adcreator/success`,
      };
    }
    ad.isPaid = true;
    const res: any = await this.paymentService.verify(dto);

    if (res.data.status !== 'success')
      return {
        url: `https://app.ad-promoter.com/placers/adcreator/failure`,
      };

    ad.approvalStatus = true;
    await this.adsModel.findByIdAndUpdate({ _id: ad.id }, ad);

    const transactionDto = new TransactionDto();
    transactionDto.amount = ad.budget;
    transactionDto.type = TransactionType.CREDIT;
    transactionDto.user = ad.creator.toString();

    await this.transactionService.create(transactionDto);

    return { url: `https://app.ad-promoter.com/placers/adcreator/success` };
  }

  public async verifyAdvertPayment(dto: VerifyAdPaymentDto) {
    const ad = await this.adsModel
      .findOne({
        paymentRef: dto.reference,
      })
      .exec();
    if (ad.isPaid && ad.approvalStatus) {
      return {
        url: `https://app.ad-promoter.com/placers/adcreator/success`,
      };
    }
    ad.isPaid = true;
    const res: any = await this.paymentService.verify(dto);

    if (res.data.status !== 'success')
      return {
        url: `https://app.ad-promoter.com/placers/adcreator/failure`,
      };

    ad.approvalStatus = true;
    await this.adsModel.findByIdAndUpdate({ _id: ad.id }, ad);

    const transactionDto = new TransactionDto();
    transactionDto.amount = ad.budget;
    transactionDto.type = TransactionType.CREDIT;
    transactionDto.user = ad.creator.toString();

    await this.transactionService.create(transactionDto);
    return { url: `https://app.ad-promoter.com/placers/adcreator/success` };
  }

  public async findAll(
    page: number,
    pageSize: number,
    query: string = '',
    user: UserDocument,
  ) {
    const userObject = await this.userService.findById(user);
    const ads = await this.adsModel
      .find(
        {
          productName: { $regex: query, $options: 'i' },
          isPaid: true,
          completed: false,
          adStatus: { $ne: 'completed' },
          _id: {
            $nin: userObject.deletedAdsId.map((id) => new ObjectId(id)),
          },
        },
        AdsService.returnDocumentProjection(),
      )
      .sort({ dateCreated: -1 })
      .populate('creator', {
        _id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
        userID: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      success: true,
      data: {
        total: await this.adsModel.count({ isPaid: true }),
        data: this.mapAdObject(ads, user),
      },
      msg: 'advertisment retrieved successfully',
    };
  }

  async getTopCreators(pageSize: number) {
    const topCreators = await this.adsModel.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: '$creator',
          amountPaid: {
            $sum: '$budget',
          },
          count: {
            $count: {},
          },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $project: {
          creator: 1,
          amountPaid: 1,
          adverts: '$count',
          _id: 1,
        },
      },
      {
        $sort: {
          amountPaid: -1,
        },
      },
      {
        $limit: Number(pageSize),
      },
    ]);
    return { count: topCreators.length, data: topCreators };
  }

  public async GetReportedAds(page: number, pageSize: number) {
    const findQuery = { $exists: true };

    const reportedAds = await this.adsModel
      .find(
        { reports: findQuery },
        {
          _id: 1,
          productName: 1,
          type: 1,
          approvalStatus: 1,
          conversions: 1,
          target: 1,
          budget: 1,
          dateCreated: 1,
        },
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      success: true,
      data: {
        total: await this.adsModel.count({ reports: findQuery }),
        data: reportedAds,
      },
      msg: 'Reported ad fetched successfully',
    };
  }

  public async getAdsReports(adId: string) {
    const reports = await this.adsModel
      .find(
        { _id: adId },
        {
          _id: 1,
          productName: 1,
          type: 1,
          adStatus: 1,
          conversions: 1,
          target: 1,
          reports: 1,
        },
      )
      .populate('reports', {
        _id: 1,
        reportReason: 1,
      })
      .exec();
    return reports;
  }

  async getPlacerDashboard(
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const spendStats = await this.getUserAdSpendStats(user, startDate, endDate);
    const adCount = await this.getUserAdCount(user, startDate, endDate);
    const { conversionRate } = await this.getConversionGrowthRate(
      user,
      startDate,
      endDate,
    );

    return { spendStats, adCount, conversionRate };
  }

  public async getUserAdSpendStats(
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const userAds = await this.adsModel.find({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      approvalStatus: true,
    });
    if (!userAds[0]) {
      return {
        amountFunded: 0,
        amountPaidOut: 0,
        amountUnpaid: 0,
      };
    }

    let amountFunded = 0;
    let amountPaidOut = 0;
    for (const i in userAds) {
      amountFunded += userAds[i].budget;
      if (userAds[i].type == 'direct-link') {
        amountPaidOut += userAds[i].rate * userAds[i].clicks;
      } else if (userAds[i].type == 'detail') {
        amountPaidOut += userAds[i].rate * userAds[i].conversions;
      } else {
        amountPaidOut += userAds[i].rate * userAds[i].approvedVisualAd;
      }
    }

    return {
      amountFunded,
      amountPaidOut,
      amountUnpaid: amountFunded - amountPaidOut,
    };
  }

  public async getUserAdCount(
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const runningAds = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      isPaid: true,
      completed: false,
    });
    const visualAds = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      type: AdType.VISUAL,
      isPaid: true,
    });
    const detailAds = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      type: AdType.DETAIL,
      isPaid: true,
    });
    const directLinkAds = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      type: AdType.DIRECT_LINK,
      isPaid: true,
    });
    const completedAds = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      completed: true,
      isPaid: true,
    });
    return {
      runningAds,
      visualAds,
      detailAds,
      directLinkAds,
      completedAds,
    };
  }

  public async getDetailedAdCount(startDate?: Date, endDate?: Date) {
    const approvedVisualAds = await this.adsModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            type: 'visual',
            ['isPaid']: true,
            ['approvalStatus']: true,
          }
        : {
            type: 'visual',
            ['isPaid']: true,
            ['approvalStatus']: true,
          },
    );
    const visualAds = await this.adsModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            type: 'visual',
            isPaid: true,
          }
        : {
            type: 'visual',
            isPaid: true,
          },
    );
    const detailAds = await this.adsModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            type: 'detail',
            isPaid: true,
          }
        : {
            type: 'detail',
            isPaid: true,
          },
    );
    const directLinkAds = await this.adsModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            type: 'direct-link',
            isPaid: true,
          }
        : {
            type: 'direct-link',
            isPaid: true,
          },
    );

    const totalAdCount = await this.adsModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            isPaid: true,
          }
        : {
            isPaid: true,
          },
    );

    return {
      approvedVisualAds,
      visualAds,
      detailAds,
      directLinkAds,
      pendingVisualAds: visualAds - approvedVisualAds,
      totalAdCount,
    };
  }

  public async getAdsByDate(
    startDate: Date,
    endDate: Date,
    user: UserDocument,
    page: number,
    pageSize: number,
  ) {
    const ads = await this.adsModel
      .find(
        {
          isPaid: true,
          completed: false,
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
          adStatus: { $ne: 'completed' },
        },
        AdsService.returnDocumentProjection(),
      )
      .sort({ dateCreated: -1 })
      .populate('creator', {
        _id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      success: true,
      data: this.mapAdObject(ads, user),
      msg: 'advertisement queried successfully',
    };
  }

  public async queryAdsByDate(
    startDate: Date,
    endDate: Date,
    user: UserDocument,
  ) {
    isDifferenceOverAMonth(startDate, endDate);

    const ads = await this.adsModel.find(
      {
        dateCreated: {
          $gte: startDate,
          $lte: endDate,
        },
        creator: user.id,
      },
      {
        dateCreated: 1,
        productName: 1,
      },
    );
    return {
      success: true,
      data: {
        ads,
        sorted: this.sortObjectsByDate(
          ads,
          'dateCreated',
          startDate.toISOString().substring(0, 10),
          endDate.toISOString().substring(0, 10),
        ),
      },
      msg: 'advertisement queried successfully',
    };
  }

  public async;

  private sortObjectsByDate(
    objList: Array<any>,
    dateField: string,
    startDate: string,
    endDate: string,
  ) {
    const dateDict: { [key: string]: Array<any> } = {};

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      const dateKey = currentDate.toISOString().substring(0, 10);
      dateDict[dateKey] = [];

      currentDate.setDate(currentDate.getDate() + 1);
    }

    objList.forEach((obj) => {
      const dateStr = obj[dateField];
      const date = new Date(dateStr);
      const dateKey = date.toISOString().substring(0, 10);

      if (dateKey >= startDate && dateKey <= endDate) {
        dateDict[dateKey].push(obj);
      }
    });

    return dateDict;
  }

  public async findOne(id: string) {
    const ad = await this.adsModel.findOne({
      _id: new ObjectId(id),
      isPaid: true,
    });
    if (!ad) {
      throw new NotFoundException(
        "This advert either doesn't exist or has been deleted",
      );
    }

    ad.populate('creator', {
      _id: 1,
      profilePicture: 1,
      accountName: 1,
      email: 1,
      userID: 1,
    });

    return ad;
  }

  public async getGraphDetails(userId: string) {
    // 7 days, Number of active ads on on each day
    // lt, Date.now() or moment
    const plotPoints = await this.adsModel.aggregate([
      {
        $match: {
          creator: userId,
        },
      },
      {
        $group: {
          _id: '$createdAt',
        },
      },
    ]);
  }

  public async adExists(id: string) {
    const adCount = await this.adsModel.countDocuments({
      _id: new ObjectId(id),
    });
    if (adCount < 1)
      throw new NotFoundException(
        "This advert either doesn't exist or has been deleted",
      );
    return true;
  }

  private static sortAds(
    popular?: boolean,
    recent?: boolean,
  ): string | { [key: string]: SortOrder } {
    const sort: { [key: string]: SortOrder } = {};
    if (popular == true) {
      sort['conversions'] = -1;
      return sort;
    } else if (recent == true) {
      sort['dateCreated'] = -1;
      return sort;
    } else {
      sort['creator'] = -1;
      return sort;
    }
  }

  private async getUserAds(
    page: number,
    pageSize: number,
    user: UserDocument,
    adType?: string,
    startDate?: Date,
    endDate?: Date,
    popular?: boolean,
    recent?: boolean,
  ) {
    const userObject = await this.userService.findById(user);
    return this.adsModel
      .find(
        {
          _id: {
            $nin: userObject.deletedAdsId.map((id) => new ObjectId(id)),
          },
          isPaid: true,
          completed: false,
          approvalStatus: true,
          adStatus: AdStatus.INCOMPLETE,
          dateCreated: { $gte: startDate, $lt: endDate },
          type: { $regex: new RegExp(adType, 'i') },
        },
        AdsService.returnDocumentProjection(),
      )
      .sort(AdsService.sortAds(popular, recent))
      .populate('creator', {
        _id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  public async GetPersonalAds(
    page: number,
    pageSize: number,
    user: UserDocument,
    query?: string,
    startDate?: Date,
    endDate?: Date,
    adType?: string,
    popular?: boolean,
    recent?: boolean,
  ) {
    let ads: AdDocument[] = [];
    if (query == null || query == '') {
      ads = await this.getUserAds(
        page,
        pageSize,
        user,
        adType,
        startDate,
        endDate,
        popular,
        recent,
      );
    } else
      ads = await this.searchAds(
        page,
        pageSize,
        query,
        startDate,
        endDate,
        adType,
        popular,
        recent,
      );

    let mappedAds: GetAdDto[] = this.mapAdObject(ads, user);

    return {
      success: true,
      data: mappedAds,
      msg: 'advertisment fetched successfully',
    };
  }

  public mapSingleAdObject(ad: AdDocument) {
    let mappedAd: GetAdDto = new GetAdDto();
    switch (ad.type) {
      case AdType.VISUAL: {
        mappedAd.achieved = ad.approvedVisualAd;
        break;
      }
      case AdType.DETAIL: {
        mappedAd.achieved = ad.conversions;
        break;
      }
      case AdType.DIRECT_LINK: {
        mappedAd.achieved = ad.clicks;
        break;
      }
    }
    mappedAd.id = ad.id;
    mappedAd.productName = ad.productName;
    mappedAd.tags = ad.tags;
    mappedAd.type = ad.type;
    mappedAd.images = ad.images;
    mappedAd.promotions = ad.promotions;
    mappedAd.promotedLink = ad.promotedLink;
    mappedAd.creator = ad.creator;
    mappedAd.dateCreated = ad.dateCreated;
    mappedAd.adStatus = ad.adStatus;
    mappedAd.cta = ad.CTAButtonDesign;
    mappedAd.target = ad.target;
    mappedAd.reports = ad.reports;
    mappedAd.feedback = ad.feedback;
    mappedAd.paymentRef = ad.paymentRef;
    mappedAd.isPaid = ad.isPaid;
    mappedAd.description = ad.description;
    mappedAd.budget = ad.budget;
    mappedAd.paymentRef = ad.paymentRef;
    mappedAd.clicks = ad.clicks;
    mappedAd.conversions = ad.conversions;
    mappedAd.approvedVisualAd = ad.approvedVisualAd;
    return mappedAd;
  }

  mapAdObject(ads: AdDocument[], user?: UserDocument) {
    let mappedAds: GetAdDto[] = [];
    console.log(ads);
    ads.forEach((ad) => {
      let mappedAd: GetAdDto = new GetAdDto();
      switch (ad.type) {
        case AdType.VISUAL: {
          mappedAd.achieved = ad.approvedVisualAd;
          break;
        }
        case AdType.DETAIL: {
          mappedAd.achieved = ad.conversions;
          console.log(mappedAd.achieved);
          break;
        }
        case AdType.DIRECT_LINK: {
          mappedAd.achieved = ad.clicks;
          break;
        }
      }
      mappedAd.id = ad.id;
      mappedAd.isPromoted =
        user.promotedAds == null ? false : user.promotedAds.includes(ad.id);
      mappedAd.isSaved =
        user.savedJobs == null ? false : user.savedJobs.includes(ad.id);
      mappedAd.productName = ad.productName;
      mappedAd.tags = ad.tags;
      mappedAd.type = ad.type;
      mappedAd.images = ad.images;
      mappedAd.promotions = ad.promotions;
      mappedAd.promotedLink = ad.promotedLink;
      mappedAd.creator = ad.creator;
      mappedAd.dateCreated = ad.dateCreated;
      mappedAd.adStatus = ad.adStatus;
      mappedAd.cta = ad.CTAButtonDesign;
      mappedAd.target = ad.target;
      mappedAd.reports = ad.reports;
      mappedAd.feedback = ad.feedback;
      mappedAd.paymentRef = ad.paymentRef;
      mappedAd.isPaid = ad.isPaid;
      mappedAd.description = ad.description;
      mappedAd.budget = ad.budget;
      mappedAd.paymentRef = ad.paymentRef;
      mappedAd.clicks = ad.clicks;
      mappedAd.conversions = ad.conversions;
      mappedAd.approvedVisualAd = ad.approvedVisualAd;

      mappedAds.push(mappedAd);
    });
    return mappedAds;
  }

  private static returnDocumentProjection() {
    return {
      _id: 1,
      productName: 1,
      description: 1,
      tags: 1,
      isPromoted: 1,
      images: 1,
      promotedLink: 1,
      creator: 1,
      dateCreated: 1,
      budget: 1,
      adStatus: 1,
      cta: 1,
      target: 1,
      reports: 1,
      feedback: 1,
      paymentRef: 1,
      clicks: 1,
      isPaid: 1,
      promotions: 1,
      approvedVisualAd: 1,
      type: 1,
      conversions: 1,
    };
  }

  public async getConversionGrowthRate(
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const ads = await this.adsModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      creator: user._id,
      isPaid: true,
    });
    if (ads <= 0) {
      return { conversionRate: 0 };
    }
    const totalVisitors = await this.adsModel.aggregate([
      {
        $match: {
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
          ['creator']: user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$clicks' },
        },
      },
    ]);
    const totalConversions = await this.adsModel.aggregate([
      {
        $match: {
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
          ['creator']: user._id,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$conversions' },
        },
      },
    ]);

    const conversionRate = Number(
      ((totalConversions[0].total * 100) / totalVisitors[0].total).toFixed(2),
    );

    return {
      conversionRate: conversionRate ? conversionRate : 0,
    };
  }

  public async update(
    id: string,
    user: UserDocument,
    updateAdDto: UpdateAdDto,
  ) {
    const ad = await this.findOne(id);

    if (ad.creator !== user._id) {
      throw new ForbiddenException(
        "You're not allowed to edit the ads of a different placer",
      );
    }
    await this.adsModel.findByIdAndUpdate(id, updateAdDto);
    return {
      success: true,
      data: await this.findOne(id),
      msg: 'advertisment updated successfully',
    };
  }

  public async remove(id: string, userID: string) {
    return {
      success: true,
      msg: 'Ad deleted successfully',
      data: await this.adsModel.findByIdAndDelete({ _id: id }),
    };
  }

  private async searchAds(
    page: number,
    pageSize: number,
    query: string,
    startDate?: Date,
    endDate?: Date,
    adType?: string,
    popular?: boolean,
    recent?: boolean,
  ) {
    return this.adsModel
      .find(
        {
          tags: { $in: [new RegExp(query, 'i')] },
          isPaid: true,
          completed: false,
          approvalStatus: true,
          adStatus: AdStatus.INCOMPLETE,
          dateCreated: { $gte: startDate, $lt: endDate },
          type: { $regex: new RegExp(adType, 'i') },
        },
        AdsService.returnDocumentProjection(),
      )
      .populate('creator', {
        id: 1,
        accountName: 1,
        userID: 1,
        profilePicture: 1,
      })
      .sort(AdsService.sortAds(popular, recent))
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }

  public async searchAdsByName(
    page: number,
    pageSize: number,
    query: string,
    user: UserDocument,
  ) {
    const ads = await this.adsModel
      .find(
        {
          productName: { $regex: new RegExp(query, 'i') },
          isPaid: true,
          completed: false,
        },
        AdsService.returnDocumentProjection(),
      )
      .populate('creator', {
        id: 1,
        accountName: 1,
        userID: 1,
        profilePicture: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      success: true,
      msg: ' Ads fetched successfully',
      data: {
        total: await this.adsModel.count({
          productName: { $regex: new RegExp(query, 'i') },
          isPaid: true,
          completed: false,
        }),
        data: this.mapAdObject(ads, user),
      },
    };
  }

  public async getSavedAds(
    page: number,
    pageSize: number,
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const savedAds = user.savedJobs;
    const filter = {
      _id: { $in: savedAds },
      isPaid: true,
      completed: false,
      adStatus: { $ne: 'completed' },
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    let ads = [];
    if (savedAds.length > 0) {
      ads = await this.adsModel
        .find(filter, AdsService.returnDocumentProjection())
        .populate('creator', {
          _id: 1,
          profilePicture: 1,
          accountName: 1,
          email: 1,
          userID: 1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
    }

    return {
      success: true,
      msg: ' Ads fetched successfully',
      data: {
        total: savedAds.length > 0 ? await this.adsModel.count(filter) : 0,
        data: this.mapAdObject(ads, user),
      },
    };
  }

  public async GetRecentAds(
    page: number,
    pageSize: number,
    query: string,
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const recentAdsIds = user.recentAds;
    let ads = [];
    const filter = {
      _id: { $in: recentAdsIds },
      isPaid: true,
      completed: false,
      adStatus: { $ne: 'completed' },
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
    };
    if (recentAdsIds.length > 0) {
      ads = await this.adsModel
        .find(filter, AdsService.returnDocumentProjection())
        .populate('creator', {
          _id: 1,
          profilePicture: 1,
          accountName: 1,
          email: 1,
          userID: 1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();
    }

    return {
      success: true,
      msg: ' Ads fetched successfully',
      data: {
        total: recentAdsIds.length > 0 ? await this.adsModel.count(filter) : 0,
        data: this.mapAdObject(ads, user),
      },
    };
  }

  public async searchAdsByTags(
    page: number,
    pageSize: number,
    query: string = '',
    user: UserDocument,
  ) {
    const filter = {
      tags: { $regex: new RegExp(query, 'i') },
      isPaid: true,
      completed: false,
      approvalStatus: true,
      adStatus: AdStatus.INCOMPLETE,
    };
    const ads = await this.adsModel
      .find(filter, AdsService.returnDocumentProjection())
      .populate('creator', {
        id: 1,
        accountName: 1,
        userID: 1,
        profilePicture: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return {
      success: true,
      msg: 'Recommended ads fetched successfully',
      data: {
        total: await this.adsModel.count(filter),
        data: this.mapAdObject(ads, user),
      },
    };
  }

  public async recommendedAds(
    user: UserDocument,
    page: number,
    pageSize: number,
    query: string = '',
    startDate: Date,
    endDate: Date,
    adType?: string,
    recent?: boolean,
    popular?: boolean,
  ) {
    const mostUsedTags = user.mostUsedTags;
    const regexString = mostUsedTags.join('|');
    let searchParams;
    if (adType === null || adType === '') {
      searchParams = {
        tags: { $regex: new RegExp(regexString, 'i') },
        productName: { $regex: query, $options: 'i' },
        isPaid: true,
        completed: false,
        dateCreated: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else {
      searchParams = {
        tags: { $regex: new RegExp(regexString, 'i') },
        productName: { $regex: query, $options: 'i' },
        isPaid: true,
        type: adType,
        completed: false,
        dateCreated: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    }
    let ads = [];
    let count = 0;
    if (mostUsedTags.length > 0) {
      ads = await this.adsModel
        .find(searchParams, AdsService.returnDocumentProjection())
        .sort(AdsService.sortAds(popular, recent))
        .populate('creator', {
          id: 1,
          accountName: 1,
          userID: 1,
          profilePicture: 1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      count = await this.adsModel.count(searchParams);
    }
    return {
      success: true,
      msg: 'Recommended ads fetched successfully',
      data: {
        total: count,
        data: this.mapAdObject(ads, user),
      },
    };
  }

  async updateByQuery(advertId: string, query) {
    return this.adsModel.findByIdAndUpdate(advertId, query, { new: true });
  }
}
