import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    accountName: string;

    @ApiProperty()
    @IsString()
    phoneNumber?: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    dateOfBirth?: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty()
    @IsString()
    role: string;
}

export class ChangePasswordDto {
    @ApiProperty()
    @IsNotEmpty()
    previousPasssword: string;

    @ApiProperty()
    @IsNotEmpty()
    newPassword: string;

    @ApiProperty()
    @IsString()
    @Match('newPassword', { message: 'Passwords do not match' })
    confirmNewPassword: string;
}
