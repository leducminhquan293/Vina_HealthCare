import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQ, FAQSchema } from './schema/faq.schema';
import { FAQService } from './faq.service';
import { FAQController } from './faq.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: FAQ.name, schema: FAQSchema }])],
  controllers: [FAQController],
  providers: [FAQService],
})
export class FAQModule {} 