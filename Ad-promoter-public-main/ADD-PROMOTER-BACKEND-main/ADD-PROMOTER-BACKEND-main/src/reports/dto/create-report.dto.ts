import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateReportDto {
    @ApiProperty()
    @IsString()
    public adsId: string

    @ApiProperty()
    @IsString()
    public report: string
}