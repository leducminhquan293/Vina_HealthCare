import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum Role {
    PATIENT = 'Patient',
    DOCTOR = 'Doctor',
    NURSE = 'Nurse'
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, maxlength: 100 })
    full_name: string;

    @Prop({ type: Date })
    date_of_birth: Date;

    @Prop({ enum: Gender })
    gender: Gender;

    @Prop({ maxlength: 20 })
    phone: string;

    @Prop({ maxlength: 100, unique: true })
    email: string;

    @Prop({ maxlength: 255 })
    address: string;

    @Prop({ required: true, enum: Role })
    role: Role;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Tạo index cho email
UserSchema.index({ email: 1 }, { name: 'idx_user_email' }); 