"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getApiRoutes() {
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
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('api-routes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getApiRoutes", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map