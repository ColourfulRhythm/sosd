import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsPhoneNumber,
    IsOptional,
    IsBoolean,
    MinLength,
} from 'class-validator';
import { Role } from 'src/user/schemas/user.schema';
import { Match } from 'src/user/decorators/match.decorator';

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    accountName: string;

    @ApiProperty()
    @IsNotEmpty()
    socialLink: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    seeVisualAd: boolean;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'role',
        enum: Role,
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;
}

export class SendOtpDto {
    @ApiProperty()
    @IsString()
    phoneNumber: string;
}

export class SigninDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class verifyPhoneDto {
    @ApiProperty()
    @IsNotEmpty()
    reference_id: string;

    @ApiProperty()
    @IsNotEmpty()
    otp: string;

    @ApiProperty()
    @IsOptional()
    phoneNumber: string;
}

export class verifySignupDto {
    @ApiProperty()
    @IsNotEmpty()
    reference_id: string;

    @ApiProperty()
    @IsNotEmpty()
    otp: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    accountName: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    socialLink: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    seeVisualAd: boolean;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty({
        description: 'role',
        enum: Role,
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public googleId : string
}

export class GoogleSignIn {
    @ApiProperty()
    @IsString()
    @IsOptional()
    public email : string
}

export class GoogleSignUp {
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    socialLink: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    seeVisualAd: boolean;

    @ApiProperty({
        description: 'role',
        enum: Role,
    })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @ApiProperty()
    @IsString()
    @IsOptional()
    public googleId : string

    @ApiProperty()
    @IsString()
    @IsOptional()
    public accountName : string

    @ApiProperty()
    @IsString()
    @IsOptional()
    public email : string
}

export class ResetPasswordDto {
    @ApiProperty()
    @IsString()
    @Match('password', { message: 'passwords do not match' })
    password: string;

    @ApiProperty()
    @IsString()
    confirmPassword: string;
}
