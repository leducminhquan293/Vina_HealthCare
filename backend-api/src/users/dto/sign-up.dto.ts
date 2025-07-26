import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, MaxLength, IsNotEmpty } from 'class-validator';
import { Gender, UserType } from '../schema/user.schema';
import { Role } from './create-user.dto';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

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

    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @IsString()
    @IsNotEmpty()
    avatar: string;

    @IsOptional()
    @IsEnum(UserType)
    type?: UserType;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
} 
