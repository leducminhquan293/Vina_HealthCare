import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactMessagesDocument = ContactMessages & Document;

export enum ContactMessageStatus {
  New = 'New',
  Processed = 'Processed',
  Replied = 'Replied',
}

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: false } })
export class ContactMessages {
  @Prop({ type: String, maxlength: 100, required: true })
  full_name: string;

  @Prop({ type: String, maxlength: 100 })
  email: string;

  @Prop({ type: String, maxlength: 20 })
  phone: string;

  @Prop({ type: String, required: true })
  message: string;

  @Prop({ type: Date, default: Date.now, index: 'idx_contact_messages_email' })
  created_at: Date;

  @Prop({ type: String, enum: ContactMessageStatus, default: ContactMessageStatus.New })
  status: ContactMessageStatus;
}

export const ContactMessagesSchema = SchemaFactory.createForClass(ContactMessages); 