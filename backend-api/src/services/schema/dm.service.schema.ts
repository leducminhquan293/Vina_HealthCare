import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMServiceDocument = DMService & Document;

@Schema({ timestamps: true })
export class DMService {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string;

}

export const DMServiceSchema = SchemaFactory.createForClass(DMService);