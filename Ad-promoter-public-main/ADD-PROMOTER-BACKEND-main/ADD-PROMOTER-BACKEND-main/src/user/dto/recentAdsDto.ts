import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class RecentAdsDto{
    @ApiProperty()
    @IsNotEmpty()
    ads: string[]
}