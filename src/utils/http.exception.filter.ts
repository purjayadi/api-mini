import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res: Response = ctx.getResponse<Response>();
    const req: Request = ctx.getRequest<Request>();
    const status: HttpStatus = exception.getStatus();

    if (status === HttpStatus.BAD_REQUEST) {
      const catchRes: any = exception.getResponse();
      return res.status(status).json({
        statusCode: status,
        error: catchRes.message,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }

    res.status(status).json({
      statusCode: status,
      message: status !== 500 ? exception.message : 'Something went wrong',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
