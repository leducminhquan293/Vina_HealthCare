import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ContactMessageStatus } from '../schema/contact-messages.schema';

export class UpdateContactMessagesDto {
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsEnum(ContactMessageStatus)
  status?: ContactMessageStatus;
} 