import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { FacilitiesService } from '../service/facilities.service';
import { CreateFacilitiesDto } from '../dto/create-facilities.dto';
import { UpdateFacilitiesDto } from '../dto/update-facilities.dto';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  async create(@Body() createDto: CreateFacilitiesDto) {
    return this.facilitiesService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.facilitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateFacilitiesDto) {
    return this.facilitiesService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.facilitiesService.remove(id);
  }
} 