import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';
import { DMServiceService } from '../service/dm.service.service';

@Controller('dm-services')
export class DMServiceController {
  constructor(private readonly serviceService: DMServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateDMServiceDTO) {
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
  async update(@Param('id') id: string, @Body() updateServiceDto: CreateDMServiceDTO) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}