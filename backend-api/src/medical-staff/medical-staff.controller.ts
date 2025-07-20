import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MedicalStaffService } from './medical-staff.service';
import { CreateMedicalStaffProfileDto } from './dto/create-medical-staff-profile.dto';
import { UpdateMedicalStaffProfileDto } from './dto/update-medical-staff-profile.dto';
import { CreateMedicalStaffProfileTranslationDto } from './dto/create-medical-staff-profile-translation.dto';
import { UpdateMedicalStaffProfileTranslationDto } from './dto/update-medical-staff-profile-translation.dto';

@Controller('medical-staff-profiles')
export class MedicalStaffController {
    constructor(private readonly service: MedicalStaffService) { }

    @Post()
    async create(@Body() dto: CreateMedicalStaffProfileDto) {
        return this.service.createProfile(dto);
    }

    @Get()
    async findAll() {
        return this.service.findAllProfiles();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.service.findProfileById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateMedicalStaffProfileDto) {
        return this.service.updateProfile(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.service.deleteProfile(id);
    }

    // Translation endpoints (optional)
    @Post(':id/translations')
    async addTranslation(@Param('id') id: string, @Body() dto: CreateMedicalStaffProfileTranslationDto) {
        return this.service.addTranslation(id, dto);
    }

    @Put('translations/:translationId')
    async updateTranslation(@Param('translationId') translationId: string, @Body() dto: UpdateMedicalStaffProfileTranslationDto) {
        return this.service.updateTranslation(translationId, dto);
    }

    @Delete('translations/:translationId')
    async deleteTranslation(@Param('translationId') translationId: string) {
        return this.service.deleteTranslation(translationId);
    }
} 