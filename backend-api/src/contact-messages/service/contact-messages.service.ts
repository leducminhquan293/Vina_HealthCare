import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessages, ContactMessagesDocument } from '../schema/contact-messages.schema';
import { CreateContactMessagesDto } from '../dto/create-contact-messages.dto';
import { UpdateContactMessagesDto } from '../dto/update-contact-messages.dto';

@Injectable()
export class ContactMessagesService {
  constructor(@InjectModel(ContactMessages.name) private model: Model<ContactMessagesDocument>) {}

  async create(createDto: CreateContactMessagesDto): Promise<ContactMessages> {
    return new this.model(createDto).save();
  }

  async findAll(): Promise<ContactMessages[]> {
    return this.model.find().sort({ created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<ContactMessages | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateContactMessagesDto): Promise<ContactMessages | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
} 