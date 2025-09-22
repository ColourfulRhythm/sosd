import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { v4 as uuid } from 'uuid';
import { Transaction } from './transaction.schema';

export type WalletDocument = Wallet & Document;

@Schema({
    timestamps: true
})
export class Wallet {
    @Prop({ default: 0 })
    walletBalance: number;

    @Prop({ default: uuid() })
    walletId: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    walletOwner: User;

    @Prop()
    recipients: string[];
}

export const walletSchema = SchemaFactory.createForClass(Wallet);
