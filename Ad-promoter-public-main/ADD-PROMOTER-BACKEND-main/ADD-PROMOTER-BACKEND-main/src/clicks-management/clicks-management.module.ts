import { Module } from '@nestjs/common';
import { ClickManagementService } from './clicks-management.producer.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Promotion,
    PromotionSchema,
} from 'src/promotion/schemas/promotion.schema';
import { BullModule } from '@nestjs/bull';
import { Ad, AdSchema } from 'src/ads/schemas/ad.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { Wallet, walletSchema } from 'src/wallet/schemas/wallet.schema';
import { ClickConsumer } from './clicks-management.consumer';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Promotion.name, schema: PromotionSchema },
        ]),
        MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Wallet.name, schema: walletSchema },
        ]),
        BullModule.registerQueue({
            name: 'click-queue',
            redis: {
                host: process.env.REDIS_HOSTNAME,
                port: process.env.REDIS_PORT,
                password: process.env.REDIS_PASSWORD,
                username: process.env.REDIS_USER,
                ttl: 42000,
            },
        }),

    ],
    providers: [ClickManagementService, ClickConsumer],
    exports: [ClickManagementService],
})
export class ClickManagementModule {}
