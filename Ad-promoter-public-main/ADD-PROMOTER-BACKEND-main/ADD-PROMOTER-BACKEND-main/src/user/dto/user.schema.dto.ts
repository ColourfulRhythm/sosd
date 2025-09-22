import { ApiProperty } from "@nestjs/swagger";
import { AdSchemaDto } from "src/ads/dto/ads.schema.dto";
import { v4 as uuid } from 'uuid';
import { Role, Gender } from "../schemas/user.schema"
import { WalletSchemaDto } from "src/wallet/dto/wallet.schema.dto";

export class UserSchemaDto {
    @ApiProperty({
        example: uuid
    })
    userID: string;

    @ApiProperty({
        example: "https://s3.amazon-ad-promtoer-bucket.com/sjkd-a938d-93ujdn"
    })
    profilePicture: string;

    @ApiProperty()
    phoneNumberVerified: boolean;

    @ApiProperty({
        enum: Gender
    })
    gender: string;

    @ApiProperty({
        example: "https://insta.com/dannyxy"
    })
    socialLink: string;

    @ApiProperty()
    emailVerified: boolean;

    @ApiProperty({
        example: "dannyxy"
    })
    accountName: string;

    @ApiProperty()
    dateOfBirth: Date;

    @ApiProperty()
    dateCreated: Date;

    @ApiProperty({
        example: "+2347012345678"
    })
    phoneNumber: string;

    @ApiProperty({
        example: "dannyxy@gmail.com"
    })
    email: string;

    @ApiProperty()
    seeVisualAd: boolean;

    @ApiProperty({
        enum: Role
    })
    role: string;

    @ApiProperty()
    socialLinkVerified: boolean;

    @ApiProperty()
    password: string;

    @ApiProperty()
    passwordResetToken: string;

    @ApiProperty()
    passwordResetExpires: Date;

    @ApiProperty()
    googleId: string;

    @ApiProperty()
    seeVisual: boolean;

    @ApiProperty()
    savedJobs: AdSchemaDto[];

    @ApiProperty()
    promotedAds: AdSchemaDto[];

    @ApiProperty()
    wallet: WalletSchemaDto;

    @ApiProperty()
    mostUsedTags: string[];

    @ApiProperty()
    deletedAdsId: string[];

    @ApiProperty()
    recentAds: string[];

    @ApiProperty()
    browserNotification: boolean;

    @ApiProperty()
    emailNotification: boolean;

    @ApiProperty()
    desktopNotification: boolean;

    @ApiProperty()
    NotifyOffers: boolean;
}