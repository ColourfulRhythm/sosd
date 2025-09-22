import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWalletDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dob: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bvn: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsString()
    middle_name: string;
}
