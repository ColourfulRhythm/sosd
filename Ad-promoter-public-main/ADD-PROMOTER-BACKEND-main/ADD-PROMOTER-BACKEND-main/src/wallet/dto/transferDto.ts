import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class TransferDto {
    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    recipient_bank_code: string;

    @ApiProperty()
    @IsString()
    recipient_account_number: string;
}
