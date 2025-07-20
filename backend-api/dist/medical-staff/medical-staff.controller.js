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
exports.MedicalStaffController = void 0;
const common_1 = require("@nestjs/common");
const medical_staff_service_1 = require("./medical-staff.service");
const create_medical_staff_profile_dto_1 = require("./dto/create-medical-staff-profile.dto");
const update_medical_staff_profile_dto_1 = require("./dto/update-medical-staff-profile.dto");
const create_medical_staff_profile_translation_dto_1 = require("./dto/create-medical-staff-profile-translation.dto");
const update_medical_staff_profile_translation_dto_1 = require("./dto/update-medical-staff-profile-translation.dto");
let MedicalStaffController = class MedicalStaffController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto) {
        return this.service.createProfile(dto);
    }
    async findAll() {
        return this.service.findAllProfiles();
    }
    async findOne(id) {
        return this.service.findProfileById(id);
    }
    async update(id, dto) {
        return this.service.updateProfile(id, dto);
    }
    async remove(id) {
        return this.service.deleteProfile(id);
    }
    async addTranslation(id, dto) {
        return this.service.addTranslation(id, dto);
    }
    async updateTranslation(translationId, dto) {
        return this.service.updateTranslation(translationId, dto);
    }
    async deleteTranslation(translationId) {
        return this.service.deleteTranslation(translationId);
    }
};
exports.MedicalStaffController = MedicalStaffController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_medical_staff_profile_dto_1.CreateMedicalStaffProfileDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medical_staff_profile_dto_1.UpdateMedicalStaffProfileDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/translations'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_medical_staff_profile_translation_dto_1.CreateMedicalStaffProfileTranslationDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "addTranslation", null);
__decorate([
    (0, common_1.Put)('translations/:translationId'),
    __param(0, (0, common_1.Param)('translationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_medical_staff_profile_translation_dto_1.UpdateMedicalStaffProfileTranslationDto]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "updateTranslation", null);
__decorate([
    (0, common_1.Delete)('translations/:translationId'),
    __param(0, (0, common_1.Param)('translationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MedicalStaffController.prototype, "deleteTranslation", null);
exports.MedicalStaffController = MedicalStaffController = __decorate([
    (0, common_1.Controller)('medical-staff-profiles'),
    __metadata("design:paramtypes", [medical_staff_service_1.MedicalStaffService])
], MedicalStaffController);
//# sourceMappingURL=medical-staff.controller.js.map