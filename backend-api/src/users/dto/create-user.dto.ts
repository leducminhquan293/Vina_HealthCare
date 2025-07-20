import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, MaxLength } from 'class-validator';
import { Gender, Role } from '../schema/user.schema';

export class CreateUserDto {
    @IsString()
    @MaxLength(100)
    full_name: string;

    @IsOptional()
    @IsDateString()
    date_of_birth?: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone?: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @IsEnum(Role)
    role: Role;
} 