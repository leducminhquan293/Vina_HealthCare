import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpertShare, ExpertShareSchema } from './schema/expert-share.schema';
import { ExpertShareService } from './service/expert-share.service';
import { ExpertShareController } from './controller/expert-share.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ExpertShare.name, schema: ExpertShareSchema }])],
  providers: [ExpertShareService],
  controllers: [ExpertShareController],
})
export class ExpertShareModule {} 