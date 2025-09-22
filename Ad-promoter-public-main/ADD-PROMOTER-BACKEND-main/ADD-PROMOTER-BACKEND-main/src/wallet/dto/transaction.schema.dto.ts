import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { TransactionType } from "../schemas/transaction.schema";

export class TransactionSchemaDto {
    @ApiProperty({
        type: Types.ObjectId,
        example: new ObjectId
    })
    _id: ObjectId;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    type: TransactionType;

    @ApiProperty()
    user: string;

    @ApiProperty()
    recipientCode: string;
}