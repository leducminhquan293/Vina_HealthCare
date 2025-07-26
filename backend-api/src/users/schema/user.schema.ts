import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type UserDocument = User & Document;

export enum Gender {
    MALE = 'Male',
    FEMALE = 'Female',
    OTHER = 'Other'
}

export enum UserType {
    NORMAL = 'normal',
    VIP = 'vip'
}

export enum Role {
    PATIENT = 'Patient',
    DOCTOR = 'Doctor',
    NURSE = 'Nurse'
}

@Schema({ timestamps: true })
export class User {
    @Prop({ unique: true })
    user_id: number;

    @Prop({ required: true, maxlength: 100 })
    full_name: string;

    @Prop({ type: Date })
    date_of_birth: Date;

    @Prop({ enum: Gender })
    gender: Gender;

    @Prop({ maxlength: 20 })
    phone: string;

    @Prop({ maxlength: 100 })
    email: string;

    @Prop({ maxlength: 255 })
    address: string;

    @Prop({ required: true })
    avatar: string; // mediumblob equivalent in MongoDB

    @Prop({ enum: UserType, default: UserType.NORMAL })
    type: UserType;

    @Prop({ required: true, enum: Role })
    role: Role;

    @Prop({ default: Date.now })
    created_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Tạo index cho email
UserSchema.index({ email: 1 }, { name: 'idx_user_email' });

// Auto-increment user_id
UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        const UserModel = this.constructor as Model<UserDocument>;
        const lastUser = await UserModel.findOne({}, {}, { sort: { 'user_id': -1 } });
        this.user_id = lastUser ? lastUser.user_id + 1 : 1;
    }
    next();
}); 
