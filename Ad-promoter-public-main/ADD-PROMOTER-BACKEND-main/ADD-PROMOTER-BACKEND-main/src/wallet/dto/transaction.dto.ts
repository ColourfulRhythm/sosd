import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    user: string;
}
