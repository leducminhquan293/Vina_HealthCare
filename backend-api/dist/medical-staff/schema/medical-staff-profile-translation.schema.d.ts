import { Document, Types } from 'mongoose';
export type MedicalStaffProfileTranslationDocument = MedicalStaffProfileTranslation & Document;
export declare class MedicalStaffProfileTranslation {
    profile_id: Types.ObjectId;
    specialization: string;
    language: string;
}
export declare const MedicalStaffProfileTranslationSchema: import("mongoose").Schema<MedicalStaffProfileTranslation, import("mongoose").Model<MedicalStaffProfileTranslation, any, any, any, Document<unknown, any, MedicalStaffProfileTranslation, any> & MedicalStaffProfileTranslation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MedicalStaffProfileTranslation, Document<unknown, {}, import("mongoose").FlatRecord<MedicalStaffProfileTranslation>, {}> & import("mongoose").FlatRecord<MedicalStaffProfileTranslation> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
