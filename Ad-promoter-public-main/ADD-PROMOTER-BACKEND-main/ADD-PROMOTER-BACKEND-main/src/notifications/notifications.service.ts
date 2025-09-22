import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationDocument,
  NotificationType,
} from './schemas/notificationSchema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dtos/createNotificationDto';
import { UserService } from '../user/user.service';
import { UserDocument } from '../user/schemas/user.schema';
import { NotificationsDto } from './dtos/GetNotificationsDto';
import { AdType } from '../ads/schemas/ad.schema';
import { GetNotificationsDto } from './dtos/getNotificationDto';
import { GetAdDto } from 'src/ads/dto/get-ad-dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<NotificationDocument>,
  ) {}

  public async createNotification(
    createNotificationDto: CreateNotificationDto,
  ) {
    const notification = new this.notificationModel({
      title: createNotificationDto.title,
      body: createNotificationDto.body,
      sender: createNotificationDto.sender,
      ad: createNotificationDto.ad,
      receiver: createNotificationDto.receiver,
      promotionLink: createNotificationDto.promotionLink,
    });

    await notification.save();
    return;
  }

  public async getAllNotifications(
    page: number,
    pageSize: number,
    user: UserDocument,
  ) {
    const notifications = await this.notificationModel
      .find(
        {
          receiver: user._id,
        },
        {
          title: true,
          body: true,
          isRead: true,
          DateCreated: true,
          promotionLink: true,
        },
      )
      .populate('sender', {
        profilePicture: 1,
        accountName: 1,
        email: 1,
      })
      .populate('ad', {
        promotions: 0,
        reports: 0,
        feedback: 0,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    let mappedNotifications: GetNotificationsDto[] = this.mapNotificationObject(
      notifications,
      user,
    );

    return {
      success: true,
      data: {
        total: await this.notificationModel.count({ receiver: user._id }),
        data: mappedNotifications,
      },
      msg: 'Notifications query successful',
    };
  }

  public async MarkNotificationAsRead(
    notificationId: string,
    user: UserDocument,
  ) {
    const notification = await this.notificationModel.findByIdAndUpdate(
      { _id: notificationId, receiver: user._id },
      { isRead: true },
      { new: true },
    );
    await notification.populate('ad', {
      promotions: 0,
      reports: 0,
      feedback: 0,
    });
    await notification.populate('sender', {
      profilePicture: 1,
      accountName: 1,
      email: 1,
    });
    return {
      success: true,
      data: notification,
      msg: 'Notification successfully marked as read',
    };
  }

  public async getUnreadNotifications(
    status: boolean,
    page: number,
    pageSize: number,
    user: UserDocument,
  ) {
    const notifications = await this.notificationModel
      .find(
        {
          receiver: user._id,
          isRead: status,
        },
        {
          title: true,
          body: true,
          isRead: true,
          DateCreated: true,
          promotionLink: true,
        },
      )
      .populate('ad', {
        promotions: 0,
        reports: 0,
        feedback: 0,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    return {
      success: true,
      data: {
        total: await this.notificationModel.count({
          receiver: user._id,
          isRead: status,
        }),
        data: notifications,
      },
      msg: 'Notifications query successful',
    };
  }

  private mapNotificationObject(
    notifications: NotificationDocument[],
    user: UserDocument,
  ) {
    let mappedNotifications: GetNotificationsDto[] = [];
    if (notifications.length < 1) {
      return mappedNotifications;
    }
    notifications.forEach((notification) => {
      let mappedNotification: GetNotificationsDto = new GetNotificationsDto();
      if (notification.ad) {
        let mappedAd: GetAdDto = new GetAdDto();
        let ad: any = notification.ad;
        mappedAd.id = ad.id ? ad.id : ad._id.toString();
        mappedAd.isPromoted =
          user.promotedAds == null
            ? false
            : user.promotedAds.includes(ad._id.toString());
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
        mappedAd.conversions = ad.conversions;
        mappedNotification.ad = mappedAd;
      }
      mappedNotification._id = notification._id;
      mappedNotification.id = notification._id.toString();
      mappedNotification.title = notification.title;
      mappedNotification.body = notification.body;
      mappedNotification.promotionLink = notification.promotionLink;
      mappedNotification.sender = notification.sender;
      mappedNotification.receiver = notification.receiver;
      mappedNotification.isRead = notification.isRead;
      mappedNotification.DateCreated = notification.DateCreated;
      mappedNotifications.push(mappedNotification);
    });
    return mappedNotifications;
  }

  public PrefillNotificationBody(notificationDto: NotificationsDto) {
    switch (notificationDto.title) {
      case NotificationType.AccountGrowth:
        const body = `${notificationDto.name} just promoted your ${notificationDto.adType} advert (${notificationDto.adName}), be among the first promoters to promote her advert.`;
        if (notificationDto.adType == AdType.VISUAL)
          return `${body} To see your visual advert on her social media page.`;
        else return body;
      case NotificationType.VisualAdApproved:
        return `${notificationDto.name} Visual Promotion of your advert ${notificationDto.adName}, Head to this link to check it out ${notificationDto.url}`;
      case NotificationType.AimReached:
        return `Congrats! Your visual advert has successfully reached it’s aim of ${notificationDto.aim} videos.`;
      case NotificationType.NewAdvert:
        return `${notificationDto.name} just placed a new ${notificationDto.adType} Advert (${notificationDto.adName}), be among the first promoters to promote her advert.`;
      case NotificationType.WalletDebit:
        return `Your debit request of ₦${notificationDto.walletDebit} from your wallet has been successfully processed. Go to wallet to confirm.`;
      case NotificationType.SocialRequestUpdate: {
        return `${notificationDto.name}, Your social request has been ${
          notificationDto.socialRequestStatus ? 'accepted' : 'declined'
        }`;
      }
    }
  }
}
