import { PaymentData, RecipientData, TransferData, VerificationData } from "../../dto/create-payment.dto";
import { PaymentResponseDto } from '../../dto/payment.response.dto';
import {VerifyPaymentDto} from "../../dto/verifyPaymentDto";

export interface PaymentClient {
    pay(paymentData: PaymentData): Promise<PaymentResponseDto>;
    verify(verificationData: VerificationData): Promise<VerifyPaymentDto>;
    getBanks(): Promise<Array<object>>;
    transfer(transferData: TransferData): Promise<string>;
    getUserRecipientDetails(recipients: string[]): Promise<any>;
    createRecipient(createRecipientDto: RecipientData): Promise<any>;
}