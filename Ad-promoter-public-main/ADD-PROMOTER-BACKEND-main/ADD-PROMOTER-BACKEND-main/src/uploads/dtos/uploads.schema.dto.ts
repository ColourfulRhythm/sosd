import { ApiProperty } from "@nestjs/swagger";
import { UserSchemaDto } from "src/user/dto/user.schema.dto";

export class UploadSchemaDto {
    @ApiProperty()
    fileName: string;

    @ApiProperty()
    fileUrl: string;

    @ApiProperty()
    key: string;

    @ApiProperty()
    user: UserSchemaDto;
}