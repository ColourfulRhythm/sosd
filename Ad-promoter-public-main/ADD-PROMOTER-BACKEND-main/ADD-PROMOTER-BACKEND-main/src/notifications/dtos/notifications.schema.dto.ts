import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";

export class NotificationSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;

    @ApiProperty({
        example: "Your advert has just been promoted"
    })
    title: string;

    @ApiProperty({
        example: "Your advert Barbies fragrance has just been promoted by xxxxxxxx"
    })
    body: string;

    @ApiProperty({
        example: "https://barbiesfragrance.com/29d0h"
    })
    promotionLink: string;

    @ApiProperty()
    sender: UserSchemaDto;

    @ApiProperty()
    receiver: UserSchemaDto;

    @ApiProperty()
    isRead: boolean;

    @ApiProperty()
    DateCreated: Date;
}