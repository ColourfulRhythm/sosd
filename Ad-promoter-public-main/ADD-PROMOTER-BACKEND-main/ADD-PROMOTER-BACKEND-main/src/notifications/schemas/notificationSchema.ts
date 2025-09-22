import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { Document, ObjectId } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { Ad } from '../../ads/schemas/ad.schema';

export type NotificationDocument = Notification & Document;

export enum NotificationType {
  AccountGrowth = 'Account growth Alert',
  VisualAdAccountGrowth = 'Account growth Alert',
  NewAdvert = 'New Advert Alert',
  WalletDebit = 'Wallet Debit Alert',
  AimReached = 'Account growth Alert',
  SocialRequestUpdate = 'Social Request Update',
  VisualAdApproved = 'Visual Ad Appproved',
}

@Schema({
  timestamps: true,
})
export class Notification {
  @Transform(({ value }) => value.toString())
  public _id: ObjectId;

  @Prop()
  public title: string;

  @Prop()
  public body: string;

  @Prop()
  public promotionLink: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Ad' })
  public ad: Ad;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  public sender: User;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  public receiver: User;

  @Prop({ default: false })
  public isRead: boolean;

  @Prop({ default: Date.now })
  public DateCreated: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
