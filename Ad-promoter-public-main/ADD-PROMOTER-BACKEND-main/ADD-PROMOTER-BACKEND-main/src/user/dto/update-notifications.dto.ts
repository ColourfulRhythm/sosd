import {ApiProperty} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class UpdateNotificationsDto{
    @ApiProperty()
    @IsOptional()
    browserNotification?: boolean;

    @ApiProperty()
    @IsOptional()
    emailNotification?: boolean;

    @ApiProperty()
    @IsOptional()
    desktopNotification?: boolean;

    @ApiProperty()
    @IsOptional()
    NotifyOffers?: boolean;
}