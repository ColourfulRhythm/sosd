import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class UpdateTagsDto{
    @ApiProperty()
    @IsNotEmpty()
    public tags: string[]
}