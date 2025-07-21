import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateDMFeatureServiceDTO } from '../dto/create-dm-feature-service.dto';
import { DMFeatureServiceService } from '../service/dm.feature-service.service';

@Controller('dm-feature-services')
export class DMFeatureServiceController {
  constructor(private readonly serviceService: DMFeatureServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateDMFeatureServiceDTO) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll() {
    return this.serviceService.findAll();
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string) {
    return this.serviceService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: CreateDMFeatureServiceDTO) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}