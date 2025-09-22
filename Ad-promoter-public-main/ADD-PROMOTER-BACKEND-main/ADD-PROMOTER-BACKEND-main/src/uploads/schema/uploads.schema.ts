import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type UploadDocument = Upload & Document;

@Schema()
export class Upload {
    @Prop()
    fileName: string;

    @Prop()
    fileUrl: string;

    @Prop()
    key: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    user: User;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
