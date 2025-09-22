import {Transform} from "class-transformer";
import {ObjectId} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {Ad} from "../../ads/schemas/ad.schema";
import {User} from "../../user/schemas/user.schema";

export type FeedbackDocument = Feedback & Document;

@Schema({
    timestamps: true,
})

export class Feedback{
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop()
    public feedback: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    public user: User;
}

const FeedbackSchema = SchemaFactory.createForClass(Feedback);

export{ FeedbackSchema }