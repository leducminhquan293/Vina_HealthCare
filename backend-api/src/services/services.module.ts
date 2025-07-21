import { Module } from '@nestjs/common';
import { ServicesController } from './controller/services.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Service, ServiceSchema } from './schema/service.schema';
import { DMService, DMServiceSchema } from './schema/dm.service.schema';
import { DMServiceController } from './controller/dm.service.controller';
import { DMPriceService, DMPriceServiceSchema } from './schema/dm.price-service.schema';
import { DMFeatureService, DMFeatureServiceSchema } from './schema/dm.feature-service.schema';
import { DMPriceServiceController } from './controller/dm.price-service.controller';
import { DMFeatureServiceController } from './controller/dm.feature-service.controller';
import { ServicesService } from './service/services.service';
import { DMServiceService } from './service/dm.service.service';
import { DMPriceServiceService } from './service/dm.price-service.service';
import { DMFeatureServiceService } from './service/dm.feature-service.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Service.name, schema: ServiceSchema },
    { name: DMService.name, schema: DMServiceSchema },
    { name: DMPriceService.name, schema: DMPriceServiceSchema },
    { name: DMFeatureService.name, schema: DMFeatureServiceSchema }
  ])],
  providers: [ServicesService, DMServiceService, DMPriceServiceService, DMFeatureServiceService],

  controllers: [ServicesController, DMServiceController, DMPriceServiceController, DMFeatureServiceController
  ]
})
export class ServicesModule { }
