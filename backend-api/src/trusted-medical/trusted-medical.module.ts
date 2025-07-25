import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrustedMedicalBrand, TrustedMedicalBrandSchema } from './schema/trusted-medical.schema';
import { TrustedMedicalService } from './service/trusted-medical.service';
import { TrustedMedicalController } from './controller/trusted-medical.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: TrustedMedicalBrand.name, schema: TrustedMedicalBrandSchema }])],
  providers: [TrustedMedicalService],
  controllers: [TrustedMedicalController],
})
export class TrustedMedicalModule {} 