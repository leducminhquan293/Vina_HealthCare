import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMFeatureServiceDocument = DMFeatureService & Document;

@Schema({ timestamps: true })
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

}

export const DMFeatureServiceSchema = SchemaFactory.createForClass(DMFeatureService);