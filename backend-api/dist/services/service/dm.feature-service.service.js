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
exports.DMFeatureServiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dm_feature_service_schema_1 = require("../schema/dm.feature-service.schema");
let DMFeatureServiceService = class DMFeatureServiceService {
    serviceModel;
    constructor(serviceModel) {
        this.serviceModel = serviceModel;
    }
    async create(createDMServiceDTO) {
        const createdService = new this.serviceModel(createDMServiceDTO);
        return createdService.save();
    }
    async findAll(category) {
        if (category) {
            return this.serviceModel.find({ category }).exec();
        }
        return this.serviceModel.find().exec();
    }
    async findOne(id) {
        return this.serviceModel.findById(id).exec();
    }
    async update(id, createDMServiceDTO) {
        return this.serviceModel.findByIdAndUpdate(id, createDMServiceDTO, { new: true }).exec();
    }
    async remove(id) {
        await this.serviceModel.findByIdAndDelete(id).exec();
    }
};
exports.DMFeatureServiceService = DMFeatureServiceService;
exports.DMFeatureServiceService = DMFeatureServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(dm_feature_service_schema_1.DMFeatureService.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DMFeatureServiceService);
//# sourceMappingURL=dm.feature-service.service.js.map