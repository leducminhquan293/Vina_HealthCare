import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMServiceDocument = DMService & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class DMService {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  name_en: string;

  @Prop({ required: true })
  description_en: string;

  @Prop({ required: true })
  is_active: boolean;

}

export const DMServiceSchema = SchemaFactory.createForClass(DMService);