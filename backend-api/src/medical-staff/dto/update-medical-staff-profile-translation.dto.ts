import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalStaffProfileTranslationDto } from './create-medical-staff-profile-translation.dto';

export class UpdateMedicalStaffProfileTranslationDto extends PartialType(CreateMedicalStaffProfileTranslationDto) { } 