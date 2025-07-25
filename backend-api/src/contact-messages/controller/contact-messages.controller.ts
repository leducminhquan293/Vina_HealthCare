import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ContactMessagesService } from '../service/contact-messages.service';
import { CreateContactMessagesDto } from '../dto/create-contact-messages.dto';
import { UpdateContactMessagesDto } from '../dto/update-contact-messages.dto';

@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private readonly contactMessagesService: ContactMessagesService) {}

  @Post()
  async create(@Body() createDto: CreateContactMessagesDto) {
    return this.contactMessagesService.create(createDto);
  }

  @Get()
  async findAll() {
    return this.contactMessagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactMessagesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateContactMessagesDto) {
    return this.contactMessagesService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactMessagesService.remove(id);
  }
} 