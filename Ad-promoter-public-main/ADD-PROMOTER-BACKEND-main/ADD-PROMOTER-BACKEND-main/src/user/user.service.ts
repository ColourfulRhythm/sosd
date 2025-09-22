import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChangePasswordDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { WalletDocument } from 'src/wallet/schemas/wallet.schema';
import * as crypto from 'crypto';
import { ResetPasswordDto } from 'src/auth/dto/auth.dto';
import { AdsService } from 'src/ads/ads.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PromotionService } from 'src/promotion/promotion.service';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { UpdateTagsDto } from './dto/UpdateTagsDto';
import { RecentAdsDto } from './dto/recentAdsDto';
import { GoogleAuthSetup } from '../auth/dto/GoogleAuthSetup';
import { GoogleOnboardingDto } from './dto/googleOnboarding.dto';
import { isDifferenceOverAMonth } from '../utils/utils';
import { NotificationType } from 'src/notifications/schemas/notificationSchema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
    @InjectModel('Wallet')
    private readonly walletModel: Model<WalletDocument>,
    @Inject(forwardRef(() => AdsService))
    private readonly adsService: AdsService,
    @Inject(forwardRef(() => PromotionService))
    private readonly promotionService: PromotionService,
    private readonly notificationService: NotificationsService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    newUser.phoneNumberVerified = true;
    const newWallet = new this.walletModel({
      walletOwner: newUser._id,
    });
    newWallet.save();
    newUser.wallet = newWallet._id;
    await newUser.save();
    newUser.password = undefined;
    return newUser;
  }

  public async createSocialAuthUser(data: any) {
    const newUser = new this.userModel(data);
    newUser.phoneNumberVerified = true;
    const newWallet = new this.walletModel({
      walletOwner: newUser._id,
    });
    newWallet.save();
    newUser.wallet = newWallet._id;
    await newUser.save();
    newUser.password = undefined;
    return newUser;
  }

  public async ToggleNotifications(
    dto: UpdateNotificationsDto,
    userId: string,
  ) {
    await this.userModel.findByIdAndUpdate(userId, { ...dto });
    return dto;
  }

  public findById(userID) {
    return this.userModel.findOne({ _id: userID }).populate('wallet');
  }

  public findByPhoneNumber(phoneNumber: string) {
    return this.userModel.findOne({ phoneNumber: phoneNumber });
  }

  public findByEmail(email: string) {
    return this.userModel.findOne({
      email: {
        $regex: new RegExp('^' + email + '$', 'i'),
      },
    });
  }

  public async update(
    user: UserDocument,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: user._id },
      updateUserDto,
      { new: true },
    );
    return updatedUser;
  }

  async googleOnboarding(user: UserDocument, dto: GoogleOnboardingDto) {
    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: user._id },
      dto,
      { new: true },
    );
    return updatedUser;
  }

  public async changePassword(dto: ChangePasswordDto, user: UserDocument) {
    const pwMatch: boolean = await bcrypt.compare(
      dto.previousPasssword,
      user.password,
    );

    if (!pwMatch) throw new UnauthorizedException('Wrong Credentials');
    const SALT = 10;
    const hashedPassword = await bcrypt.hash(dto.newPassword, SALT);
    user.password = hashedPassword;
    user.save();

    return {
      success: true,
      msg: 'user password successfully changed',
    };
  }

  public async UpdateDeletedAds(adId: string, user: UserDocument) {
    await this.adsService.adExists(adId);
    const users = await this.userModel.findByIdAndUpdate(
      user,
      {
        $addToSet: {
          deletedAdsId: adId,
        },
      },
      { new: true },
    );
    return {
      success: true,
      data: users,
      msg: 'user successfully updated',
    };
  }

  public async GoogleAuthSetUp(
    googleAuth: GoogleAuthSetup,
    user: UserDocument,
  ) {
    if (googleAuth.seeVisual) user.seeVisual = googleAuth.seeVisual;
    if (googleAuth.socialLink) user.socialLink = googleAuth.socialLink;
    if (googleAuth.googleId) user.googleId = googleAuth.googleId;
    if (googleAuth.role) user.role = googleAuth.role;

    const updatedUser = await this.userModel.findByIdAndUpdate(user._id, user, {
      new: true,
    });

    return updatedUser;
  }

  public async getAllPromoterAccounts() {
    return this.userModel.find({ role: Role.PROMOTER });
  }

  public async getUserDetailedCount(startDate?: Date, endDate?: Date) {
    const promoters = await this.userModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            ['role']: Role.PROMOTER,
          }
        : { ['role']: Role.PROMOTER },
    );
    const placers = await this.userModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            ['role']: Role.PLACER,
          }
        : { ['role']: Role.PLACER },
    );
    const subAdmins = await this.userModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            ['role']: Role.SUBADMIN,
          }
        : {
            ['role']: Role.SUBADMIN,
          },
    );
    const admins = await this.userModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
            ['role']: Role.ADMIN,
          }
        : {
            ['role']: Role.ADMIN,
          },
    );

    const totalUsers = await this.userModel.countDocuments(
      (startDate && endDate != null) || undefined || ''
        ? {
            dateCreated: {
              $gte: startDate,
              $lte: endDate,
            },
          }
        : {},
    );

    return {
      promoters,
      placers,
      subAdmins,
      admins,
      totalUsers,
    };
  }

  async createPasswordResetToken(userId: string) {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const passwordResetExpires = Date.now() + 10 * 60 * 1000;

    const user = await this.userModel.findByIdAndUpdate(userId, {
      passwordResetToken: passwordResetToken,
      passwordResetExpires: passwordResetExpires,
    });

    if (!user) {
      throw new NotFoundException('User Token not set');
    }

    return resetToken;
  }

  async verifyResetToken(token: string) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new BadRequestException('Token has expired or is invalid');
    }
    return user;
  }

  async saveJob(jobId: string, userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          savedJobs: jobId,
        },
      },
      {
        new: true,
      },
    );
    await this.addRecentAds(jobId, user);

    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return 'Job Saved';
  }

  async unsaveJob(jobId: string, userId: string) {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $pullAll: {
          savedJobs: [
            {
              _id: jobId,
            },
          ],
        },
      },
      {
        new: true,
      },
    );

    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return 'Job removed from saved';
  }

  public async getSavedJobs(
    page: number,
    pageSize: number,
    user: UserDocument,
    startDate?: Date,
    endDate?: Date,
  ) {
    return this.adsService.getSavedAds(
      page,
      pageSize,
      user,
      startDate,
      endDate,
    );
  }

  async userDashboard(user: UserDocument, startDate?: Date, endDate?: Date) {
    let dashboard;
    switch (user.role) {
      case Role.PLACER: {
        // isDifferenceOverAMonth(startDate, endDate);
        dashboard = await this.adsService.getPlacerDashboard(
          user,
          startDate,
          endDate,
        );
        break;
      }
      case Role.PROMOTER: {
        // isDifferenceOverAMonth(startDate, endDate);
        dashboard = await this.promotionService.getPromotersDashboard(
          user,
          startDate,
          endDate,
        );
        break;
      }
      case Role.ADMIN: {
        // isDifferenceOverAMonth(startDate, endDate);
        const userDetailedCount = await this.getUserDetailedCount(
          startDate,
          endDate,
        );
        const adDetailedCount = await this.adsService.getDetailedAdCount(
          startDate,
          endDate,
        );

        dashboard = {
          userDetailedCount,
          adDetailedCount,
        };
        break;
      }
      case Role.SUBADMIN: {
        // isDifferenceOverAMonth(startDate, endDate);
        const userDetailedCount = await this.getUserDetailedCount(
          startDate,
          endDate,
        );
        const adDetailedCount = await this.adsService.getDetailedAdCount(
          startDate,
          endDate,
        );

        dashboard = {
          userDetailedCount,
          adDetailedCount,
        };
        break;
      }
      default: {
        dashboard = null;
        break;
      }
    }

    return dashboard;
  }

  async updateResetPassword(userId: string, userData: ResetPasswordDto) {
    const user = await this.userModel.findByIdAndUpdate(userId, {
      password: userData.password,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    });
    return user;
  }

  public remove(id: string) {
    return this.userModel.findByIdAndDelete({ _id: id });
  }

  public async addRecentAds(ad: string, user: UserDocument) {
    await this.adsService.adExists(ad);
    if (!user.recentAds || user.recentAds.length < 1)
      await this.userModel.findByIdAndUpdate(user.id, {
        recentAds: [ad],
      });
    else
      await this.userModel.findByIdAndUpdate(user.id, {
        $addToSet: { recentAds: ad },
      });
    return;
  }

  public async addTags(userId: string, dto: UpdateTagsDto) {
    const user = await this.findById(userId);

    dto.tags.every((tag) => {
      if (typeof tag !== 'string')
        throw new BadRequestException('Only strings allowed');
    });
    let currentTags = [...user.mostUsedTags];

    if (dto.tags.length > 10)
      throw new BadRequestException('Too many tags. 10 is the limit');
    currentTags.push(...dto.tags);

    let newTags = Array.from(new Set(currentTags));
    if (newTags.length > 10) {
      newTags.splice(0, newTags.length - 10);
    }

    const updatedUser = this.userModel.findByIdAndUpdate(
      { _id: user._id },
      { mostUsedTags: newTags },
      { new: true },
    );

    return updatedUser;
  }

  async getSocialRequests(page: number = 1, pageSize: number = 10) {
    const requests = await this.userModel
      .find({
        seeVisualAd: true,
        socialLinkVerified: false,
        role: Role.PROMOTER,
      })
      .select(
        '_id id userID profilePicture accountName phoneNumber email role socialLink gender createdAt updatedAt',
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      count: requests.length,
      total: await this.userModel.count({
        seeVisualAd: true,
        socialLinkVerified: false,
        role: Role.PROMOTER,
      }),
      data: requests,
    };
  }

  async editSocialRequest(
    userId: string,
    socialRequestStatus: boolean,
    user: UserDocument,
  ) {
    const receiver = await this.findById(userId);
    if (!receiver) {
      throw new NotFoundException('User with this id does not exist');
    }
    await this.notificationService.createNotification({
      title: NotificationType.AccountGrowth,
      body: this.notificationService.PrefillNotificationBody({
        title: NotificationType.SocialRequestUpdate,
        socialRequestStatus: socialRequestStatus,
        name: user.accountName,
      }),
      sender: user,
      receiver: receiver,
    });
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        socialLinkVerified: socialRequestStatus,
      },
      { new: true },
    );
  }

  public async getMostUsedTags(userId: string) {
    const user = await this.userModel.findOne(
      { id: userId },
      { mostUsedTags: true },
    );
    console.log(user);
    return user.mostUsedTags;
  }
}
