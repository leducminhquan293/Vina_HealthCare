import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateDMPriceServiceDTO } from '../dto/create-dm-price-service.dto';
import { DMPriceServiceService } from '../service/dm.price-service.service';

@Controller('dm-price-services')
export class DMPriceServiceController {
  constructor(private readonly serviceService: DMPriceServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateDMPriceServiceDTO) {
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
  async update(@Param('id') id: string, @Body() updateServiceDto: CreateDMPriceServiceDTO) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}