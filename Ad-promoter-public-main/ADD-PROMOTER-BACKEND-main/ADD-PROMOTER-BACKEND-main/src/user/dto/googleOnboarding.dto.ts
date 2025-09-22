import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../schemas/user.schema';
import { Wallet } from 'src/wallet/schemas/wallet.schema';
import {Prop} from "@nestjs/mongoose";

export class GoogleOnboardingDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    socialLink?: string;

    @ApiProperty()
    @IsOptional()
    seeVisualAd?: boolean;

    @IsString()
    @IsOptional()
    role?: string;

    @ApiProperty()
    @IsOptional()
    profilePicture?: string;

    @ApiProperty({
        description: 'gender',
        enum: Gender,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: string;
}
