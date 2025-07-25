import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { FacilityType } from '../schema/facilities.schema';

export class UpdateFacilitiesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  name_en?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone_numbers?: string;

  @IsOptional()
  @IsString()
  business_license_number?: string;

  @IsOptional()
  @IsString()
  medical_license_number?: string;

  @IsOptional()
  @IsEnum(FacilityType)
  primary?: FacilityType;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
} 