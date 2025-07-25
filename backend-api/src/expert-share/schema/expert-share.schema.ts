import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpertShareDocument = ExpertShare & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class ExpertShare {
  // _id sẽ được MongoDB tự động tạo

  @Prop({ type: Buffer })
  image_data: Buffer;

  @Prop({ type: String, maxlength: 100, required: true })
  full_name: string;

  @Prop({ type: String, maxlength: 255, required: true })
  description: string;

  @Prop({ type: String, maxlength: 100, required: true })
  department: string;

  @Prop({ type: String, maxlength: 255, required: true })
  description_en: string;

  @Prop({ type: String, maxlength: 100, required: true })
  department_en: string;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Date, default: Date.now, index: 'idx_expert_id' })
  created_at: Date;
}

export const ExpertShareSchema = SchemaFactory.createForClass(ExpertShare); 