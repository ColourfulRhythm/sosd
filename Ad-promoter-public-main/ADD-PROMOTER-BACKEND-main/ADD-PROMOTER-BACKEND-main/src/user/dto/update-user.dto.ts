import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender } from '../schemas/user.schema';
import { Wallet } from 'src/wallet/schemas/wallet.schema';
import { Prop } from '@nestjs/mongoose';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  accountName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  socialLink?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  seeVisualAd?: boolean;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  role?: string;

  wallet?: Wallet;

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

  @ApiProperty()
  @IsOptional()
  browserNotification?: boolean;

  @ApiProperty()
  @IsOptional()
  emailNotification?: boolean;

  @ApiProperty()
  @IsOptional()
  desktopNotification?: boolean;

  @ApiProperty()
  @IsOptional()
  NotifyOffers?: boolean;

  @IsOptional()
  refreshToken?: string;
}
