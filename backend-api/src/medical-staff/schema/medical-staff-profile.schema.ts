import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { MedicalStaffProfileTranslation, MedicalStaffProfileTranslationSchema } from './medical-staff-profile-translation.schema';

export type MedicalStaffProfileDocument = MedicalStaffProfile & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class MedicalStaffProfile {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user_id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, enum: ['active', 'inactive'], default: 'active' })
    status: string;

    @Prop()
    experience_years: number;

    @Prop()
    license_number: string;

    @Prop()
    profile_image: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'MedicalStaffProfileTranslation' }], default: [] })
    translations: MedicalStaffProfileTranslation[];
}

export const MedicalStaffProfileSchema = SchemaFactory.createForClass(MedicalStaffProfile); 