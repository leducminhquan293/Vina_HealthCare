import { Controller, Post, Get, Put, Delete, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NewsService } from '../service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { File as MulterFile } from 'multer';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() file: MulterFile, @Body() createNewsDto: any) {
    const dto = { ...createNewsDto, image: file?.buffer };
    return this.newsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(@Param('id') id: string, @UploadedFile() file: MulterFile, @Body() updateNewsDto: any) {
    const dto = { ...updateNewsDto, ...(file && { image: file.buffer }) };
    return this.newsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
} 