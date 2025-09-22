import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity, ActivityDocument } from './schema/activity.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel('Activity')
    private readonly activityModel: Model<ActivityDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async logActivity(dto: CreateActivityDto): Promise<Activity> {
    const sender = await this.userService.findById(dto.senderId);
    const recipient = await this.userService.findById(dto.recipientId);

    if (!sender || !recipient) {
      throw new NotFoundException('User Does not Exist');
    }

    const activity = await this.activityModel.create({
      ...dto,
      sender: dto.senderId,
      recipient: dto.recipientId,
    });

    return activity;
  }

  async getActivities(
    userId: string,
    page: number,
    pageSize: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    return {
      total: await this.activityModel.count({ recipient: userId }),
      data: await this.activityModel
        .find({
          recipient: userId,
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
        })
        .populate('sender', {
          id: 1,
          profilePicture: 1,
          accountName: 1,
          email: 1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec(),
    };
  }

  async getUnreadActivities(userId: string) {
    return {
      total: await this.activityModel.count({
        recipient: userId,
        read: false,
      }),
      data: await this.activityModel
        .find({
          recipient: userId,
          read: false,
        })
        .populate('sender', {
          id: 1,
          profilePicture: 1,
          accountName: 1,
          email: 1,
        })
        .exec(),
    };
  }

  async markAsRead(userId: string, activityId: string) {
    await this.activityModel
      .findByIdAndUpdate(
        {
          _id: activityId,
          read: false,
          recipient: userId,
        },
        {
          read: true,
        },
      )
      .exec();
    return;
  }

  async getAllActivities(
    page: number,
    pageSize: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const activities = await this.activityModel
      .find({
        dateCreated: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .sort({ createdAt: -1 })
      .populate('sender', {
        id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
      })
      .populate('recipient', {
        id: 1,
        profilePicture: 1,
        accountName: 1,
        email: 1,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: activities,
      total: await this.activityModel.count(),
    };
  }

  async deleteActivity(activityIds: string[]) {
    for (const activityId of activityIds) {
      await this.activityModel.findByIdAndDelete(activityId);
    }
    return 'deleted successfully';
  }

  async sendActivity(
    senderId: string,
    recipientId: string,
    body: string,
    title: string,
    type: string,
    adType: string,
  ) {
    const sender = await this.userService.findById(senderId);
    if (!sender) {
      return;
    }
    const activity = new CreateActivityDto(
      recipientId,
      senderId,
      title,
      body,
      type,
      sender.userID,
      adType,
    );
    await this.logActivity(activity);
    return activity;
  }
}
