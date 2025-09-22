import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
import axios from 'axios';
import { verifyPhoneDto } from 'src/auth/dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';

enum ChannelType {
  Voice = 'voice',
  SMS = 'sms',
  WhatsApp = 'whatsApp',
  Email = 'email',
}

enum TokenType {
  NUMERIC = 'numeric',
  ALPHANUMERIC = 'alphanumeric',
}
@Injectable()
export class OTPService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}
  config = {
    headers: {
      accept: 'text/plain',
      AppId: this.configService.get('DOJAH_APP_ID'),
      'content-type': 'application/json',
      Authorization: this.configService.get('DOJAH_SECRET_KEY'),
    },
  };

  TOKEN =
    this.configService.get('NODE_ENV') == 'deveopment'
      ? this.configService.get('SENDCHAMP_PUBLIC_TEST_KEY')
      : this.configService.get('SENDCHAMP_PUBLIC_KEY');

  headers = {
    accept: 'application/json',
    Authorization: `Bearer ${this.TOKEN}`,
    'content-type': 'application/json',
  };
  sendChampConfig = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${this.TOKEN}`,
      'content-type': 'application/json',
    },
  };

  async sendOtp(phoneNumber: string, fullName: string) {
    const url =
      this.configService.get('NODE_ENV') == 'development'
        ? `${this.configService.get('SENDCHAMP_URL')}/verification/create`
        : `${this.configService.get('SENDCHAMP_URL')}/verification/create`;

    const options = {
      method: 'POST',
      url: url,
      headers: this.headers,
      data: {
        channel: ChannelType.SMS,
        sender: `${this.configService.get('SENDCHAMP_SENDER')}`,
        token_type: TokenType.NUMERIC,
        token_length: 4,
        expiration_time: 10,
        customer_mobile_number: phoneNumber,
        meta_data: {
          first_name: fullName,
        },
      },
    };

    const res = await axios(options);
    console.log(res);
    return res.data.data;
  }

  async confirmPhoneNumber(code: string, reference: string) {
    try {
      const url =
        this.configService.get('NODE_ENV') == 'development'
          ? `${this.configService.get(
              'SENDCHAMP_TEST_URL',
            )}/verification/confirm`
          : `${this.configService.get('SENDCHAMP_URL')}/verification/confirm`;
      const options = {
        method: 'POST',
        url: url,
        headers: this.headers,
        data: {
          verification_reference: reference,
          verification_code: code,
        },
      };
      const response = await axios(options);

      return response.data;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(
        'Something went wrong while verifying OTP, Try again!',
      );
    }
  }

  async verifyOtp(dto: verifyPhoneDto) {
    try {
      const response = await lastValueFrom(
        this.httpService
          .get(
            `https://sandbox.dojah.io/api/v1/messaging/otp/validate?code=${dto.otp}&reference_id=${dto.reference_id}`,
            this.config,
          )
          .pipe(map((res) => res.data)),
      );
      return response.entity;
    } catch (err) {
      throw err;
    }
  }
}
