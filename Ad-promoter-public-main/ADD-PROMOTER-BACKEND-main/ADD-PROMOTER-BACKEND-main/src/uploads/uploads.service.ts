import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { Model } from 'mongoose';
import { UploadDocument } from './schema/uploads.schema';
import { UserDocument } from 'src/user/schemas/user.schema';
import { Express } from 'express';

@Injectable()
export class FileUploadService {
    constructor(
        @InjectModel('Upload')
        private readonly uploadsModel: Model<UploadDocument>,
        private readonly configService: ConfigService,
    ) {}

    async uploadFile(files: Express.Multer.File[], user: UserDocument) {
        const responses: UploadDocument[] = [];

        for (const file of files) {
            const s3 = new S3({
                accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
                secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
            });
            const uploadResult = await s3
                .upload({
                    Bucket: this.configService.get('AWS_BUCKET_NAME'),
                    Body: file.buffer,
                    Key: `${uuid()}-${file.originalname}`,
                })
                .promise();

            const fileStorageInDB = {
                fileName: file.originalname,
                fileUrl: uploadResult.Location,
                key: uploadResult.Key,
                user: user._id,
            };

            const filestored = new this.uploadsModel(fileStorageInDB);
            await filestored.save();
            responses.push(filestored);
        }
        return responses;
    }
}
