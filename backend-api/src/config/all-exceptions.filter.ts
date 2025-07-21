import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Xử lý từng loại lỗi cụ thể
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Xử lý các mã lỗi HTTP cụ thể
      switch (status) {
        case HttpStatus.BAD_REQUEST: // 400
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Yêu cầu không hợp lệ',
            error: 'Bad Request',
          });
          break;

        case HttpStatus.UNAUTHORIZED: // 401
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Token không hợp lệ',
            error: 'Unauthorized',
          });
          break;

        case HttpStatus.FORBIDDEN: // 403
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Không có quyền truy cập',
            error: 'Forbidden',
          });
          break;

        case HttpStatus.NOT_FOUND: // 404
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Dữ liệu không được tìm thấy',
            error: 'Not Found',
          });
          break;

        case HttpStatus.CONFLICT: // 409
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Xung đột dữ liệu',
            error: 'Conflict',
          });
          break;

        case HttpStatus.TOO_MANY_REQUESTS: // 429
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
            error: 'Too Many Requests',
          });
          break;

        case HttpStatus.UNPROCESSABLE_ENTITY: // 422
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Dữ liệu không thể xử lý',
            error: 'Unprocessable Entity',
          });
          break;

        case HttpStatus.INTERNAL_SERVER_ERROR: // 500
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Lỗi máy chủ nội bộ',
            error: 'Internal Server Error',
          });
          break;

        case HttpStatus.BAD_GATEWAY: // 502
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Lỗi cổng kết nối',
            error: 'Bad Gateway',
          });
          break;

        case HttpStatus.SERVICE_UNAVAILABLE: // 503
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Dịch vụ tạm thời không khả dụng',
            error: 'Service Unavailable',
          });
          break;

        case HttpStatus.GATEWAY_TIMEOUT: // 504
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Hết thời gian chờ cổng kết nối',
            error: 'Gateway Timeout',
          });
          break;

        default:
          // Xử lý các lỗi HttpException khác không được liệt kê
          response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exceptionResponse['message'] || exception.message,
            error: exceptionResponse['error'] || 'Http Exception',
          });
          break;
      }
    } else if (exception instanceof TypeError) {
      // Xử lý lỗi TypeError
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'TypeError occurred',
        error: exception.message,
      });
    } else {
      // Xử lý lỗi chung (không xác định)
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: 'Internal server error',
        error: exception instanceof Error ? exception.message : 'Unknown error',
      });
    }
  }
}