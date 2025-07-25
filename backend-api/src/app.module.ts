import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { LoggerModule } from './logger/logger.module';
import { ServicesModule } from './services/services.module';
import { NewsModule } from './news/news.module';
import { FAQModule } from './faq/faq.module';
import { ImageSliderModule } from './image-slider/image-slider.module';
import { ExpertShareModule } from './expert-share/expert-share.module';
import { TrustedMedicalModule } from './trusted-medical/trusted-medical.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { HomepageSectionsModule } from './homepage-sections/homepage-sections.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Vina'),
    // MongooseModule.forRoot('mongodb://10.170.215.79:80/Vina'),
    // MongooseModule.forRoot('mongodb+srv://leducminhquan293:leducminhquan293@vinahealthcare.d29qums.mongodb.net/'),
    // MongooseModule.forRoot('mongodb+srv://buithanhbinh0511:AShNvqlMPhhy3sxr@cluster0.nwywlfb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule,
    AuthModule,
    // LoggerModule,
    ServicesModule,
    NewsModule,
    FAQModule,
    ImageSliderModule,
    ExpertShareModule,
    TrustedMedicalModule,
    FacilitiesModule,
    HomepageSectionsModule,
    ContactMessagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
