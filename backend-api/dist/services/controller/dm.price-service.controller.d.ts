import { CreateDMPriceServiceDTO } from '../dto/create-dm-price-service.dto';
import { DMPriceServiceService } from '../service/dm.price-service.service';
export declare class DMPriceServiceController {
    private readonly serviceService;
    constructor(serviceService: DMPriceServiceService);
    create(createServiceDto: CreateDMPriceServiceDTO): Promise<import("../schema/dm.price-service.schema").DMPriceService>;
    findAll(): Promise<import("../schema/dm.price-service.schema").DMPriceService[]>;
    findByCategory(category: string): Promise<import("../schema/dm.price-service.schema").DMPriceService[]>;
    findOne(id: string): Promise<import("../schema/dm.price-service.schema").DMPriceService | null>;
    update(id: string, updateServiceDto: CreateDMPriceServiceDTO): Promise<import("../schema/dm.price-service.schema").DMPriceService | null>;
    remove(id: string): Promise<void>;
}
