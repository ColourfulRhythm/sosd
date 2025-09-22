import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FacebookStrategy,
  JwtStrategy,
  GoogleStrategy,
  JwtRefreshTokenStrategy,
} from '../strategy';
import { HttpModule } from '@nestjs/axios';
import { User, UserSchema } from '../user/schemas/user.schema';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { UserModule } from 'src/user/user.module';
import { OTPService } from 'src/utils/otp-service';
import { WalletModule } from 'src/wallet/wallet.module';
import { Mailer } from '../mail/mailer';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot(),
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MailModule,
    UserModule,
    WalletModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    OTPService,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    GoogleStrategy,
    FacebookStrategy,
    Mailer,
  ],
})
export class AuthModule {}
