import { IsString, IsEmail, IsInt, Min, IsEnum, IsArray, IsIn } from 'class-validator';
import { Role } from '../schema/user.schema';

export class SignUpDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsInt()
    @Min(1)
    age: number;

    @IsArray({ message: 'Role phải là một mảng' })
    @IsIn(['admin', 'staff', 'user'], { each: true, message: 'Mỗi role phải là admin, staff hoặc user' })
    roles: string[];
}