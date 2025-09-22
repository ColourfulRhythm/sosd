import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
    @ApiProperty()
    success: boolean;

    data: T | T[];

    @ApiProperty({example: "response"})
    message: string
}