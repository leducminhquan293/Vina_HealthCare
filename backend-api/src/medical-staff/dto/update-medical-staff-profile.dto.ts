import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalStaffProfileDto } from './create-medical-staff-profile.dto';

export class UpdateMedicalStaffProfileDto extends PartialType(CreateMedicalStaffProfileDto) { } 