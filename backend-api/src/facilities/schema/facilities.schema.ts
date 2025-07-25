import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FacilitiesDocument = Facilities & Document;

export enum FacilityType {
  Primary = 'Primary',
  Branch = 'Branch',
  Partner = 'Partner',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class Facilities {
  @Prop({ type: String, maxlength: 100, required: true })
  name: string;

  @Prop({ type: String, maxlength: 100, required: true })
  name_en: string;

  @Prop({ type: String, maxlength: 100 })
  email: string;

  @Prop({ type: String, maxlength: 255 })
  phone_numbers: string;

  @Prop({ type: String, maxlength: 50 })
  business_license_number: string;

  @Prop({ type: String, maxlength: 50 })
  medical_license_number: string;

  @Prop({ type: String, enum: FacilityType, default: FacilityType.Branch })
  primary: FacilityType;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Date, default: Date.now, index: 'idx_facility_id' })
  created_at: Date;
}

export const FacilitiesSchema = SchemaFactory.createForClass(Facilities); 