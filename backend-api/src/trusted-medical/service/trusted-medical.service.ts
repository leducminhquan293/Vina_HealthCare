import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrustedMedicalBrand, TrustedMedicalBrandDocument } from '../schema/trusted-medical.schema';
import { CreateTrustedMedicalDto } from '../dto/create-trusted-medical.dto';
import { UpdateTrustedMedicalDto } from '../dto/update-trusted-medical.dto';

@Injectable()
export class TrustedMedicalService {
  constructor(@InjectModel(TrustedMedicalBrand.name) private model: Model<TrustedMedicalBrandDocument>) { }

  async create(createDto: CreateTrustedMedicalDto): Promise<TrustedMedicalBrand> {
    return new this.model(createDto).save();
  }

  async findAll(): Promise<TrustedMedicalBrand[]> {
    return this.model.find().sort({ display_order: 1 }).exec();
  }

  async findOne(id: string): Promise<TrustedMedicalBrand | null> {
    return this.model.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateTrustedMedicalDto): Promise<TrustedMedicalBrand | null> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }
} 