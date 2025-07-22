import { MedicalStaffService } from './medical-staff.service';
import { CreateMedicalStaffProfileDto } from './dto/create-medical-staff-profile.dto';
import { UpdateMedicalStaffProfileDto } from './dto/update-medical-staff-profile.dto';
import { CreateMedicalStaffProfileTranslationDto } from './dto/create-medical-staff-profile-translation.dto';
import { UpdateMedicalStaffProfileTranslationDto } from './dto/update-medical-staff-profile-translation.dto';
export declare class MedicalStaffController {
    private readonly service;
    constructor(service: MedicalStaffService);
    create(dto: CreateMedicalStaffProfileDto): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile.schema").MedicalStaffProfileDocument, {}> & import("./schema/medical-staff-profile.schema").MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile.schema").MedicalStaffProfileDocument, {}> & import("./schema/medical-staff-profile.schema").MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile.schema").MedicalStaffProfileDocument, {}> & import("./schema/medical-staff-profile.schema").MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateMedicalStaffProfileDto): Promise<(import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile.schema").MedicalStaffProfileDocument, {}> & import("./schema/medical-staff-profile.schema").MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile.schema").MedicalStaffProfileDocument, {}> & import("./schema/medical-staff-profile.schema").MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addTranslation(id: string, dto: CreateMedicalStaffProfileTranslationDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslationDocument, {}> & import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTranslation(translationId: string, dto: UpdateMedicalStaffProfileTranslationDto): Promise<(import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslationDocument, {}> & import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteTranslation(translationId: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslationDocument, {}> & import("./schema/medical-staff-profile-translation.schema").MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
