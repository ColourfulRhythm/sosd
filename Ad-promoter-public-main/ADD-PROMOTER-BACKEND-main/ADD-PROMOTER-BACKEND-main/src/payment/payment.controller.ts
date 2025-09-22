import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { PaymentService } from './payment.service';
import {VerificationData} from "./dto/create-payment.dto";

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    @Get('verify')
    public async verifyPayment(
        @Query('status') status: string,
        @Query('tx_ref') tx_ref: string,
        @Query('transaction_id') transaction_id: string){
        const verificationData = new VerificationData()
        verificationData.tx_ref = tx_ref
        verificationData.transaction_Id = transaction_id
        verificationData.status = status
        return this.paymentService.verify(verificationData)
    }

    @Get('getBanks')
    public async getBanks(){
        return this.paymentService.getBanks()
    }
}
