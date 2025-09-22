import { ApiProperty } from "@nestjs/swagger"
;
import { AdStatus, AdType, CTAButtonDesign } from "../schemas/ad.schema";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
import { FeedbackSchemaDto } from "src/feedback/dto/feedback.schema.dto";
import { PromotionSchemaDto } from "src/promotion/dto/promotion.schema.dto";
import { ReportsSchemaDto } from "src/reports/dto/reports.schema.dto";
export class AdSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;
    
    @ApiProperty({
        example: "Barbie's Fragrance"
    })
    productName: string;

    @ApiProperty({
        example: "Smell even better"
    })
    description: string;

    @ApiProperty({
        example: ["lifestyle", "bodycare"]
    })
    tags: string[];

    @ApiProperty({
        enum: AdType
    })
    type: AdType;

    @ApiProperty()
    rate: number;

    @ApiProperty({
        example: "gs8fysh"
    })
    paymentRef: string;

    @ApiProperty({
        example: ["https://s3.amazon-ad-promoter29302.com/sjke-03490-ksjo"]
    })
    images: string[];

    @ApiProperty()
    videos: string[];

    @ApiProperty({
        example: "https://barbiesfragrance.com"
    })
    promotedLink: string;

    @ApiProperty()
    approvalStatus: boolean;

    @ApiProperty()
    isPaid: boolean;

    @ApiProperty()
    promotions: PromotionSchemaDto[];

    @ApiProperty()
    conversions: number;

    @ApiProperty()
    approvedVisualAd: number;

    @ApiProperty()
    clicks: number;

    @ApiProperty()
    budget: number;

    @ApiProperty()
    target: number;

    @ApiProperty({
        enum: AdStatus
    })
    adStatus: AdStatus;

    @ApiProperty()
    completed: boolean;

    @ApiProperty()
    creator: UserSchemaDto;

    @ApiProperty()
    dateCreated: Date;

    @ApiProperty({
        enum: CTAButtonDesign
    })
    CTAButtonDesign: CTAButtonDesign;

    @ApiProperty()
    reports: ReportsSchemaDto[]

    @ApiProperty()
    feedback: FeedbackSchemaDto[]
}