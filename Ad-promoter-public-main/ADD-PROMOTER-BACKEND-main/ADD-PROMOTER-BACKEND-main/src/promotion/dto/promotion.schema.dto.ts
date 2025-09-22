import { ApiProperty } from "@nestjs/swagger";
import { AdSchemaDto } from "src/ads/dto/ads.schema.dto";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";
import { ObjectId } from "mongodb";
import * as shortId from 'shortid';
import { Types } from "mongoose";
import { AdType } from "src/ads/schemas/ad.schema";

export class PromotionSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;
    
    @ApiProperty()
    ad: AdSchemaDto;

    @ApiProperty()
    promoter: UserSchemaDto;

    @ApiProperty({
        example: 50
    })
    clicks: number;

    @ApiProperty({
        example: 50
    })
    conversions: number;

    @ApiProperty({
        example: 4000
    })
    amountEarned: number;

    @ApiProperty()
    approvedForPayment: boolean;

    @ApiProperty({
        enum: AdType
    })
    adType: string;

    @ApiProperty()
    dateInitiated: Date;

    @ApiProperty({
        example: "barbiefrag.com"
    })
    link: string;

    @ApiProperty({
        example: shortId.generate
    })
    uniqueCode: string;
}