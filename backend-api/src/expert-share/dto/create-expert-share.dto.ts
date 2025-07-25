import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateExpertShareDto {
  @IsOptional()
  @IsString()
  image_data?: string; // base64 hoặc url

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  department_en: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
} 