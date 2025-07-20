"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalStaffModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const medical_staff_profile_schema_1 = require("./schema/medical-staff-profile.schema");
const medical_staff_profile_translation_schema_1 = require("./schema/medical-staff-profile-translation.schema");
const medical_staff_service_1 = require("./medical-staff.service");
const medical_staff_controller_1 = require("./medical-staff.controller");
let MedicalStaffModule = class MedicalStaffModule {
};
exports.MedicalStaffModule = MedicalStaffModule;
exports.MedicalStaffModule = MedicalStaffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: medical_staff_profile_schema_1.MedicalStaffProfile.name, schema: medical_staff_profile_schema_1.MedicalStaffProfileSchema },
                { name: medical_staff_profile_translation_schema_1.MedicalStaffProfileTranslation.name, schema: medical_staff_profile_translation_schema_1.MedicalStaffProfileTranslationSchema }
            ])
        ],
        controllers: [medical_staff_controller_1.MedicalStaffController],
        providers: [medical_staff_service_1.MedicalStaffService],
        exports: [medical_staff_service_1.MedicalStaffService]
    })
], MedicalStaffModule);
//# sourceMappingURL=medical-staff.module.js.map