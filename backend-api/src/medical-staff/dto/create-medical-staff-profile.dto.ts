import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsEmail, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMedicalStaffProfileTranslationDto } from './create-medical-staff-profile-translation.dto';

export class CreateMedicalStaffProfileDto {
    @IsInt()
    user_id: number;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsIn(['active', 'inactive'])
    status: string;

    @IsOptional()
    @IsInt()
    experience_years?: number;

    @IsOptional()
    @IsString()
    license_number?: string;

    @IsOptional()
    @IsString()
    profile_image?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMedicalStaffProfileTranslationDto)
    translations?: CreateMedicalStaffProfileTranslationDto[];
} 