import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FAQService } from './faq.service';
import { CreateFAQDto } from './dto/create-faq.dto';
import { UpdateFAQDto } from './dto/update-faq.dto';

@Controller('faqs')
export class FAQController {
  constructor(private readonly faqService: FAQService) {}

  @Post()
  create(@Body() createFAQDto: CreateFAQDto) {
    return this.faqService.create(createFAQDto);
  }

  @Get()
  findAll() {
    return this.faqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFAQDto: UpdateFAQDto) {
    return this.faqService.update(id, updateFAQDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }
} 