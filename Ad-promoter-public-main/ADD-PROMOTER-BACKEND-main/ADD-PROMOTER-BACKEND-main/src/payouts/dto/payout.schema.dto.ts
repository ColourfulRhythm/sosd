import { ApiProperty } from "@nestjs/swagger";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";
import { Status } from "../schema/payouts.schema";
import { NotificationType } from "src/notifications/schemas/notificationSchema";
import { ObjectId } from "mongodb";
import {Types} from "mongoose";

export class PayoutsSchemaDto {
    @ApiProperty()
    user: UserSchemaDto;

    @ApiProperty({
        example: "RCP_1a25w1h3n0xctjg"
    })
    recipient: string;

    @ApiProperty({
        example: 5000
    })
    amount: number;

    @ApiProperty({
        enum: NotificationType,
        example: NotificationType.NewAdvert
    })
    type: string;

    @ApiProperty({
        example: "Tunde"
    })
    name: string;

    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    wallet: ObjectId;

    @ApiProperty({
        type: String,
        enum: Status
    })
    status: Status;
}
