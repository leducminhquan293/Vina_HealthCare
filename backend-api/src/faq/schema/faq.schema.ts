import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FAQDocument = FAQ & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class FAQ {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop({ required: true })
  question_en: string;

  @Prop({ required: true })
  answer_en: string;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ); 