import { ApiProperty } from '@nestjs/swagger';
import { AdType, CTAButtonDesign } from '../schemas/ad.schema';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateDetailAdDto {
    @ApiProperty()
    @IsNotEmpty()
    producName: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    tags: Array<string>;

    @ApiProperty({
        description: 'ad-type',
        enum: AdType,
    })
    @IsNotEmpty()
    @IsEnum(AdType)
    type: AdType;

    @ApiProperty()
    @IsNotEmpty()
    images: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    promotedLink: string;

    @ApiProperty()
    @IsNotEmpty()
    budget: number;

    @ApiProperty()
    isNfsw: boolean;

    @ApiProperty()
    @IsString()
    CTAButtonDesign?: CTAButtonDesign;
}

export class CreateVisualAdDto {
    @ApiProperty()
    @IsNotEmpty()
    producName: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsArray()
    tags: Array<string>;

    @ApiProperty({
        description: 'ad-type',
        enum: AdType,
    })
    @IsNotEmpty()
    @IsEnum(AdType)
    type: AdType;

    @ApiProperty()
    @IsNotEmpty()
    rate: number;

    @ApiProperty()
    @IsNotEmpty()
    images: Array<string>;

    @ApiProperty()
    @IsNotEmpty()
    promotedLink: string;

    @ApiProperty()
    @IsNotEmpty()
    budget: number;

    @ApiProperty()
    isNfsw: boolean;
}
export class CreateDirectLinkAdDto {
    @ApiProperty()
    @IsNotEmpty()
    producName: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    tags: Array<string>;

    @ApiProperty({
        description: 'ad-type',
        enum: AdType,
    })
    @IsNotEmpty()
    @IsEnum(AdType)
    type: AdType;

    @ApiProperty()
    @IsNotEmpty()
    rate: number;

    @ApiProperty()
    @IsNotEmpty()
    promotedLink: string;

    @ApiProperty()
    @IsNotEmpty()
    budget: number;

    @ApiProperty()
    isNfsw: boolean;
}
export class CreateAdDto {
    @ApiProperty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsString()
    redirectUrl: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsArray()
    tags: Array<string>;

    @ApiProperty({
        description: 'ad-type',
        enum: AdType,
    })
    @IsNotEmpty()
    @IsEnum(AdType)
    type: AdType;

    @ApiProperty({
        description: 'call-to-action',
        enum: CTAButtonDesign,
    })
    @IsEnum(CTAButtonDesign)
    @IsOptional()
    @IsString()
    CTAButtonDesign: CTAButtonDesign;

    @ApiProperty()
    @IsArray()
    images: Array<string>;

    @IsOptional()
    @ApiProperty()
    promotedLink: string;

    @ApiProperty()
    @IsNotEmpty()
    budget: number;

    @ApiProperty()
    isNfsw: boolean;
}

export class VerifyAdPaymentDto {
    @ApiProperty()
    @IsString()
    reference: string;

    @ApiProperty()
    @IsString()
    status?: string;

    @ApiProperty()
    @IsString()
    tx_ref?: string;

    @ApiProperty()
    @IsString()
    transaction_Id?: string;
}

export class GetAdDto{
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    status: string;
}
