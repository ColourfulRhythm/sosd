import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from '../schema/payouts.schema';

export class PayoutsDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsString()
    recipient: string;
}

export class processPayoutDto {
    @ApiProperty({
        enum: Status,
        type: String
    })
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status | string;

    @ApiProperty()
    @IsNotEmpty()
    payoutId: string;
}
