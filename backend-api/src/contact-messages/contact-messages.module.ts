import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactMessages, ContactMessagesSchema } from './schema/contact-messages.schema';
import { ContactMessagesService } from './service/contact-messages.service';
import { ContactMessagesController } from './controller/contact-messages.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: ContactMessages.name, schema: ContactMessagesSchema }])],
  providers: [ContactMessagesService],
  controllers: [ContactMessagesController],
})
export class ContactMessagesModule {} 