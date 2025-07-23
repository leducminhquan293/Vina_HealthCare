import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMFeatureServiceDocument = DMFeatureService & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DMFeatureService {

  @Prop({ required: true })
  price_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;  

  @Prop({ required: true })
  name_en: string;

  @Prop({ required: true })
  description_en: string;  

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

}

export const DMFeatureServiceSchema = SchemaFactory.createForClass(DMFeatureService);