import { Module, forwardRef } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, walletSchema } from './schemas/wallet.schema';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { ActivitiesModule } from 'src/activities/activities.module';
import { TransactionService } from './transaction.service';
import { OTPService } from 'src/utils/otp-service';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: Wallet.name, schema: walletSchema },
            { name: Transaction.name, schema: TransactionSchema },
        ]),
        ConfigModule,
        forwardRef(() => UserModule),
        PaymentModule,
        ActivitiesModule,
    ],
    controllers: [WalletController],
    providers: [WalletService, TransactionService, OTPService],
    exports: [WalletService, TransactionService],
})
export class WalletModule {}
