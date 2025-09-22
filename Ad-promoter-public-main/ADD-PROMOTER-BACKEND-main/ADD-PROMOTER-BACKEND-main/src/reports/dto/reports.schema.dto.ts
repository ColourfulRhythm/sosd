import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { AdSchemaDto } from "src/ads/dto/ads.schema.dto";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";

export class ReportsSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;

    @ApiProperty()
    ad: AdSchemaDto;

    @ApiProperty({
        example: "misleading content"
    })
    reportReason: string;

    @ApiProperty()
    user: UserSchemaDto;
}