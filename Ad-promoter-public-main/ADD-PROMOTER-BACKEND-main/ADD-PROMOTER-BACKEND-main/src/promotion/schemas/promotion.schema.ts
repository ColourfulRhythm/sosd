import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Ad } from 'src/ads/schemas/ad.schema';
import { User } from 'src/user/schemas/user.schema';
import * as shortId from 'shortid';


export type PromotionDocument = Promotion & Document;

export enum PromotionStatus {
    APPROVED = "approved",
    IN_REVIEW = "in-review",
    DECLINED = "declined"
}
@Schema({
    timestamps: true,
})
export class Promotion {
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Ad' })
    ad: Ad;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    promoter: User;

    @Prop({ default: 0 })
    clicks: number;
    
    @Prop({default: PromotionStatus.IN_REVIEW})
    status: string

    @Prop({ default: 0 })
    conversions: number;

    @Prop({ default: 0 })
    amountEarned: number;

    @Prop({ type: Boolean, default: false })
    approvedForPayment: boolean;

    @Prop()
    adType: string;

    @Prop({ default: Date.now() })
    dateInitiated: Date;

    @Prop({ required: false })
    link: string;

    @Prop({ default: shortId.generate })
    uniqueCode: string;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
