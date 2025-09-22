import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type ActivityDocument = Activity & Document;

@Schema({
    timestamps: true,
})
export class Activity {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    sender: User;

    @Prop()
    userID: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    recipient: User;

    @Prop()
    title: string;

    @Prop()
    type: ActivityType;

    @Prop()
    body: string;

    @Prop()
    adType: string;

    @Prop({ type: Boolean, default: false })
    read: boolean;
}

const ActivitySchema = SchemaFactory.createForClass(Activity);

export enum ActivityType {
    PROMOTION = 'Advert Promoted',
    ADVERT_STATUS = 'Advert status',
    PROMOTION_STATUS = 'Promotion status',
    WITHDRAWAL = 'Withdraw from Balance',
}

export { ActivitySchema };
