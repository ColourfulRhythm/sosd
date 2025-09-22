import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Transform } from 'class-transformer';

export type TransactionDocument = Transaction & Document;

export enum TransactionType {
    DEBIT = 'debit',
    CREDIT = 'credit',
}
@Schema({
    timestamps: true,
})
export class Transaction {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ default: 0 })
    amount: number;

    @Prop({ type: String, enum: TransactionType })
    type: TransactionType;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    user: string;

    @Prop()
    recipientCode: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
