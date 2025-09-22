import { PaymentClientType } from '../paymentClients/paymentClientType';
import { ConfigService } from '@nestjs/config';
import {FlutterwaveService} from "../paymentClients/flutterwave/flutterwaveService";
import {PaystackService} from "../paymentClients/paystack/paystackClient";
import {PaymentClient} from "../paymentClients/interfaces/paymentClient";
import {HttpService} from "@nestjs/axios";

export class Factory {
  static useFactory(clientType: string, config: ConfigService, http: HttpService):PaymentClient {
    switch(clientType){
      case PaymentClientType.FLUTTERWAVE:
        return new FlutterwaveService(config, http)
      case PaymentClientType.PAYSTACK:
        return new PaystackService(config, http)
    }
  }
}