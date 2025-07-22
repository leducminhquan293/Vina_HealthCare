import mongoose, { Document, Types } from 'mongoose';
import { MedicalStaffProfileTranslation } from './medical-staff-profile-translation.schema';
export type MedicalStaffProfileDocument = MedicalStaffProfile & Document;
export declare class MedicalStaffProfile {
    user_id: string;
    name: string;
    email: string;
    status: string;
    experience_years: number;
    license_number: string;
    profile_image: string;
    translations: MedicalStaffProfileTranslation[];
}
export declare const MedicalStaffProfileSchema: mongoose.Schema<MedicalStaffProfile, mongoose.Model<MedicalStaffProfile, any, any, any, mongoose.Document<unknown, any, MedicalStaffProfile, any> & MedicalStaffProfile & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, MedicalStaffProfile, mongoose.Document<unknown, {}, mongoose.FlatRecord<MedicalStaffProfile>, {}> & mongoose.FlatRecord<MedicalStaffProfile> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
