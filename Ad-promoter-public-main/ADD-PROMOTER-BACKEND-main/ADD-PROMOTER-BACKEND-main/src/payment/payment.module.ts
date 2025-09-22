import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [ConfigModule.forRoot(), HttpModule],
    providers: [PaymentService],
    controllers: [PaymentController],
    exports: [PaymentService],
})
export class PaymentModule {}
