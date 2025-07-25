import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrustedMedicalBrandDocument = TrustedMedicalBrand & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class TrustedMedicalBrand {
  // _id sẽ được MongoDB tự động tạo

  @Prop({ type: String, maxlength: 150, required: true })
  name: string;

  @Prop({ type: Buffer })
  logo_data: Buffer;

  @Prop({ type: String, maxlength: 255 })
  website_url: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, default: 0 })
  display_order: number;

  @Prop({ type: Boolean, default: true })
  is_featured: boolean;

  @Prop({ type: Date, default: Date.now, index: 'idx_brand_id' })
  created_at: Date;
}

export const TrustedMedicalBrandSchema = SchemaFactory.createForClass(TrustedMedicalBrand); 