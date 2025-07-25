import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateHomepageSectionsDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsNumber()
  display_order?: number;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  icon_name?: string;

  @IsOptional()
  @IsString()
  background_color?: string;
} 