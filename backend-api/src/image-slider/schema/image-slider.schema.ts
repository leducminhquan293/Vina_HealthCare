import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageSliderDocument = ImageSlider & Document;

@Schema({ timestamps: { createdAt: 'created_at' } })
export class ImageSlider {
  @Prop({ type: Buffer, required: true })
  image_data: Buffer;

  @Prop({ required: true })
  display_order: number;

  @Prop({ maxlength: 100 })
  title?: string;

  @Prop({ maxlength: 100 })
  subtitle?: string;

  @Prop({ maxlength: 100 })
  title_en?: string;

  @Prop({ maxlength: 100 })
  subtitle_en?: string;

  @Prop({ type: String, enum: ['Active', 'Inactive'], default: 'Active' })
  status: 'Active' | 'Inactive';
}

export const ImageSliderSchema = SchemaFactory.createForClass(ImageSlider);
ImageSliderSchema.index({ display_order: 1 }, { name: 'idx_image_slider_order' }); 