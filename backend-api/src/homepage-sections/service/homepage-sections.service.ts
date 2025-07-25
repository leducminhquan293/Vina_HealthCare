import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HomepageSections, HomepageSectionsDocument } from '../schema/homepage-sections.schema';
import { CreateHomepageSectionsDto } from '../dto/create-homepage-sections.dto';
import { UpdateHomepageSectionsDto } from '../dto/update-homepage-sections.dto';

@Injectable()
export class HomepageSectionsService {
  constructor(@InjectModel(HomepageSections.name) private model: Model<HomepageSectionsDocument>) {}

  async create(createDto: CreateHomepageSectionsDto): Promise<HomepageSections> {
    return new this.model(createDto).save();
  }

  async findAll(): Promise<HomepageSections[]> {
    return this.model.find().sort({ display_order: 1, created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<HomepageSections | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateHomepageSectionsDto): Promise<HomepageSections | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
} 