import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ActivityType } from '../schema/activity.schema';

export class CreateActivityDto {
    constructor(recipientId, senderId, title, body, type, userID, adType) {
        this.type = type;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.body = body;
        this.title = title;
        this.userID = userID;
        this.adType = adType;
    }

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    recipientId: string;

    @IsString()
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    senderId: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    userID: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    body: string;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    type: ActivityType;

    @IsString()
    @ApiProperty()
    @IsNotEmpty()
    adType: string;
}

export class DeleteTagsDto{
    @ApiProperty()
    @IsNotEmpty()
    public activities: string[]
}
