import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateExpertShareDto {
  @IsOptional()
  @IsString()
  image_data?: string;

  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  description_en?: string;

  @IsOptional()
  @IsString()
  department_en?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
} 