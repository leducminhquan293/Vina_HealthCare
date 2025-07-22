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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMPriceServiceController = void 0;
const common_1 = require("@nestjs/common");
const create_dm_price_service_dto_1 = require("../dto/create-dm-price-service.dto");
const dm_price_service_service_1 = require("../service/dm.price-service.service");
let DMPriceServiceController = class DMPriceServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    async create(createServiceDto) {
        return this.serviceService.create(createServiceDto);
    }
    async findAll() {
        return this.serviceService.findAll();
    }
    async findByCategory(category) {
        return this.serviceService.findAll(category);
    }
    async findOne(id) {
        return this.serviceService.findOne(id);
    }
    async update(id, updateServiceDto) {
        return this.serviceService.update(id, updateServiceDto);
    }
    async remove(id) {
        return this.serviceService.remove(id);
    }
};
exports.DMPriceServiceController = DMPriceServiceController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dm_price_service_dto_1.CreateDMPriceServiceDTO]),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category/:category'),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_dm_price_service_dto_1.CreateDMPriceServiceDTO]),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DMPriceServiceController.prototype, "remove", null);
exports.DMPriceServiceController = DMPriceServiceController = __decorate([
    (0, common_1.Controller)('dm-price-services'),
    __metadata("design:paramtypes", [dm_price_service_service_1.DMPriceServiceService])
], DMPriceServiceController);
//# sourceMappingURL=dm.price-service.controller.js.map