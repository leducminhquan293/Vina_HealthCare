import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api-routes')
  getApiRoutes(): any {
    return {
      message: 'Vina Healthcare API Routes',
      baseUrl: 'http://localhost:3001',
      endpoints: {
        auth: {
          'POST /auth/signup': 'Đăng ký tài khoản mới',
          'POST /auth/signin': 'Đăng nhập'
        },
        users: {
          'POST /users': 'Tạo user mới',
          'GET /users': 'Lấy danh sách users (có thể filter theo role, search)',
          'GET /users/count': 'Đếm số lượng users theo role',
          'GET /users/roles': 'Lấy danh sách các roles có sẵn',
          'GET /users/:id': 'Lấy thông tin user theo ID',
          'PUT /users/:id': 'Cập nhật thông tin user',
          'DELETE /users/:id': 'Xóa user'
        },
        services: {
          'POST /services': 'Tạo service mới',
          'GET /services': 'Lấy danh sách services'
        },
        dmServices: {
          'POST /dm-services': 'Tạo DM service mới',
          'GET /dm-services': 'Lấy danh sách DM services',
          'GET /dm-services/category/:category': 'Lấy DM services theo category',
          'GET /dm-services/:id': 'Lấy DM service theo ID',
          'PUT /dm-services/:id': 'Cập nhật DM service',
          'DELETE /dm-services/:id': 'Xóa DM service'
        },
        dmFeatureServices: {
          'POST /dm-feature-services': 'Tạo DM feature service mới',
          'GET /dm-feature-services': 'Lấy danh sách DM feature services',
          'GET /dm-feature-services/category/:category': 'Lấy DM feature services theo category',
          'GET /dm-feature-services/:id': 'Lấy DM feature service theo ID',
          'PUT /dm-feature-services/:id': 'Cập nhật DM feature service',
          'DELETE /dm-feature-services/:id': 'Xóa DM feature service'
        },
        dmPriceServices: {
          'POST /dm-price-services': 'Tạo DM price service mới',
          'GET /dm-price-services': 'Lấy danh sách DM price services',
          'GET /dm-price-services/category/:category': 'Lấy DM price services theo category',
          'GET /dm-price-services/:id': 'Lấy DM price service theo ID',
          'PUT /dm-price-services/:id': 'Cập nhật DM price service',
          'DELETE /dm-price-services/:id': 'Xóa DM price service'
        },
        general: {
          'GET /': 'Health check endpoint',
          'GET /api-routes': 'Danh sách tất cả API routes (this endpoint)'
        }
      },
      authentication: {
        note: 'Các endpoint /users hiện tại không yêu cầu JWT token (có thể thêm sau)',
        roles: {
          PATIENT: 'Bệnh nhân',
          DOCTOR: 'Bác sĩ',
          NURSE: 'Y tá'
        }
      },
      documentation: {
        fullDoc: 'Xem file API_DOCUMENTATION.md để biết chi tiết đầy đủ'
      }
    };
  }
}
