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
} from '../../dto/create-payment.dto';
import * as Paystack from 'paystack';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { PaymentClient } from '../interfaces/paymentClient';
import { PaymentResponseDto } from '../../dto/payment.response.dto';
import { UserDocument } from '../../../user/schemas/user.schema';

@Injectable()
export class PaystackService implements PaymentClient {
  paystack;
  PAYSTACK_SECRET_KEY;
  constructor(private config: ConfigService, private http: HttpService) {
    this.PAYSTACK_SECRET_KEY =
      this.config.get('NODE_ENV') === 'production'
        ? this.config.get('PAYSTACK_LIVE_SECRET_KEY')
        : this.config.get('PAYSTACK_TEST_SECRET_KEY');
    this.paystack = Paystack(this.PAYSTACK_SECRET_KEY);
  }

  async pay(paymentData: PaymentData) {
    // Check if payment data is valid
    if (!paymentData || !paymentData.amount || !paymentData.email) {
      throw new BadRequestException('No payment data provided');
    }

    // Initialize payment options
    const options = {
      amount: paymentData.amount,
      email: paymentData.email,
      callback_url: paymentData.callbackUrl,
    };

    // Create payment request
    const response = await this.paystack.transaction.initialize(options);
    if (response.status !== true) {
      throw new InternalServerErrorException();
    }
    const paymentResponseDto = new PaymentResponseDto();
    paymentResponseDto.url = response.data.authorization_url;
    paymentResponseDto.reference = response.data.reference;

    return paymentResponseDto;
  }

  async createRecipient(recipientData: RecipientData) {
    // Check if recipient data is valid
    if (
      !recipientData ||
      !recipientData.type ||
      !recipientData.name ||
      !recipientData.account_number ||
      !recipientData.bank_code
    ) {
      throw new BadRequestException();
    }

    // Initialize recipient options
    const options = {
      type: recipientData.type,
      name: recipientData.name,
      account_number: recipientData.account_number,
      bank_code: recipientData.bank_code,
    };

    const endpoint = 'https://api.paystack.co/transferrecipient';
    const secretKey = this.PAYSTACK_SECRET_KEY;

    try {
      const response = await lastValueFrom(
        this.http.post(endpoint, options, {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
        }),
      );
      console.log(response);
      // Create recipient
      if (response.data.status !== true) {
        throw new InternalServerErrorException();
      }

      // Return recipient details to client
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserRecipientDetails(recipients: string[]) {
    try {
      const recipientDetailArr = [];

      for (const item in recipients) {
        const secretKey = this.PAYSTACK_SECRET_KEY;

        const response = await lastValueFrom(
          this.http
            .get(
              `https://api.paystack.co/transferrecipient/${recipients[item]}`,
              {
                headers: {
                  Authorization: `Bearer ${secretKey}`,
                },
              },
            )
            .pipe(map((res) => res.data)),
        );
        if (response.status !== true) {
          throw new InternalServerErrorException();
        }
        recipientDetailArr.push(response.data);
      }
      return recipientDetailArr;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error Occured while Fetching Recipients',
      );
    }
  }

  async verify(verificationData: VerificationData) {
    // Check if verification data is valid
    if (!verificationData || !verificationData.reference) {
      throw new BadRequestException();
    }

    // Verify payment
    const response = await this.paystack.transaction.verify(
      verificationData.reference,
    );
    if (response.status !== true) {
      throw new InternalServerErrorException();
    }

    if (response.data.status !== 'success') {
      throw new InternalServerErrorException(
        'Something went wrong processing the payment!',
      );
    }

    // Return transaction details to client
    return response;
  }

  async transfer(transferData: TransferData) {
    let recipient;
    if (transferData.recipient) {
      recipient = transferData.recipient;
    } else {
      recipient = await this.createRecipient(transferData);
    }
    const mockResponse = {
      recipient: recipient,
    };

    const endpoint = 'https://api.paystack.co/transfer';
    const secretKey = this.PAYSTACK_SECRET_KEY;

    const options = {
      source: 'balance',
      amount: transferData.amount,
      recipient: recipient.recipient,
    };

    try {
      const response = await lastValueFrom(
        this.http
          .post(endpoint, options, {
            headers: {
              Authorization: `Bearer ${secretKey}`,
            },
          })
          .pipe(map((res) => res.data)),
      );
      // Create recipient
      if (response.status !== true) {
        throw new InternalServerErrorException();
      }

      const finalizeRes = await this.paystack.transfer.finalize(
        response.tranfer_code,
      );

      console.log(finalizeRes);

      // Return recipient details to client
      return mockResponse.recipient;
    } catch (error) {
      console.log(error);
      return mockResponse.recipient;
      // throw new Error(error);
    }
  }

  public async getBanks() {
    return [];
  }
}
