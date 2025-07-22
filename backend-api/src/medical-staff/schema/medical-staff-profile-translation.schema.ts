import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MedicalStaffProfileTranslationDocument = MedicalStaffProfileTranslation & Document;

@Schema()
export class MedicalStaffProfileTranslation {
    @Prop({ type: Types.ObjectId, ref: 'MedicalStaffProfile', required: true })
    profile_id: Types.ObjectId;

    @Prop({ required: true })
    specialization: string;

    @Prop({ required: true })
    language: string; // 'vi', 'en', ...
}

export const MedicalStaffProfileTranslationSchema = SchemaFactory.createForClass(MedicalStaffProfileTranslation); 