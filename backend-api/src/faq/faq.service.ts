import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FAQ, FAQDocument } from './schema/faq.schema';
import { CreateFAQDto } from './dto/create-faq.dto';
import { UpdateFAQDto } from './dto/update-faq.dto';

@Injectable()
export class FAQService {
  constructor(@InjectModel(FAQ.name) private faqModel: Model<FAQDocument>) {}

  async create(createFAQDto: CreateFAQDto): Promise<FAQ> {
    return new this.faqModel(createFAQDto).save();
  }

  async findAll(): Promise<FAQ[]> {
    return this.faqModel.find().sort({ created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<FAQ | null> {
    return this.faqModel.findById(id).exec();
  }

  async update(id: string, updateFAQDto: UpdateFAQDto): Promise<FAQ | null> {
    return this.faqModel.findByIdAndUpdate(id, updateFAQDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.faqModel.findByIdAndDelete(id).exec();
  }
} 