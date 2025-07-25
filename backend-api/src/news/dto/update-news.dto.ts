import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { NewsStatus } from '../schema/news.schema';

export class UpdateNewsDto {
  image?: any; // Buffer hoặc file upload

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  title_en?: string;

  @IsOptional()
  @IsString()
  content_en?: string;

  @IsOptional()
  @IsString()
  posted_by?: string;

  @IsOptional()
  @IsDateString()
  publish_date?: Date;

  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;
} 