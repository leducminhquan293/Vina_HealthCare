import { IsString, IsEmail, IsOptional, IsEnum, IsDateString, MaxLength, IsNotEmpty } from 'class-validator';
import { Gender } from '../schema/user.schema';

export enum UserType {
    NORMAL = 'normal',
    VIP = 'vip'
}

export enum Role {
    PATIENT = 'Patient',
    DOCTOR = 'Doctor',
    NURSE = 'Nurse'
}

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
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

    @IsOptional()
    @IsEmail()
    @MaxLength(100)
    email?: string;

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

    @IsEnum(Role)
    role: Role;
} 