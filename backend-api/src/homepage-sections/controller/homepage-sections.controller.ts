import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { HomepageSectionsService } from '../service/homepage-sections.service';
import { CreateHomepageSectionsDto } from '../dto/create-homepage-sections.dto';
import { UpdateHomepageSectionsDto } from '../dto/update-homepage-sections.dto';

@Controller('homepage-sections')
export class HomepageSectionsController {
  constructor(private readonly homepageSectionsService: HomepageSectionsService) {}

  @Post()
  async create(@Body() createDto: CreateHomepageSectionsDto) {
    return this.homepageSectionsService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.homepageSectionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.homepageSectionsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateHomepageSectionsDto) {
    return this.homepageSectionsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.homepageSectionsService.remove(id);
  }
} 