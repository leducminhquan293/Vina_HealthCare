import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrustedMedicalBrand, TrustedMedicalBrandDocument } from '../schema/trusted-medical.schema';
import { CreateTrustedMedicalDto } from '../dto/create-trusted-medical.dto';
import { UpdateTrustedMedicalDto } from '../dto/update-trusted-medical.dto';

@Injectable()
export class TrustedMedicalService {
  constructor(@InjectModel(TrustedMedicalBrand.name) private model: Model<TrustedMedicalBrandDocument>) {}

  async create(createDto: CreateTrustedMedicalDto): Promise<any> {
    const data = { ...createDto };
    if (data.logo_data && typeof data.logo_data === 'string') {
      const base64 = data.logo_data.startsWith('data:') ? data.logo_data.split(',')[1] : data.logo_data;
      data.logo_data = Buffer.from(base64, 'base64');
    }
    const created = new this.model(data);
    const saved = await created.save();
    return this.toClient(saved);
  }

  async findAll(): Promise<any[]> {
    const docs = await this.model.find().sort({ display_order: 1, created_at: -1 }).exec();
    return docs.map(this.toClient);
  }

  async findOne(id: string): Promise<any> {
    const doc = await this.model.findById(id).exec();
    return doc ? this.toClient(doc) : null;
  }

  async update(id: string, updateDto: UpdateTrustedMedicalDto): Promise<any> {
    const data = { ...updateDto };
    if (data.logo_data && typeof data.logo_data === 'string') {
      const base64 = data.logo_data.startsWith('data:') ? data.logo_data.split(',')[1] : data.logo_data;
      data.logo_data = Buffer.from(base64, 'base64');
    }
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    return updated ? this.toClient(updated) : null;
  }

  async remove(id: string): Promise<any> {
    return this.model.findByIdAndDelete(id).exec();
  }

  private toClient(doc: TrustedMedicalBrandDocument) {
    const obj = doc.toObject();
    if (obj.logo_data && Buffer.isBuffer(obj.logo_data)) {
      obj.logo_data = 'data:image/jpeg;base64,' + obj.logo_data.toString('base64');
    }
    return obj;
  }
} 