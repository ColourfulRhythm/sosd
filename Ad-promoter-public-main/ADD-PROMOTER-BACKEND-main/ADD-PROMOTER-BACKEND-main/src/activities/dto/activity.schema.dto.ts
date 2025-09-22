import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";
import { ActivityType } from "../schema/activity.schema";

export class ActivitySchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;

    @ApiProperty()
    sender: UserSchemaDto;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    recipient: UserSchemaDto  | ObjectId;

    @ApiProperty()
    title: string;

    @ApiProperty()
    type: ActivityType;

    @ApiProperty()
    body: string;

    @ApiProperty()
    adType: string;

    @ApiProperty()
    read: boolean;
}