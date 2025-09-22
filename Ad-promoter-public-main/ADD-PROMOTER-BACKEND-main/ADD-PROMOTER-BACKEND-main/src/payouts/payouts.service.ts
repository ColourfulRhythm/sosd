import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PayoutsDto, processPayoutDto } from './dto/payout.dto';
import { PayoutsDocument, Status } from './schema/payouts.schema';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/schemas/user.schema';
import { WalletService } from 'src/wallet/wallet.service';
import { WalletDocument } from 'src/wallet/schemas/wallet.schema';
import { PaymentService } from 'src/payment/payment.service';
import { TransactionService } from 'src/wallet/transaction.service';
import { TransactionDto } from 'src/wallet/dto/transaction.dto';
import { TransactionType } from 'src/wallet/schemas/transaction.schema';
import { ActivitiesService } from 'src/activities/activities.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notificationSchema';
import { ObjectId } from 'mongodb';
import { ReportsService } from '../reports/reports.service';

export const TRANSACTION_CHARGE = 100;
@Injectable()
export class PayoutsService {
  constructor(
    @InjectModel('Payouts')
    private readonly payoutsModel: Model<PayoutsDocument>,
    private readonly walletService: WalletService,
    private readonly transactionService: TransactionService,
    private readonly paymentService: PaymentService,
    private readonly activitiesService: ActivitiesService,
    private readonly notificationService: NotificationsService,
    private readonly reportsService: ReportsService,
  ) {}

  async requestPayout(user: UserDocument, dto: PayoutsDto) {
    const wallet = await this.walletService.findOne(user);
    const walletBalance = wallet.walletBalance;
    if (walletBalance < dto.amount) {
      throw new ForbiddenException(
        'You are not allowed to request above your current balance',
      );
    }
    const payoutRequest = new this.payoutsModel({
      user: user._id,
      ...dto,
      name: user.accountName,
      wallet: wallet._id,
    });

    await payoutRequest.save();

    return payoutRequest;
  }

  async userPayoutsBreakdown(userId: string, startDate?: Date, endDate?: Date) {
    const pendingWithdrawals = await this.payoutsModel.aggregate([
      {
        $match: {
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
          user: new ObjectId(userId),
          status: Status.PENDING,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const totalWithdrawals = await this.payoutsModel.aggregate([
      {
        $match: {
          dateCreated: {
            $gte: startDate,
            $lte: endDate,
          },
          user: new ObjectId(userId),
          status: Status.APPROVED,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);
    return {
      pendingWithdrawals:
        pendingWithdrawals.length < 1 ? 0 : pendingWithdrawals[0].total,
      totalWithdrawals:
        totalWithdrawals.length < 1 ? 0 : totalWithdrawals[0].total,
    };
  }

  async processPayouts(dto: processPayoutDto) {
    const payout = await this.payoutsModel.findById(dto.payoutId);
    if (!payout) throw new NotFoundException('Payout Not Found');
    if (payout.status === Status.APPROVED)
      throw new ForbiddenException('This Payout has been Previously Approved');

    if (dto.status === Status.APPROVED) {
      const wallet = await this.walletService.findById(
        payout.wallet.toString(),
      );
      if (wallet.walletBalance < payout.amount) {
        await this.payoutsModel.findByIdAndUpdate(
          dto.payoutId,
          {
            status: Status.REJECTED,
          },
          { new: true },
        );
        throw new ForbiddenException(
          'The user does not have enough money to proceess this payout',
        );
      }
      await this.walletService.debitWallet(
        payout.wallet.toString(),
        payout.amount,
      );
      const transactionDto = new TransactionDto();
      transactionDto.amount = payout.amount;
      transactionDto.type = TransactionType.DEBIT;
      transactionDto.user = payout.id;
      await this.transactionService.create(transactionDto);
      await this.paymentService.transfer({ ...payout });
    }
    await this.payoutsModel.findByIdAndUpdate(
      dto.payoutId,
      {
        status: dto.status,
      },
      { new: true },
    );

    await this.notificationService.createNotification({
      title: NotificationType.WalletDebit,
      body: this.notificationService.PrefillNotificationBody({
        title: NotificationType.VisualAdAccountGrowth,
        walletDebit: payout.amount.toString(),
      }),
      sender: payout.user,
      receiver: payout.user,
    });
    return payout;
  }

  async getPendingPayouts(page: number, pageSize: number) {
    return {
      total: await this.payoutsModel.count({ status: Status.PENDING }),
      data: await this.payoutsModel
        .find({
          status: Status.PENDING,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
    };
  }

  async getUserPayouts(userId: string, page: number, pageSize: number) {
    return {
      total: await this.payoutsModel.count({ user: userId }),
      data: await this.payoutsModel
        .find({ user: userId })
        .populate('user', {
          accountName: 1,
          profilePicture: 1,
          email: 1,
          phoneNumber: 1,
          role: 1,
        })
        .skip((page - 1) * pageSize)
        .limit(pageSize),
    };
  }
}
