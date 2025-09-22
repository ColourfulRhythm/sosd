import { Module, forwardRef } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ad, AdSchema } from './schemas/ad.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { ClickManagementModule } from 'src/clicks-management/clicks-management.module';
import { PaymentModule } from 'src/payment/payment.module';
import { WalletModule } from 'src/wallet/wallet.module';
import {NotificationModule} from "../notifications/notifications.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
        forwardRef(() => UserModule),
        ClickManagementModule,
        WalletModule,
        PaymentModule,
        NotificationModule,
    ],
    controllers: [AdsController],
    providers: [AdsService],
    exports: [AdsService],
})
export class AdsModule {}
