import { CreateMedicalStaffProfileTranslationDto } from './create-medical-staff-profile-translation.dto';
export declare class CreateMedicalStaffProfileDto {
    user_id: number;
    name: string;
    email: string;
    status: string;
    experience_years?: number;
    license_number?: string;
    profile_image?: string;
    translations?: CreateMedicalStaffProfileTranslationDto[];
}
