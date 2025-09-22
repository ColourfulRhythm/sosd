import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Ad} from "../../ads/schemas/ad.schema";
import {Transform} from "class-transformer";
import {ObjectId} from "mongoose";
import {User} from "../../user/schemas/user.schema";
import * as mongoose from "mongoose";

export type ReportsDocument = Reports & Document;

@Schema({
    timestamps: true,
})

@Schema()
export class Reports{
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Ad' })
    public ad: Ad;

    @Prop()
    public reportReason: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    public user: User;
}

const ReportsSchema = SchemaFactory.createForClass(Reports);

export{ ReportsSchema }
