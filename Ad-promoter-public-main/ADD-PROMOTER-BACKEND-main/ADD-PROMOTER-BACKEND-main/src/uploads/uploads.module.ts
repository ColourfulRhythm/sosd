import { Module } from '@nestjs/common';
import { FileUploadService } from './uploads.service';
import { FileController } from './uploads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './schema/uploads.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Upload.name,
                schema: UploadSchema,
            },
        ]),
    ],
    controllers: [FileController],
    providers: [FileUploadService],
})
export class UploadsModule {}
