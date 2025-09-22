import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Wallet, walletSchema } from 'src/wallet/schemas/wallet.schema';
import { AdsModule } from 'src/ads/ads.module';
import { PromotionModule } from 'src/promotion/promotion.module';
import {NotificationModule} from "../notifications/notifications.module";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([
            { name: Wallet.name, schema: walletSchema },
        ]),
        forwardRef(() => AdsModule),
        forwardRef(() => PromotionModule),
        NotificationModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
