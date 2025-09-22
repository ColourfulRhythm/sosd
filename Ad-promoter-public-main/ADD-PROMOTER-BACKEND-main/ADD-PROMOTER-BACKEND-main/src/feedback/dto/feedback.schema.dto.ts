import { ApiProperty } from "@nestjs/swagger";
import { UserSchemaDto } from "../../user/dto/user.schema.dto";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";

export class FeedbackSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;

    @ApiProperty({
        example: "Proper Product"
    })
    feedback: string;

    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    user: ObjectId;
}
