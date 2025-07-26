import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { Role } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
  // Tất cả fields từ CreateUserDto đều optional trong UpdateUserDto
  // user_id sẽ được lấy từ URL parameter
} 
