import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionDto } from './dto/transaction.dto';
import {
    TransactionDocument,
    TransactionType,
} from './schemas/transaction.schema';
import {ObjectId} from "mongodb";

@Injectable()
export class TransactionService {
    constructor(
        @InjectModel('Transaction')
        private readonly transactionModel: Model<TransactionDocument>,
    ) {}

    async create(dto: TransactionDto): Promise<TransactionDocument> {
        const transaction = await this.transactionModel.create(dto);
        return transaction;
    }

    async fetchAllTransactions(page: number, pageSize: number) {
        const transactions = await this.transactionModel
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        return {
            total: await this.transactionModel.count(),
            data: transactions,
        };
    }
    
    async fetchUserTransactions(
        userId: string,
        page: number,
        pageSize: number,
    ) {
        const transactions = await this.transactionModel
            .find({
                user: userId,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();
        return {
            total: await this.transactionModel.count({ user: userId }),
            data: transactions,
        };
    }

    async fetchAdminWalletSummary() {
        const credit = await this.transactionModel.aggregate([
            { $match: { type: TransactionType.CREDIT } },

            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ]);
        const debit = await this.transactionModel.aggregate([
            { $match: { type: TransactionType.DEBIT } },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ]);
        const amountPaidIn = credit[0] ? credit[0].amount : 0;
        const amountPaidOut = debit[0] ? debit[0].amount : 0;

        return {
            amountPaidIn,
            amountPaidOut,
            amountUnpaid: amountPaidIn - amountPaidOut,
        };
    }
    async fetchUserWalletSummary(userId: string) {
        const credit = await this.transactionModel.aggregate([
            { $match: { type: TransactionType.CREDIT, user: new ObjectId(userId) } },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ]);
        const debit = await this.transactionModel.aggregate([
            { $match: { type: TransactionType.DEBIT, user: new ObjectId(userId) } },
            { $group: { _id: null, amount: { $sum: '$amount' } } },
        ]);

        const amountPaidIn = credit[0] ? credit[0].amount : 0;
        const amountPaidOut = debit[0] ? debit[0].amount : 0;

        return {
            amountPaidIn,
            amountPaidOut,
            amountUnpaid: amountPaidIn - amountPaidOut,
        };
    }
}
