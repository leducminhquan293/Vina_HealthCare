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
exports.MedicalStaffService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const medical_staff_profile_schema_1 = require("./schema/medical-staff-profile.schema");
const medical_staff_profile_translation_schema_1 = require("./schema/medical-staff-profile-translation.schema");
let MedicalStaffService = class MedicalStaffService {
    profileModel;
    translationModel;
    constructor(profileModel, translationModel) {
        this.profileModel = profileModel;
        this.translationModel = translationModel;
    }
    async createProfile(dto) {
        const createdProfile = new this.profileModel({
            ...dto,
            translations: []
        });
        await createdProfile.save();
        let translationIds = [];
        if (dto.translations && dto.translations.length > 0) {
            const translationsWithProfileId = dto.translations.map(t => ({
                ...t,
                profile_id: createdProfile._id
            }));
            const createdTranslations = await this.translationModel.insertMany(translationsWithProfileId);
            translationIds = createdTranslations.map(t => t._id);
            createdProfile.translations = translationIds;
            await createdProfile.save();
        }
        return createdProfile.populate('translations');
    }
    async findAllProfiles() {
        return this.profileModel.find().populate('translations').exec();
    }
    async findProfileById(id) {
        const profile = await this.profileModel.findById(id).populate('translations').exec();
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        return profile;
    }
    async updateProfile(id, dto) {
        const profile = await this.profileModel.findById(id);
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        if (dto.translations) {
            await this.translationModel.deleteMany({ _id: { $in: profile.translations } });
            const createdTranslations = await this.translationModel.insertMany(dto.translations.map(t => ({ ...t, profile_id: profile._id })));
            dto.translations = createdTranslations.map(t => t._id);
        }
        const updated = await this.profileModel.findByIdAndUpdate(id, dto, { new: true }).populate('translations').exec();
        return updated;
    }
    async deleteProfile(id) {
        const profile = await this.profileModel.findById(id);
        if (!profile)
            throw new common_1.NotFoundException('Profile not found');
        await this.translationModel.deleteMany({ _id: { $in: profile.translations } });
        return this.profileModel.findByIdAndDelete(id);
    }
    async addTranslation(profileId, dto) {
        const translation = new this.translationModel({ ...dto, profile_id: profileId });
        await translation.save();
        await this.profileModel.findByIdAndUpdate(profileId, { $push: { translations: translation._id } });
        return translation;
    }
    async updateTranslation(id, dto) {
        return this.translationModel.findByIdAndUpdate(id, dto, { new: true });
    }
    async deleteTranslation(id) {
        const translation = await this.translationModel.findByIdAndDelete(id);
        if (translation) {
            await this.profileModel.updateMany({}, { $pull: { translations: translation._id } });
        }
        return translation;
    }
};
exports.MedicalStaffService = MedicalStaffService;
exports.MedicalStaffService = MedicalStaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(medical_staff_profile_schema_1.MedicalStaffProfile.name)),
    __param(1, (0, mongoose_1.InjectModel)(medical_staff_profile_translation_schema_1.MedicalStaffProfileTranslation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MedicalStaffService);
//# sourceMappingURL=medical-staff.service.js.map