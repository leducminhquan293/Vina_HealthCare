import { Document, Model } from 'mongoose';
export type UserDocument = User & Document;
export declare enum Gender {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}
export declare enum UserType {
    NORMAL = "normal",
    VIP = "vip"
}
export declare enum Role {
    PATIENT = "Patient",
    DOCTOR = "Doctor",
    NURSE = "Nurse"
}
export declare class User {
    user_id: number;
    full_name: string;
    date_of_birth: Date;
    gender: Gender;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    type: UserType;
    role: Role;
    created_at: Date;
}
export declare const UserSchema: import("mongoose").Schema<User, Model<User, any, any, any, Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
