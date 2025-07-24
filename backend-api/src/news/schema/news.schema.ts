import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type NewsDocument = News & Document;

export enum NewsStatus {
  Draft = 'Draft',
  Published = 'Published',
  Hidden = 'Hidden',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class News {
  // Đã loại bỏ news_id, chỉ dùng _id mặc định

  @Prop({ type: Buffer, required: false })
  image?: Buffer;

  @Prop({ type: String, maxlength: 255 })
  image_url: string;

  @Prop({ type: String, maxlength: 255, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: String, maxlength: 255, required: true })
  title_en: string;

  @Prop({ type: String, required: true })
  content_en: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  posted_by: Types.ObjectId;

  @Prop({ type: Date })
  publish_date: Date;

  @Prop({ type: String, enum: NewsStatus, default: NewsStatus.Draft })
  status: NewsStatus;

  @Prop({ type: Date, default: Date.now, index: 'idx_news_created_at' })
  created_at: Date;

  @Prop({ type: Date })
  updated_at: Date;
}

export const NewsSchema = SchemaFactory.createForClass(News); 