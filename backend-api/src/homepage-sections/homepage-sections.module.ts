import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HomepageSections, HomepageSectionsSchema } from './schema/homepage-sections.schema';
import { HomepageSectionsService } from './service/homepage-sections.service';
import { HomepageSectionsController } from './controller/homepage-sections.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: HomepageSections.name, schema: HomepageSectionsSchema }])],
  providers: [HomepageSectionsService],
  controllers: [HomepageSectionsController],
})
export class HomepageSectionsModule {} 