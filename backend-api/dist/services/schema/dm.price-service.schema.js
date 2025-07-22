"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DMPriceServiceSchema = exports.DMPriceService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DMPriceService = class DMPriceService {
    service_id;
    description;
    description_en;
    price;
    is_popular;
};
exports.DMPriceService = DMPriceService;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DMPriceService.prototype, "service_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DMPriceService.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DMPriceService.prototype, "description_en", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DMPriceService.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], DMPriceService.prototype, "is_popular", void 0);
exports.DMPriceService = DMPriceService = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DMPriceService);
exports.DMPriceServiceSchema = mongoose_1.SchemaFactory.createForClass(DMPriceService);
//# sourceMappingURL=dm.price-service.schema.js.map