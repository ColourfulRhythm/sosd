import * as Error from 'mongoose/lib/error';
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        console.log(exception, 'here');
        let error;

        switch (exception.name) {
            case 'DocumentNotFoundError': {
                error = {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Not Found',
                    data: exception.message,
                };
                break;
            }

            case 'CastError': {
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Cast error',
                };
                break;
            }
            case 'ValidatorError': {
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Validator Error',
                    data: exception.message,
                };
                break;
            }

            case 'ValidationError': {
                error = {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Validation Error',
                    data: exception.message,
                };
                break;
            }
            default: {
                error = {
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Internal Error',
                };
                break;
            }
        }

        response.status(error.statusCode).json({
            success: false,
            message: error.message,
        });
    }
}
