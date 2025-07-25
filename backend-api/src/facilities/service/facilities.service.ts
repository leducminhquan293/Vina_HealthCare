import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Facilities, FacilitiesDocument } from '../schema/facilities.schema';
import { CreateFacilitiesDto } from '../dto/create-facilities.dto';
import { UpdateFacilitiesDto } from '../dto/update-facilities.dto';

@Injectable()
export class FacilitiesService {
  constructor(@InjectModel(Facilities.name) private model: Model<FacilitiesDocument>) {}

  async create(createDto: CreateFacilitiesDto): Promise<Facilities> {
    return new this.model(createDto).save();
  }

  async findAll(): Promise<Facilities[]> {
    return this.model.find().sort({ created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<Facilities | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateFacilitiesDto): Promise<Facilities | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
} 