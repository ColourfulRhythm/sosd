import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Wallet } from 'src/wallet/schemas/wallet.schema';

export type PayoutsDocument = Payouts & Document;

export enum Status {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}

@Schema({
    timestamps: true,
})
export class Payouts {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop()
    recipient: string;

    @Prop()
    amount: number;

    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
    wallet: Wallet;

    @Prop({ type: String, enum: Status, default: Status.PENDING })
    status: Status;
}

export const PayoutsSchema = SchemaFactory.createForClass(Payouts);
