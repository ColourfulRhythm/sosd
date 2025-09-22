import {
    ForbiddenException,
    Injectable,
    Inject,
    forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDocument } from './schemas/wallet.schema';
import { Role, User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { TransactionService } from './transaction.service';
import { RecipientData } from 'src/payment/dto/create-payment.dto';
import { PaymentService } from 'src/payment/payment.service';
import { OTPService } from 'src/utils/otp-service';
import {UpdateResult} from "mongodb";

@Injectable()
export class WalletService {
    constructor(
        @InjectModel('Wallet')
        private readonly walletModel: Model<WalletDocument>,
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private transactionService: TransactionService,
        private otpService: OTPService,
        private paymentService: PaymentService,
    ) {}

    async create(user: UserDocument) {
        if (user.wallet) {
            throw new ForbiddenException('This user already has a wallet');
        }

        const newWallet = new this.walletModel({
            walletOwner: user._id,
        });
        newWallet.save();
        await this.userService.update(user._id, {
            wallet: newWallet.id,
        });
        return newWallet;
    }

    async findOne(user: User) {
        try {
            return this.walletModel.findById({ _id: user.wallet });
        } catch (err) {
            throw err;
        }
    }

    public async createRecipient(user: UserDocument, createRecipientDto: RecipientData) {
        const { recipient_code } = await this.paymentService.createRecipient(
            createRecipientDto,
        );
        const wallet = await this.walletModel.findOne({walletOwner: user._id});

        const updatedWallet = await this.updateRecipients(wallet, recipient_code)
        return wallet;
    }

    private async updateRecipients(wallet: WalletDocument, recipient_code: string){
        if(!wallet.recipients|| wallet.recipients.length < 1){
            wallet.recipients = [recipient_code]
            return this.walletModel.updateOne({_id: wallet._id}, wallet, {new: true})
        }else
            return this.walletModel.updateOne(
                {_id: wallet._id},
                { $addToSet: { recipients: recipient_code }
                },
                {new: true});
    }

    async getUserRecipientDetails(user: UserDocument) {
        const wallet = await this.findOne(user);
        const recipients = await this.paymentService.getUserRecipientDetails(
            wallet.recipients,
        );
        return recipients;
    }S

    async findById(walletId: string) {
        return this.walletModel.findById(walletId);
    }

    async updateWallet(walletId: string, walletBalance: number) {
        console.log(walletId)
        const wallet = await this.walletModel.findByIdAndUpdate(
            walletId,
            { walletBalance },
            { new: true },
        );
        return wallet;
    }

    async updateByQuery(walletId: string, query) {
        return this.walletModel.findByIdAndUpdate(walletId, query, {
            new: true,
        });
    }

    public async creditWallet(walletId: string, amount: number) {
        const wallet = await this.findById(walletId);
        const updatedBalance = wallet.walletBalance + amount;
        const updatedWallet = await this.updateWallet(walletId, updatedBalance);
        return updatedWallet;
    }

    public async debitWallet(walletId: string, amount: number) {
        const wallet = await this.findById(walletId);
        if(amount > wallet.walletBalance) {
            throw new ForbiddenException("User does not have enouch balance in wallet")
        }
        const updatedBalance = wallet.walletBalance - amount;
        const updatedWallet = await this.updateWallet(walletId, updatedBalance);
        return updatedWallet;
    }

    public async getWalletSummary(user: UserDocument) {
        let summary;
        switch (user.role) {
            case Role.ADMIN: {
                summary =
                    await this.transactionService.fetchAdminWalletSummary();
                break;
            }
            case Role.PROMOTER: {
                summary = await this.transactionService.fetchUserWalletSummary(
                    user.id,
                );
                break;
            }
            case Role.PLACER: {
                summary = await this.transactionService.fetchUserWalletSummary(
                    user.id,
                );
                break;
            }
        }

        return summary;
    }
}
