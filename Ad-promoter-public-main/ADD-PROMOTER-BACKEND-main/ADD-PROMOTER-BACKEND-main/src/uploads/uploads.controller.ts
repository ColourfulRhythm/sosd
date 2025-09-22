import {
  Controller,
  Post,
  UseInterceptors,
  UseGuards,
  ForbiddenException,
  UploadedFiles,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from 'src/uploads/uploads.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { GetUser } from 'src/auth/decorator';
import {
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { JwtGuard } from 'src/auth/guard';
import { ApiGenericOkResponse } from 'src/shared/response.service/apiGenericOkResponse';
import { UploadSchemaDto } from './dtos/uploads.schema.dto';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Uploads')
@Controller('fileUpload')
export class FileController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('image')
  @ApiGenericOkResponse(Array<UploadSchemaDto>)
  @ApiBody({
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @GetUser() user: UserDocument,
  ) {
    try {
      if (files.length < 1)
        throw new ForbiddenException("You can't upload a blank field");

      console.log(files);

      const uploadedFile = await this.fileUploadService.uploadFile(files, user);
      return { success: true, data: uploadedFile };
    } catch (error) {
      console.log(error);
      if (error.message.includes('boundary')) {
        throw new BadRequestException('Invalid Boundary/ Boundary Not Found');
      }

      throw new InternalServerErrorException(
        'Something went wrong while uploading your image',
      );
    }
  }
}
