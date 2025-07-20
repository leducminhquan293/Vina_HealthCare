import { IsString } from 'class-validator';

export class CreateMedicalStaffProfileTranslationDto {
  @IsString()
  specialization: string;

  @IsString()
  language: string; // 'vi', 'en', ...
} 