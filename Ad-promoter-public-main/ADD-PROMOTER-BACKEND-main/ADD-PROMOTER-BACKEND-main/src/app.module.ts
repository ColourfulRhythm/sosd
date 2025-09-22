import { Module, INestApplication, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdsModule } from './ads/ads.module';
import { WalletModule } from './wallet/wallet.module';
import { ClickManagementModule } from './clicks-management/clicks-management.module';
import { PromotionModule } from './promotion/promotion.module';
import { BullModule } from '@nestjs/bull';
import { MailModule } from './mail/mail.module';
import { PayoutsModule } from './payouts/payouts.module';
import {
    Promotion,
    PromotionSchema,
} from './promotion/schemas/promotion.schema';
import { UploadsModule } from './uploads/uploads.module';
import { HttpModule } from '@nestjs/axios';
import { Ad, AdSchema } from './ads/schemas/ad.schema';
import { PaymentModule } from './payment/payment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { MongoExceptionFilter } from './filters/mongoose.excepions.filter';
import { MongooseExceptionFilter } from './filters/mongo.exception.filter';
import { forwardRef } from '@nestjs/common/utils';
import { ActivitiesModule } from './activities/activities.module';
import {ReportsModule} from "./reports/reports.module";
import {NotificationModule} from "./notifications/notifications.module";
import {FeedbackModule} from "./feedback/feedback.module";

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Promotion.name, schema: PromotionSchema },
        ]),
        MongooseModule.forFeature([{ name: Ad.name, schema: AdSchema }]),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            ttl: 300,
            url: process.env.RENDER_REDIS,
        }),
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const credentials = {
                    username: configService.get('REDIS_USER') || '',
                    password: configService.get('REDIS_PASSWORD') || '',
                    host: configService.get('REDIS_HOSTNAME') || 'localhost',
                    port: +configService.get('REDIS_PORT') || 6379,
                };
                return {
                    redis: {
                        ...credentials,
                        tls: {
                            host: credentials.host,
                            port: credentials.port,
                        },
                    },
                };
            },
            inject: [ConfigService],
        }),

        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        AuthModule,
        forwardRef(() => UserModule),
        forwardRef(() => AdsModule),
        HttpModule,
        NotificationModule,
        WalletModule,
        ClickManagementModule,
        forwardRef(() => PromotionModule),
        MailModule,
        PayoutsModule,
        UploadsModule,
        PaymentModule,
        ActivitiesModule,
        FeedbackModule,
        ReportsModule,
        // BullBoardModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: MongoExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: MongooseExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {
    static port: number | string;

    constructor(private readonly configService: ConfigService) {
        AppModule.port = this.configService.get('PORT');
    }

    /**
     *
     * @param app  - Nest application
     * @returns string - base url
     */
    static getBaseUrl(app: INestApplication): string {
        let baseUrl = app.getHttpServer().address().address;
        if (baseUrl === '0.0.0.0' || baseUrl === '::') {
            return (baseUrl = 'localhost');
        }
    }
}
