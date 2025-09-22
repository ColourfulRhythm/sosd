import { Injectable } from '@nestjs/common';
import {
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import {
    PaymentData,
    RecipientData,
    TransferData,
    VerificationData,
} from './dto/create-payment.dto';
import { ConfigService } from '@nestjs/config';
import { Factory } from './factory/paymentClientFactory';
import { PaymentClient } from './paymentClients/interfaces/paymentClient';
import { PaymentResponseDto } from './dto/payment.response.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymentService {
    private readonly paymentClient: PaymentClient;
    private readonly config: ConfigService;
    constructor(config: ConfigService, private http: HttpService) {
        this.config = config;
        this.paymentClient = Factory.useFactory(
            config.get('PAYSTACK_PAYMENT_CLIENT'),
            config,
            http,
        );
    }

    public async pay(paymentData: PaymentData): Promise<PaymentResponseDto> {
        return this.paymentClient.pay(paymentData);
    }

    public async verify(verificationData: VerificationData) {
        return this.paymentClient.verify(verificationData);
    }

    public async transfer(transferData: TransferData) {
        return this.paymentClient.transfer(transferData);
    }

    public async createRecipient(
        createRecipientDto: RecipientData,
    ): Promise<any> {
        return this.paymentClient.createRecipient(createRecipientDto);
    }

    public async getUserRecipientDetails(recipients: string[]): Promise<any> {
        return this.paymentClient.getUserRecipientDetails(recipients);
    }

    public async getBanks() {
        return this.paymentClient.getBanks();
    }
}
