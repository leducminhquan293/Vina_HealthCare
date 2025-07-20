"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const services_controller_1 = require("./controller/services.controller");
const mongoose_1 = require("@nestjs/mongoose");
const service_schema_1 = require("./schema/service.schema");
const dm_service_schema_1 = require("./schema/dm.service.schema");
const dm_service_controller_1 = require("./controller/dm.service.controller");
const dm_price_service_schema_1 = require("./schema/dm.price-service.schema");
const dm_feature_service_schema_1 = require("./schema/dm.feature-service.schema");
const dm_price_service_controller_1 = require("./controller/dm.price-service.controller");
const dm_feature_service_controller_1 = require("./controller/dm.feature-service.controller");
const services_service_1 = require("./service/services.service");
const dm_service_service_1 = require("./service/dm.service.service");
const dm_price_service_service_1 = require("./service/dm.price-service.service");
const dm_feature_service_service_1 = require("./service/dm.feature-service.service");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: service_schema_1.Service.name, schema: service_schema_1.ServiceSchema },
                { name: dm_service_schema_1.DMService.name, schema: dm_service_schema_1.DMServiceSchema },
                { name: dm_price_service_schema_1.DMPriceService.name, schema: dm_price_service_schema_1.DMPriceServiceSchema },
                { name: dm_feature_service_schema_1.DMFeatureService.name, schema: dm_feature_service_schema_1.DMFeatureServiceSchema }
            ])],
        providers: [services_service_1.ServicesService, dm_service_service_1.DMServiceService, dm_price_service_service_1.DMPriceServiceService, dm_feature_service_service_1.DMFeatureServiceService],
        controllers: [services_controller_1.ServicesController, dm_service_controller_1.DMServiceController, dm_price_service_controller_1.DMPriceServiceController, dm_feature_service_controller_1.DMFeatureServiceController
        ]
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map