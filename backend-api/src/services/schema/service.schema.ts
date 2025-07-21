import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsIn } from 'class-validator';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Service {

  @Prop({ required: true, maxlength: 100 })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, maxlength: 50 })
  icon_name: string;

  @Prop({
    type: [{
      _id: false,
      price: { type: Number, required: true, precision: 10, scale: 2 },
      description: { type: String, maxlength: 255 },
      is_popular: { type: Boolean, default: false },
      features: {
        type: [{
          _id: false,
          name: { type: String, required: true, maxlength: 255 },
          description: { type: String }
        }],
      },
    }],
  })
  prices: {
    price: number;
    description?: string;
    is_popular?: boolean;
    created_at: Date;
    features: {
      name: string;
      description?: string;
    }[];
  }[];

}

export const ServiceSchema = SchemaFactory.createForClass(Service);