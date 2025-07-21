import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DMFeatureService, DMFeatureServiceDocument } from '../schema/dm.feature-service.schema';
import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';
import { CreateDMFeatureServiceDTO } from '../dto/create-dm-feature-service.dto';

@Injectable()
export class DMFeatureServiceService {
  constructor(@InjectModel(DMFeatureService.name) private serviceModel: Model<DMFeatureServiceDocument>) { }

  async create(createDMServiceDTO: CreateDMFeatureServiceDTO): Promise<DMFeatureService> {
    const createdService = new this.serviceModel(createDMServiceDTO);
    return createdService.save();
  }

  async findAll(category?: string): Promise<DMFeatureService[]> {
    if (category) {
      return this.serviceModel.find({ category }).exec();
    }
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<DMFeatureService | null> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, createDMServiceDTO: CreateDMFeatureServiceDTO): Promise<DMFeatureService | null> {
    return this.serviceModel.findByIdAndUpdate(id, createDMServiceDTO, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id).exec();
  }
}