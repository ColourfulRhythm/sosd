import { ApiProperty } from "@nestjs/swagger";
import { AdSchemaDto } from "./ads.schema.dto";

export class CreateAdResponse {
    @ApiProperty()
    ad: AdSchemaDto

    @ApiProperty({ type: String, example: "https://paystack.com/pay/kdanilc"})
    paymentDetails: string
}