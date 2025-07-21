import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../schema/service.schema';

@Injectable()
export class ServicesService {

  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) { }

  async create(createServiceDto: any): Promise<ServiceDocument> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll() {
    return this.serviceModel.find().exec();
  }
}
