import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ContactMessageStatus } from '../schema/contact-messages.schema';

export class CreateContactMessagesDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsOptional()
  @IsEnum(ContactMessageStatus)
  status?: ContactMessageStatus;
} 