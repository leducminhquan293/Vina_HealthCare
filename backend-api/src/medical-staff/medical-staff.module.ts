import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalStaffProfile, MedicalStaffProfileSchema } from './schema/medical-staff-profile.schema';
import { MedicalStaffProfileTranslation, MedicalStaffProfileTranslationSchema } from './schema/medical-staff-profile-translation.schema';
import { MedicalStaffService } from './medical-staff.service';
import { MedicalStaffController } from './medical-staff.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: MedicalStaffProfile.name, schema: MedicalStaffProfileSchema },
            { name: MedicalStaffProfileTranslation.name, schema: MedicalStaffProfileTranslationSchema }
        ])
    ],
    controllers: [MedicalStaffController],
    providers: [MedicalStaffService],
    exports: [MedicalStaffService]
})
export class MedicalStaffModule { } 