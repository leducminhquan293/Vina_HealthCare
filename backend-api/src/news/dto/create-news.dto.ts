import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { NewsStatus } from '../schema/news.schema';

export class CreateNewsDto {
  @IsOptional()
  @IsString()
  image_url?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title_en: string;

  @IsString()
  @IsNotEmpty()
  content_en: string;

  @IsString()
  @IsNotEmpty()
  posted_by: string;

  @IsOptional()
  @IsDateString()
  publish_date?: Date;

  @IsOptional()
  @IsEnum(NewsStatus)
  status?: NewsStatus;
} 