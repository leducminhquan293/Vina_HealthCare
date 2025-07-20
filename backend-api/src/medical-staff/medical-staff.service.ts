import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MedicalStaffProfile, MedicalStaffProfileDocument } from './schema/medical-staff-profile.schema';
import { MedicalStaffProfileTranslation, MedicalStaffProfileTranslationDocument } from './schema/medical-staff-profile-translation.schema';
import { CreateMedicalStaffProfileDto } from './dto/create-medical-staff-profile.dto';
import { UpdateMedicalStaffProfileDto } from './dto/update-medical-staff-profile.dto';
import { CreateMedicalStaffProfileTranslationDto } from './dto/create-medical-staff-profile-translation.dto';
import { UpdateMedicalStaffProfileTranslationDto } from './dto/update-medical-staff-profile-translation.dto';

@Injectable()
export class MedicalStaffService {
    constructor(
        @InjectModel(MedicalStaffProfile.name) private profileModel: Model<MedicalStaffProfileDocument>,
        @InjectModel(MedicalStaffProfileTranslation.name) private translationModel: Model<MedicalStaffProfileTranslationDocument>
    ) { }

    async createProfile(dto: CreateMedicalStaffProfileDto) {
        // Bước 1: Tạo profile trước, chưa có translations
        const createdProfile = new this.profileModel({
            ...dto,
            translations: []
        });
        await createdProfile.save();

        // Bước 2: Nếu có translations, tạo từng translation với profile_id
        let translationIds: Types.ObjectId[] = [];
        if (dto.translations && dto.translations.length > 0) {
            const translationsWithProfileId = dto.translations.map(t => ({
                ...t,
                profile_id: createdProfile._id
            }));
            const createdTranslations = await this.translationModel.insertMany(translationsWithProfileId) as unknown as MedicalStaffProfileTranslationDocument[];
            translationIds = createdTranslations.map(t => t._id as Types.ObjectId);
            // Cập nhật lại mảng translations cho profile
            createdProfile.translations = translationIds as any;
            await createdProfile.save();
        }
        return createdProfile.populate('translations');
    }

    async findAllProfiles() {
        return this.profileModel.find().populate('translations').exec();
    }

    async findProfileById(id: string) {
        const profile = await this.profileModel.findById(id).populate('translations').exec();
        if (!profile) throw new NotFoundException('Profile not found');
        return profile;
    }

    async updateProfile(id: string, dto: UpdateMedicalStaffProfileDto) {
        // Update translations if provided
        const profile = await this.profileModel.findById(id);
        if (!profile) throw new NotFoundException('Profile not found');
        if (dto.translations) {
            // Remove old translations
            await this.translationModel.deleteMany({ _id: { $in: profile.translations } });
            // Add new translations
            const createdTranslations = await this.translationModel.insertMany(
                dto.translations.map(t => ({ ...t, profile_id: profile._id }))
            );
            dto.translations = createdTranslations.map(t => t._id) as any;
        }
        const updated = await this.profileModel.findByIdAndUpdate(id, dto, { new: true }).populate('translations').exec();
        return updated;
    }

    async deleteProfile(id: string) {
        const profile = await this.profileModel.findById(id);
        if (!profile) throw new NotFoundException('Profile not found');
        await this.translationModel.deleteMany({ _id: { $in: profile.translations } });
        return this.profileModel.findByIdAndDelete(id);
    }

    // CRUD for translations (if needed)
    async addTranslation(profileId: string, dto: CreateMedicalStaffProfileTranslationDto) {
        const translation = new this.translationModel({ ...dto, profile_id: profileId });
        await translation.save();
        await this.profileModel.findByIdAndUpdate(profileId, { $push: { translations: translation._id } });
        return translation;
    }

    async updateTranslation(id: string, dto: UpdateMedicalStaffProfileTranslationDto) {
        return this.translationModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async deleteTranslation(id: string) {
        const translation = await this.translationModel.findByIdAndDelete(id);
        if (translation) {
            await this.profileModel.updateMany({}, { $pull: { translations: translation._id } });
        }
        return translation;
    }
} 