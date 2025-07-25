import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File as MulterFile } from 'multer';
import { TrustedMedicalService } from '../service/trusted-medical.service';
import { CreateTrustedMedicalDto } from '../dto/create-trusted-medical.dto';
import { UpdateTrustedMedicalDto } from '../dto/update-trusted-medical.dto';

@Controller('trusted-medical')
export class TrustedMedicalController {
  constructor(private readonly trustedMedicalService: TrustedMedicalService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo_data'))
  async create(@Body() createDto: CreateTrustedMedicalDto, @UploadedFile() file: MulterFile) {
    if (file) {
      createDto.logo_data = file.buffer;
    }
    return this.trustedMedicalService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.trustedMedicalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trustedMedicalService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('logo_data'))
  async update(@Param('id') id: string, @Body() updateDto: UpdateTrustedMedicalDto, @UploadedFile() file: MulterFile) {
    if (file) {
      updateDto.logo_data = file.buffer;
    }
    return this.trustedMedicalService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trustedMedicalService.remove(id);
  }
} 