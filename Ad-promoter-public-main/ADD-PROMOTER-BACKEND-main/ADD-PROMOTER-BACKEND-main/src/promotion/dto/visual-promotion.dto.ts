import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VisualPromotionDto {
    @ApiProperty()
    @IsString()
    adID: string;

    @ApiProperty()
    @IsString()
    link: string;
}
