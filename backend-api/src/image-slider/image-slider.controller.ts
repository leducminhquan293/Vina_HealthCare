import { Controller, Get, Post, Body, Param, Put, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageSliderService } from './image-slider.service';
import { CreateImageSliderDto } from './dto/create-image-slider.dto';
import { UpdateImageSliderDto } from './dto/update-image-slider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File as MulterFile } from 'multer';

@Controller('image-slider')
export class ImageSliderController {
  constructor(private readonly sliderService: ImageSliderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_data'))
  create(@UploadedFile() file: MulterFile, @Body() body: any) {
    const createDto: CreateImageSliderDto = {
      ...body,
      image_data: file?.buffer,
      display_order: Number(body.display_order),
    };
    return this.sliderService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sliderService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image_data'))
  update(@Param('id') id: string, @UploadedFile() file: MulterFile, @Body() body: any) {
    const updateDto: UpdateImageSliderDto = {
      ...body,
      ...(file && { image_data: file.buffer }),
      display_order: Number(body.display_order),
    };
    return this.sliderService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sliderService.remove(id);
  }
} 