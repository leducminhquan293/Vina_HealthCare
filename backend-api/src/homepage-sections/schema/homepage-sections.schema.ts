import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HomepageSectionsDocument = HomepageSections & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class HomepageSections {
  @Prop({ type: String, maxlength: 100, required: true })
  name: string;

  @Prop({ type: String, maxlength: 100, required: true, unique: true })
  slug: string;

  @Prop({ type: Boolean, default: true })
  is_active: boolean;

  @Prop({ type: Number, default: 0 })
  display_order: number;

  @Prop({ type: String, maxlength: 255 })
  subtitle: string;

  @Prop({ type: String, maxlength: 100 })
  icon_name: string;

  @Prop({ type: String, maxlength: 20 })
  background_color: string;

  @Prop({ type: Date, default: Date.now, index: 'idx_homepage_section_id' })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const HomepageSectionsSchema = SchemaFactory.createForClass(HomepageSections); 