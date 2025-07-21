import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DMService, DMServiceDocument } from '../schema/dm.service.schema';
import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';


@Injectable()
export class DMServiceService {
  constructor(@InjectModel(DMService.name) private serviceModel: Model<DMServiceDocument>) { }

  async create(createDMServiceDTO: CreateDMServiceDTO): Promise<DMService> {
    const createdService = new this.serviceModel(createDMServiceDTO);
    return createdService.save();
  }

  async findAll(category?: string): Promise<DMService[]> {
    if (category) {
      return this.serviceModel.find({ category }).exec();
    }
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<DMService | null> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, createDMServiceDTO: CreateDMServiceDTO): Promise<DMService | null> {
    return this.serviceModel.findByIdAndUpdate(id, createDMServiceDTO, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id).exec();
  }
}