import { Model } from 'mongoose';
import { MedicalStaffProfile, MedicalStaffProfileDocument } from './schema/medical-staff-profile.schema';
import { MedicalStaffProfileTranslation, MedicalStaffProfileTranslationDocument } from './schema/medical-staff-profile-translation.schema';
import { CreateMedicalStaffProfileDto } from './dto/create-medical-staff-profile.dto';
import { UpdateMedicalStaffProfileDto } from './dto/update-medical-staff-profile.dto';
import { CreateMedicalStaffProfileTranslationDto } from './dto/create-medical-staff-profile-translation.dto';
import { UpdateMedicalStaffProfileTranslationDto } from './dto/update-medical-staff-profile-translation.dto';
export declare class MedicalStaffService {
    private profileModel;
    private translationModel;
    constructor(profileModel: Model<MedicalStaffProfileDocument>, translationModel: Model<MedicalStaffProfileTranslationDocument>);
    createProfile(dto: CreateMedicalStaffProfileDto): Promise<Omit<import("mongoose").Document<unknown, {}, MedicalStaffProfileDocument, {}> & MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, never>>;
    findAllProfiles(): Promise<(import("mongoose").Document<unknown, {}, MedicalStaffProfileDocument, {}> & MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findProfileById(id: string): Promise<import("mongoose").Document<unknown, {}, MedicalStaffProfileDocument, {}> & MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateProfile(id: string, dto: UpdateMedicalStaffProfileDto): Promise<(import("mongoose").Document<unknown, {}, MedicalStaffProfileDocument, {}> & MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteProfile(id: string): Promise<(import("mongoose").Document<unknown, {}, MedicalStaffProfileDocument, {}> & MedicalStaffProfile & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addTranslation(profileId: string, dto: CreateMedicalStaffProfileTranslationDto): Promise<import("mongoose").Document<unknown, {}, MedicalStaffProfileTranslationDocument, {}> & MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTranslation(id: string, dto: UpdateMedicalStaffProfileTranslationDto): Promise<(import("mongoose").Document<unknown, {}, MedicalStaffProfileTranslationDocument, {}> & MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteTranslation(id: string): Promise<(import("mongoose").Document<unknown, {}, MedicalStaffProfileTranslationDocument, {}> & MedicalStaffProfileTranslation & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
