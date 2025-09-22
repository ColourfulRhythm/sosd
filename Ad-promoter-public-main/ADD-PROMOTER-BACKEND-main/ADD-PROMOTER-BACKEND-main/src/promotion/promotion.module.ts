import { Module, forwardRef } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { Promotion, PromotionSchema } from './schemas/promotion.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { AdsModule } from 'src/ads/ads.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ActivitiesModule } from 'src/activities/activities.module';
import {NotificationModule} from "../notifications/notifications.module";
import { PayoutsModule } from 'src/payouts/payouts.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Promotion.name, schema: PromotionSchema },
        ]),
        forwardRef(() => UserModule),
        ActivitiesModule,
        WalletModule,
        AdsModule,
        NotificationModule,
        forwardRef(() => PayoutsModule),
    ],
    controllers: [PromotionController],
    providers: [PromotionService],
    exports: [PromotionService],
})
export class PromotionModule {}
