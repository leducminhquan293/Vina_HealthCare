import { Gender, UserType } from '../schema/user.schema';
import { Role } from './create-user.dto';
export declare class SignUpDto {
    name: string;
    email: string;
    password: string;
    date_of_birth?: string;
    gender?: Gender;
    phone?: string;
    address?: string;
    avatar: string;
    type?: UserType;
    role?: Role;
}
