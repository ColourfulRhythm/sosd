import { UserSchemaDto } from 'src/user/dto/user.schema.dto';
import { TokenDto } from './tokenDto';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponse extends TokenDto {
    @ApiProperty()
    user: UserSchemaDto;
}