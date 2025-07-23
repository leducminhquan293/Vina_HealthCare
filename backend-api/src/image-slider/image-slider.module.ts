import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSlider, ImageSliderSchema } from './schema/image-slider.schema';
import { ImageSliderService } from './image-slider.service';
import { ImageSliderController } from './image-slider.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ImageSlider.name, schema: ImageSliderSchema }])],
  controllers: [ImageSliderController],
  providers: [ImageSliderService],
})
export class ImageSliderModule {} 