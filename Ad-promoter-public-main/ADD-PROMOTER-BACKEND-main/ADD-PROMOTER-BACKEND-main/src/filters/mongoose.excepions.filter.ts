import * as Error from 'mongoose/lib/error';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { MongoError } from 'mongoose/node_modules/mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let error;
        console.log(exception);

        switch (exception.code) {
            case 11000:
                error = {
                    statusCode: HttpStatus.CONFLICT,
                    message: 'Duplicate key error',
                };
                break;
            case 121:
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Document failed validation',
                };
                break;
            case 11600:
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Write error',
                };
                break;
            case 125:
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Unrecognized expression',
                };
                break;
            // Add more cases as needed
            default:
                error = {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'An error occurred while processing your request',
                };
                break;
        }
        console.log(exception);

        response.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
}
