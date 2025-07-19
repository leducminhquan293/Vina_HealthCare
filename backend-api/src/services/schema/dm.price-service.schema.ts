import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DMPriceServiceDocument = DMPriceService & Document;

@Schema({ timestamps: true })
export class DMPriceService {

  @Prop({ required: true })
  service_id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Boolean, default: false })
  is_popular: boolean;

}

export const DMPriceServiceSchema = SchemaFactory.createForClass(DMPriceService);