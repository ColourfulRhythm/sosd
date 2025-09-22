import { Module, forwardRef } from '@nestjs/common';
import { PayoutsService } from './payouts.service';
import { PayoutsController } from './payouts.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Payouts, PayoutsSchema } from './schema/payouts.schema';
import { UserModule } from 'src/user/user.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import { NotificationModule } from '../notifications/notifications.module';
import { ReportsModule } from 'src/reports/reports.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Payouts.name,
                schema: PayoutsSchema,
            },
        ]),
        WalletModule,
        forwardRef(() => UserModule),
        PaymentModule,
        ActivitiesModule,
        NotificationModule,
        ReportsModule
    ],
    controllers: [PayoutsController],
    providers: [PayoutsService],
    exports: [PayoutsService],
})
export class PayoutsModule {}
