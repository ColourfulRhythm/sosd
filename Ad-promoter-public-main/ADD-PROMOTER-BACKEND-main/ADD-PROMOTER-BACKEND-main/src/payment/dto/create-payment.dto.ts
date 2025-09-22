import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentData {
    amount: number;
    email: string;
    public callbackUrl?: string;
}

export class VerificationData {
    reference?: string;
    status?: string;
    tx_ref?: string;
    transaction_Id?: string;
}

export class TransferData {
    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsOptional()
    recipient?: string;

    @ApiProperty()
    @IsOptional()
    type?: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    account_number?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    bank_code?: string;
}

export class RecipientData {
    @ApiProperty()
    @IsString()
    type?: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    account_number?: string;

    @ApiProperty()
    @IsString()
    bank_code?: string;

    @ApiProperty()
    @IsOptional()
    amount?: number;
}
