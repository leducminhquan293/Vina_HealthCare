import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { NewsService } from '../service/news.service';
import { CreateNewsDto } from '../dto/create-news.dto';
import { UpdateNewsDto } from '../dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  async create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
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
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
} 