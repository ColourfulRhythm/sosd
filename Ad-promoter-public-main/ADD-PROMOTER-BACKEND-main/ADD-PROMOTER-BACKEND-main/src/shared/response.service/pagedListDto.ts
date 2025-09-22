import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from './responseDto';

export class PagedListDto<T> extends ResponseDto<T> {
    @ApiProperty()
    count: number;

    @ApiProperty()
    total: number;
}