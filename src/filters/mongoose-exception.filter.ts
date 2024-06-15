import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        console.log('from mongo exception', exception.code);

        switch (exception.code) {
            case 11000:
                response.status(HttpStatus.FORBIDDEN).json({
                    statusCode: HttpStatus.FORBIDDEN,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'You are already registered',
                });
                break;
            default:
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    message: 'Internal server error',
                });
                break;
        }
    }
}
