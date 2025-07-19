import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DMPriceService, DMPriceServiceDocument } from '../schema/dm.price-service.schema';
import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';
import { CreateDMPriceServiceDTO } from '../dto/create-dm-price-service.dto';

@Injectable()
export class DMPriceServiceService {
  constructor(@InjectModel(DMPriceService.name) private serviceModel: Model<DMPriceServiceDocument>) { }

  async create(createDMServiceDTO: CreateDMPriceServiceDTO): Promise<DMPriceService> {
    const createdService = new this.serviceModel(createDMServiceDTO);
    return createdService.save();
  }

  async findAll(category?: string): Promise<DMPriceService[]> {
    if (category) {
      return this.serviceModel.find({ category }).exec();
    }
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<DMPriceService | null> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, createDMServiceDTO: CreateDMPriceServiceDTO): Promise<DMPriceService | null> {
    return this.serviceModel.findByIdAndUpdate(id, createDMServiceDTO, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.serviceModel.findByIdAndDelete(id).exec();
  }
}