import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

import mongoose, { Document } from 'mongoose';
import { Ad } from 'src/ads/schemas/ad.schema';
import { Wallet } from 'src/wallet/schemas/wallet.schema';
import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

export enum Role {
  ADMIN = 'admin',
  SUBADMIN = 'sub admin',
  PROMOTER = 'promoter',
  PLACER = 'placer',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ default: uuid })
  userID: string;

  @Prop()
  profilePicture: string;

  @Prop({ default: false })
  phoneNumberVerified: boolean;

  @Prop({ default: '' })
  gender: string;

  @Prop()
  socialLink: string;

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop()
  accountName: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  dateCreated: Date;

  @Prop()
  phoneNumber: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ default: false })
  seeVisualAd: boolean;

  @Prop()
  role: string;

  @Prop({ default: false })
  socialLinkVerified: boolean;

  @Prop()
  password: string;

  @Prop()
  passwordResetToken: string;

  @Prop({ type: Date })
  passwordResetExpires: Date;

  @Prop()
  googleId: string;

  @Prop()
  seeVisual: boolean;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Ad' }] })
  savedJobs: Ad[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Ad' }] })
  promotedAds: Ad[];

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Wallet' })
  wallet: Wallet;

  @Prop()
  mostUsedTags: string[];

  @Prop()
  deletedAdsId: string[];

  @Prop()
  recentAds: string[];

  @Prop()
  refreshToken: string;

  @Prop({ default: false })
  browserNotification: boolean;

  @Prop({ default: false })
  emailNotification: boolean;

  @Prop({ default: false })
  desktopNotification: boolean;

  @Prop({ default: false })
  NotifyOffers: boolean;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ phoneNumber: 1 }, { sparse: true });

export { UserSchema };
