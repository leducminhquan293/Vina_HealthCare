"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            switch (status) {
                case common_1.HttpStatus.BAD_REQUEST:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Yêu cầu không hợp lệ',
                        error: 'Bad Request',
                    });
                    break;
                case common_1.HttpStatus.UNAUTHORIZED:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Token không hợp lệ',
                        error: 'Unauthorized',
                    });
                    break;
                case common_1.HttpStatus.FORBIDDEN:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Không có quyền truy cập',
                        error: 'Forbidden',
                    });
                    break;
                case common_1.HttpStatus.NOT_FOUND:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Dữ liệu không được tìm thấy',
                        error: 'Not Found',
                    });
                    break;
                case common_1.HttpStatus.CONFLICT:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Xung đột dữ liệu',
                        error: 'Conflict',
                    });
                    break;
                case common_1.HttpStatus.TOO_MANY_REQUESTS:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
                        error: 'Too Many Requests',
                    });
                    break;
                case common_1.HttpStatus.UNPROCESSABLE_ENTITY:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Dữ liệu không thể xử lý',
                        error: 'Unprocessable Entity',
                    });
                    break;
                case common_1.HttpStatus.INTERNAL_SERVER_ERROR:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Lỗi máy chủ nội bộ',
                        error: 'Internal Server Error',
                    });
                    break;
                case common_1.HttpStatus.BAD_GATEWAY:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Lỗi cổng kết nối',
                        error: 'Bad Gateway',
                    });
                    break;
                case common_1.HttpStatus.SERVICE_UNAVAILABLE:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Dịch vụ tạm thời không khả dụng',
                        error: 'Service Unavailable',
                    });
                    break;
                case common_1.HttpStatus.GATEWAY_TIMEOUT:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: 'Hết thời gian chờ cổng kết nối',
                        error: 'Gateway Timeout',
                    });
                    break;
                default:
                    response.status(status).json({
                        statusCode: status,
                        timestamp: new Date().toISOString(),
                        path: request.url,
                        message: exceptionResponse['message'] || exception.message,
                        error: exceptionResponse['error'] || 'Http Exception',
                    });
                    break;
            }
        }
        else if (exception instanceof TypeError) {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'TypeError occurred',
                error: exception.message,
            });
        }
        else {
            response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: 'Internal server error',
                error: exception instanceof Error ? exception.message : 'Unknown error',
            });
        }
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map