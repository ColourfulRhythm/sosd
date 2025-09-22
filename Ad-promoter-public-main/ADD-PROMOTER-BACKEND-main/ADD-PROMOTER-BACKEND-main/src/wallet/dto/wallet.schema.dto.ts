import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";

export class WalletSchemaDto {
    @ApiProperty()
    walletBalance: number;

    @ApiProperty()
    walletId: string;

    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    walletOwner: ObjectId

    @ApiProperty()
    recipients: string[];
}