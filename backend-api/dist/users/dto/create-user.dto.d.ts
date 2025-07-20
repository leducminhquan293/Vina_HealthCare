import { Gender, Role } from '../schema/user.schema';
export declare class CreateUserDto {
    full_name: string;
    date_of_birth?: string;
    gender?: Gender;
    phone?: string;
    email: string;
    address?: string;
    role: Role;
}
