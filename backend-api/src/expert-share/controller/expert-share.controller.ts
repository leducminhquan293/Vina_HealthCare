import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExpertShareService } from '../service/expert-share.service';
import { CreateExpertShareDto } from '../dto/create-expert-share.dto';
import { UpdateExpertShareDto } from '../dto/update-expert-share.dto';
import type { File as MulterFile } from 'multer';

@Controller('expert-shares')
export class ExpertShareController {
  constructor(private readonly expertShareService: ExpertShareService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_data'))
  async create(@Body() createDto: CreateExpertShareDto, @UploadedFile() file: MulterFile) {
    if (file) {
      createDto.image_data = file.buffer;
    }
    return this.expertShareService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.expertShareService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.expertShareService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image_data'))
  async update(@Param('id') id: string, @Body() updateDto: UpdateExpertShareDto, @UploadedFile() file: MulterFile) {
    if (file) {
      updateDto.image_data = file.buffer;
    }
    return this.expertShareService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.expertShareService.remove(id);
  }
} 