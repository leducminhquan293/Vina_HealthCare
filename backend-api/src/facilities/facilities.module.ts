import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Facilities, FacilitiesSchema } from './schema/facilities.schema';
import { FacilitiesService } from './service/facilities.service';
import { FacilitiesController } from './controller/facilities.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Facilities.name, schema: FacilitiesSchema }])],
  providers: [FacilitiesService],
  controllers: [FacilitiesController],
})
export class FacilitiesModule {} 