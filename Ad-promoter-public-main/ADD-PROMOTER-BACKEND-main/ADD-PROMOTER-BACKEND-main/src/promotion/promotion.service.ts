import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdsService } from 'src/ads/ads.service';
import { PromotionDocument, PromotionStatus } from './schemas/promotion.schema';
import mongoose, { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { VisualPromotionDto } from './dto/visual-promotion.dto';
import { WalletDocument } from 'src/wallet/schemas/wallet.schema';
import { UserService } from 'src/user/user.service';
import {
  TransactionDocument,
  TransactionType,
} from 'src/wallet/schemas/transaction.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { ActivitiesService } from 'src/activities/activities.service';
import { ActivityType } from 'src/activities/schema/activity.schema';
import { TransactionDto } from 'src/wallet/dto/transaction.dto';
import { TransactionService } from 'src/wallet/transaction.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notificationSchema';
import { PayoutsService } from 'src/payouts/payouts.service';
import { AdType } from 'src/ads/schemas/ad.schema';

@Injectable()
export class PromotionService {
  private baseAdUrl = 'https://app.ad-promoter.com/ad';
  constructor(
    @InjectModel('Promotion')
    private readonly promotionModel: Model<PromotionDocument>,
    private readonly walletService: WalletService,
    private readonly activitiesService: ActivitiesService,
    private readonly transactionService: TransactionService,
    private adService: AdsService,
    private readonly notificationService: NotificationsService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => PayoutsService))
    private payoutsService: PayoutsService,
  ) {}
  public async create(adID: string, user: UserDocument) {
    if (!user.emailVerified && !user.phoneNumberVerified) {
      return 'You need to verify your phone number / email before you start placing ads';
    }
    const ad = await (await this.adService.findOne(adID)).depopulate('creator');
    if (!ad) {
      throw new NotFoundException('This Advertisment does not exist');
    }
    if (!ad.approvalStatus || !ad.isPaid) {
      throw new ForbiddenException(
        'Only Aprroved Ads are premitted to be promoted',
      );
    }
    if (ad.type == 'visual') {
      throw new ForbiddenException(
        'Visual ads cannot be promoted  through this route',
      );
    }
    const _promotion = await this.promotionModel.findOne({
      ad: ad._id,
      promoter: user._id,
    });

    if (_promotion) {
      return {
        success: true,
        promotionRef: _promotion.uniqueCode,
        uniqueLink: `${this.baseAdUrl}/${ad.id}?ref=${_promotion.uniqueCode}`,
        promotedUrl: ad.promotedLink,
      };
    }

    const promotion = new this.promotionModel({
      promoter: user._id,
      ad: ad._id,
      approvedForPayment: true,
      adType: ad.type,
    });

    await user.updateOne(
      {
        _id: user._id,
      },
      {
        $addToSet: {
          promotedAds: [ad.id],
        },
      },
    );

    await ad.updateOne(
      {
        _id: ad.id,
      },
      {
        $addToSet: {
          promotions: [promotion.id],
        },
      },
    );
    ad.save();
    promotion.save();
    user.save();
    await this.userService.addRecentAds(adID, user);
    await this.notificationService.createNotification({
      title: NotificationType.AccountGrowth,
      body: this.notificationService.PrefillNotificationBody({
        title: NotificationType.VisualAdAccountGrowth,
        adName: ad.productName,
        adType: promotion.adType,
        name: user.accountName,
      }),
      sender: user,
      ad: ad.id,
      receiver: ad.creator,
      promotionLink: promotion.link,
    });
    await this.activitiesService.sendActivity(
      user.id,
      ad.creator._id.toString(),
      `${ad.productName} has just been promoted`,
      `New Promotion`,
      ActivityType.PROMOTION,
      `(${ad.type})`,
    );

    return {
      success: true,
      promotionRef: promotion.uniqueCode,
      uniqueLink: `${this.baseAdUrl}/${ad.id}?ref=${promotion.uniqueCode}`,
      promotedUrl: ad.promotedLink,
    };
  }

  async promoteVisualAd(dto: VisualPromotionDto, user: UserDocument) {
    if (!user.emailVerified && !user.phoneNumberVerified) {
      return 'You need to verify your phone number / email before you start promoting ads';
    }
    const ad = await (
      await this.adService.findOne(dto.adID)
    ).depopulate('creator');
    if (!ad.approvalStatus) {
      throw new ForbiddenException(
        'Only approved and paid ads are premitted to be promoted',
      );
    }
    if (ad.type !== 'visual') {
      throw new ForbiddenException(
        'Only Visual ads can to be promoted through this route',
      );
    }
    const promotionExists = await this.promotionModel.findOne({
      ad: ad._id,
      promoter: user._id,
    });

    if (promotionExists) {
      throw new ForbiddenException(
        "you're not allowed to promote the same advert twice",
      );
    }
    const promotion = await this.promotionModel.create({
      link: dto.link,
      promoter: user._id,
      ad: ad._id,
      approvedForPayment: false,
      adType: 'visual',
    });

    ad.promotions.push(promotion._id);
    user.promotedAds.push(ad.id);
    await ad.save();
    await user.save();

    await this.userService.addRecentAds(ad._id.toString(), user);
    await this.notificationService.createNotification({
      title: NotificationType.AccountGrowth,
      body: this.notificationService.PrefillNotificationBody({
        title: NotificationType.VisualAdAccountGrowth,
        adName: ad.productName,
        adType: promotion.adType,
        name: user.accountName,
      }),
      ad: ad.id,
      sender: user,
      receiver: ad.creator,
      promotionLink: promotion.link,
    });
    console.log('here');
    await this.activitiesService.sendActivity(
      user.id,
      ad.creator._id.toString(),
      `${ad.productName} has just been promoted`,
      `New Promotion`,
      ActivityType.PROMOTION,
      `(${ad.type})`,
    );

    console.log('here 2');
    return { success: true, code: promotion.uniqueCode };
  }

  async updateVisualPromotion(
    promotionId: string,
    userId: string,
    status: PromotionStatus,
  ) {
    if (!Object.values(PromotionStatus).includes(status)) {
      throw new BadRequestException(
        'Status must be a value of PromotionStatusEnum',
      );
    }
    const promotion = await this.promotionModel.findById(promotionId);
    if (promotion.adType != 'visual') {
      throw new ForbiddenException(
        'only visual promotions can get processed here',
      );
    }
    if (promotion.approvedForPayment == true) {
      throw new ForbiddenException(
        'This promotion has been previously processed!',
      );
    }

    const promoter = await this.userService.findById(promotion.promoter);
    const ad = await (
      await this.adService.findOne(promotion.ad.toString())
    ).depopulate('creator');
    const wallet = await this.walletService.findOne(
      promoter.depopulate('wallet'),
    );
    if (ad.completed) {
      throw new ForbiddenException("Adverstisment has met it's  target");
    }
    if (status === PromotionStatus.APPROVED) {
      await this.promotionModel.findByIdAndUpdate(
        { _id: promotion._id },
        {
          approvedForPayment: true,
          status: status,
          $inc: { amountEarned: 5000 },
        },
      );
      await this.walletService.creditWallet(wallet.id, 0.8 * 5000);

      const transactionDto = new TransactionDto();
      transactionDto.amount = 0.8 * ad.rate;
      transactionDto.type = TransactionType.CREDIT;
      transactionDto.user = ad.creator.toString();
      await this.transactionService.create(transactionDto);

      ad.approvedVisualAd += 1;
      if (ad.approvedVisualAd == ad.target) {
        ad.completed = true;
        await this.notificationService.createNotification({
          title: NotificationType.AimReached,
          body: this.notificationService.PrefillNotificationBody({
            title: NotificationType.AccountGrowth,
            aim: ad.target.toString(),
            adType: AdType.VISUAL,
            name: promoter.accountName,
            adName: ad.productName,
          }),
          ad: ad.id,
          sender: promoter,
          receiver: ad.creator,
        });
      }

      ad.save();
      promotion.save();

      await this.notificationService.createNotification({
        title: NotificationType.VisualAdAccountGrowth,
        body: this.notificationService.PrefillNotificationBody({
          title: NotificationType.VisualAdApproved,
          url: promotion.link,
          name: promoter.accountName,
          adName: ad.productName,
        }),
        ad: ad.id,
        sender: promoter,
        receiver: ad.creator,
      });
      await this.activitiesService.sendActivity(
        promoter._id.toString(),
        ad.creator._id.toString(),
        `${promotion.id} has just been approved for payment`,
        `Approved Visual Payment`,
        ActivityType.PROMOTION_STATUS,
        `(${ad.type})`,
      );

      return {
        success: true,
        promotion,

        msg: 'promotion successfully updated',
      };
    }

    await this.promotionModel.findByIdAndUpdate(
      { _id: promotion._id },
      {
        status: status,
      },
    );

    return {
      success: true,
      promotion,
      msg: 'promotion successfully updated',
    };
  }
  findAll(page: number, pageSize: number) {
    return this.promotionModel
      .find()
      .populate('promoter')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  findOne(id) {
    return this.promotionModel
      .findOne({ _id: id })
      .populate(['promoter', 'ad']);
  }

  async remove(id: string, user: UserDocument) {
    const promotion = await this.promotionModel.findById({ _id: id });
    if (user.id !== promotion.promoter._id.toString())
      throw new UnauthorizedException(
        'Only owners of promotions are allowed to delete their promotions',
      );

    await this.promotionModel.findByIdAndDelete({ _id: id });
    return {
      success: true,
      msg: 'promotion successfully deleted',
    };
  }

  async getUnapprovedVisualPromotions(page: number, pageSize: number) {
    const unapprovedPromotions = await this.promotionModel
      .find({
        approvedForPayment: false,
        status: PromotionStatus.IN_REVIEW,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('promoter');
    return {
      data: unapprovedPromotions,
      count: unapprovedPromotions.length,
      total: await this.promotionModel.count({
        approvedForPayment: false,
      }),
    };
  }

  async getDetailedPromotionCount() {
    const totalPromotions = await this.promotionModel.count();
    const approvedVisualPromotions = await this.promotionModel.count({
      ['adType']: 'visual',
      ['approvedForPayment']: true,
    });
    const pendingVisualPromotions = await this.promotionModel.count({
      ['adType']: 'visual',
      ['approvedForPayment']: false,
    });

    const detailPromotions = await this.promotionModel.count({
      ['adType']: 'detail',
    });
    const directLinkPromotions = await this.promotionModel.count({
      ['adType']: 'direct-link',
    });

    return {
      totalPromotions,
      approvedVisualPromotions,
      pendingVisualPromotions,
      detailPromotions,
      directLinkPromotions,
    };
  }

  async getUserPromotions(userId: string, page: number, pageSize: number) {
    console.log(userId);
    const user = await this.userService.findById(userId);
    const promotions = await this.promotionModel
      .find({
        promoter: user._id,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('ad');

    return {
      success: true,
      data: {
        total: await this.promotionModel.count({
          promoter: user._id,
        }),
        data: promotions,
      },
    };
  }
  async getPromotersDashboard(
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    const totalBalance = await (
      await this.walletService.findOne(user)
    ).walletBalance;
    const adsPromoted = await this.promotionModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      promoter: user._id,
    });

    const noOfVideosAccepted = await this.promotionModel.count({
      dateCreated: {
        $gte: startDate,
        $lte: endDate,
      },
      ['promoter']: user._id,
      ['adType']: 'visual',
      ['approvedForPayment']: true,
    });
    const { totalWithdrawals, pendingWithdrawals } =
      await this.payoutsService.userPayoutsBreakdown(user.id);

    const noOfAdsConverted = await this.promotionModel.find({
      promoter: user._id,
      adType: AdType.DETAIL,
    });
    console.log(noOfAdsConverted);
    const convertedAds = noOfAdsConverted.reduce(
      (accumulator, promotion) => accumulator + promotion.conversions,
      0,
    );
    const noOfVisitors = await this.promotionModel.find({
      promoter: user._id,
      adType: AdType.DIRECT_LINK,
    });
    console.log(noOfVisitors);
    const visits = noOfVisitors.reduce(
      (accumulator, promotion) => accumulator + promotion.clicks,
      0,
    );

    return {
      totalBalance,
      adsPromoted,
      noOfVideosAccepted,
      pendingWithdrawals,
      totalWithdrawals,
      noOfAdsConverted: convertedAds,
      noOfVisitors: visits,
    };
  }

  async getTopPromoters(pageSize: number) {
    const topPromoters = await this.promotionModel.aggregate([
      {
        $match: {
          approvedForPayment: true,
        },
      },
      {
        $group: {
          _id: '$promoter',
          amountEarned: {
            $sum: '$amountEarned',
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
          as: 'promoter',
        },
      },
      {
        $project: {
          promoter: 1,
          amountEarned: 1,
          promotions: '$count',
          _id: 0,
        },
      },
      {
        $sort: {
          amountEarned: -1,
        },
      },
      {
        $limit: pageSize,
      },
    ]);
    return topPromoters;
  }

  async updateByQuery(promotionId: string, query): Promise<PromotionDocument> {
    return this.promotionModel.findByIdAndUpdate(promotionId, query, {
      new: true,
    });
  }
}
