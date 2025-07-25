import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExpertShare, ExpertShareDocument } from '../schema/expert-share.schema';
import { CreateExpertShareDto } from '../dto/create-expert-share.dto';
import { UpdateExpertShareDto } from '../dto/update-expert-share.dto';

@Injectable()
export class ExpertShareService {
  constructor(@InjectModel(ExpertShare.name) private expertShareModel: Model<ExpertShareDocument>) { } 

  async create(createDto: CreateExpertShareDto): Promise<ExpertShare> {
    return new this.expertShareModel(createDto).save();
  }

  async findAll(): Promise<ExpertShare[]> {
    return this.expertShareModel.find().sort({ display_order: 1 }).exec();
  }

  async findOne(id: string): Promise<ExpertShare | null> {
    return this.expertShareModel.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateExpertShareDto): Promise<ExpertShare | null> {
    return this.expertShareModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.expertShareModel.findByIdAndDelete(id).exec();
  }
} 