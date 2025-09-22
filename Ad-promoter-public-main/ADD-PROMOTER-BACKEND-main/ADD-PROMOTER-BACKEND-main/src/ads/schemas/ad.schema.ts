import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { string } from 'joi';
import mongoose, { Document } from 'mongoose';
import { Promotion } from 'src/promotion/schemas/promotion.schema';
import { User } from 'src/user/schemas/user.schema';
import {Reports} from "../../reports/schema/reports.schema";
import {Feedback} from "../../feedback/schema/feedback.schema";

export type AdDocument = Ad & Document;

export enum AdType {
    DIRECT_LINK = 'direct-link',
    VISUAL = 'visual',
    DETAIL = 'detail',
}

export enum AdStatus {
    PAUSED = 'paused',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    INCOMPLETE = 'incomplete',
}

export enum CTAButtonDesign {
    BUY_NOW = 'Buy now',
    CONTACT_US = 'Contact us',
    VISIT_WEBSITE = 'Visit our website',
    CALL_US = 'Call us',
    FIND_OUT_MORE = 'Find out more',
    SIGN_ME_UP = 'Sign me up',
}

@Schema({
    timestamps:true
})
export class Ad {
    @Prop()
    productName: string;

    @Prop()
    description: string;

    @Prop()
    tags: string[];

    @Prop({ type: String, enum: AdType })
    type: AdType;

    @Prop()
    rate: number;

    @Prop()
    paymentRef: string;

    @Prop()
    images: string[];

    @Prop()
    videos: string[];

    @Prop()
    promotedLink: string;

    @Prop({ default: false })
    approvalStatus: boolean;

    @Prop({ default: false })
    isPaid: boolean;

    @Prop({
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' }],
    })
    promotions: Promotion[];

    @Prop({ default: 0 })
    conversions: number;

    @Prop({ default: 0 })
    approvedVisualAd: number;

    @Prop({ default: 0 })
    clicks: number;

    @Prop()
    budget: number;

    @Prop()
    target: number;

    @Prop({ type: String, enum: AdStatus, default: AdStatus.INCOMPLETE })
    adStatus: AdStatus;

    @Prop({ type: Boolean, default: false })
    completed: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    creator: User;

    @Prop({ default: Date.now })
    dateCreated: Date;

    @Prop({ type: String, enum: CTAButtonDesign })
    CTAButtonDesign: CTAButtonDesign;

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reports' }],})
    reports: Reports[]

    @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],})
    feedback: Feedback[]
}

export const AdSchema = SchemaFactory.createForClass(Ad);
