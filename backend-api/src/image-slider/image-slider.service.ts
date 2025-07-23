import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageSlider, ImageSliderDocument } from './schema/image-slider.schema';
import { CreateImageSliderDto } from './dto/create-image-slider.dto';
import { UpdateImageSliderDto } from './dto/update-image-slider.dto';

@Injectable()
export class ImageSliderService {
  constructor(@InjectModel(ImageSlider.name) private sliderModel: Model<ImageSliderDocument>) {}

  async create(createDto: CreateImageSliderDto): Promise<ImageSlider> {
    return new this.sliderModel(createDto).save();
  }

  async findAll(): Promise<ImageSlider[]> {
    return this.sliderModel.find().sort({ display_order: 1 }).exec();
  }

  async findOne(id: string): Promise<ImageSlider | null> {
    return this.sliderModel.findById(id).exec();
  }

  async update(id: string, updateDto: UpdateImageSliderDto): Promise<ImageSlider | null> {
    return this.sliderModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.sliderModel.findByIdAndDelete(id).exec();
  }
} 