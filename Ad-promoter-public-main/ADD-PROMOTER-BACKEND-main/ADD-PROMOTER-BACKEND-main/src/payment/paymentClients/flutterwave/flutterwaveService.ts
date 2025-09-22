import {PaymentClient} from '../interfaces/paymentClient';
import {PaymentData, RecipientData, TransferData, VerificationData,} from '../../dto/create-payment.dto';
import {PaymentResponseDto} from '../../dto/payment.response.dto';
import {ConfigService} from '@nestjs/config';
import {HttpService} from '@nestjs/axios';
import {lastValueFrom, map, tap} from "rxjs";
import {BadRequestException, InternalServerErrorException} from "@nestjs/common";
import {v4} from "uuid";
import {VerifyPaymentDto} from "../../dto/verifyPaymentDto";

const flutterwave = require('flutterwave-node-v3')

export class FlutterwaveService implements PaymentClient {
    private readonly secretKey;
    private readonly publicKey;
    private readonly flutterwaveBaseUrl = this.config.get('FLUTTERWAVE_BASE_ENDPOINT');
    private flutterwave: any;

    constructor(private config: ConfigService, private http: HttpService) {
        this.secretKey = this.config.get('FLUTTERWAVE_SECRET_KEY');
        this.publicKey = this.config.get('FLUTTERWAVE_PUBLIC_KEY');
        this.flutterwave = new flutterwave(this.publicKey, this.secretKey);
    }


    async getUserRecipientDetails(recipients: string[]) {
        return
    }

    public async pay(paymentData: PaymentData): Promise<PaymentResponseDto> {
        const payload = {
            tx_ref: `ADP-${v4()}`,
            amount: paymentData.amount,
            currency: "NGN",
            redirect_url: paymentData.callbackUrl,
            customer: {
                email: paymentData.email,
            },
        }

        try{
            const res = await lastValueFrom(
                this.http.post(`${this.flutterwaveBaseUrl}/payments`, payload, {
                    headers: {
                        Authorization: `Bearer ${this.secretKey}`,
                    },
                }).pipe(tap((res)=> console.log(res)),map((res) => res.data))
            )
            const paymentResponseDto = new PaymentResponseDto()
            paymentResponseDto.url = res.data.link
            paymentResponseDto.reference = payload.tx_ref
            return paymentResponseDto;
        }catch (e) {
            throw new BadRequestException(e.response.data.errors)
        }
    }

    public async createRecipient(recipientData: RecipientData): Promise<PaymentResponseDto> {
        try{
            const payload = {
                account_bank: recipientData.bank_code,
                account_number: recipientData.account_number,
                amount: recipientData.amount,
                currency: "NGN",
                callback_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
                debit_currency: "NGN"
            }

            const response = await this.flutterwave.Transfer.initiate(payload)
            console.log(response)
            return undefined;
        }catch (e){
            throw e;
        }
    }

    public async transfer(transferData: TransferData): Promise<string> {
        try{
            const payload = {
                account_bank: transferData.bank_code,
                account_number: transferData.account_number,
                amount: transferData.amount,
                currency: "NGN",
                debit_currency: "NGN"
            }

            const response = await this.flutterwave.Transfer.initiate(payload)
            return response.data.id.toString();
        }catch (e){
            throw e;
        }
    }

    public async getBanks(){
        return this.flutterwave.Bank.country({country:"NG"})
    }

    public async verify(verificationData: VerificationData): Promise<VerifyPaymentDto> {
        try{
            if (
                verificationData.status &&
                verificationData.status !== 'successful'
            )
                throw new InternalServerErrorException(
                    'Payment verification failed',
                );
            const res = await this.flutterwave.Transaction.verify({
                id: verificationData.transaction_Id,
            });

            if (res.data.status !== 'successful')
                throw new InternalServerErrorException(
                    'Payment verification failed',
                );
            return {
                amount: res.data.amount,
                email: res.data.customer.email,
                reference: res.data.id,
                status: res.data.status,
            };
        }catch (e){
            throw e;
        }
    }
}