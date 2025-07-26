import { Gender } from '../schema/user.schema';
export declare enum UserType {
    NORMAL = "normal",
    VIP = "vip"
}
export declare enum Role {
    PATIENT = "Patient",
    DOCTOR = "Doctor",
    NURSE = "Nurse"
}
export declare class CreateUserDto {
    full_name: string;
    date_of_birth?: string;
    gender?: Gender;
    phone?: string;
    email?: string;
    address?: string;
    avatar: string;
    type?: UserType;
    role: Role;
}
