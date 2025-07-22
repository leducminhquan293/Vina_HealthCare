import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';
import { DMServiceService } from '../service/dm.service.service';
export declare class DMServiceController {
    private readonly serviceService;
    constructor(serviceService: DMServiceService);
    create(createServiceDto: CreateDMServiceDTO): Promise<import("../schema/dm.service.schema").DMService>;
    findAll(): Promise<import("../schema/dm.service.schema").DMService[]>;
    findByCategory(category: string): Promise<import("../schema/dm.service.schema").DMService[]>;
    findOne(id: string): Promise<import("../schema/dm.service.schema").DMService | null>;
    update(id: string, updateServiceDto: CreateDMServiceDTO): Promise<import("../schema/dm.service.schema").DMService | null>;
    remove(id: string): Promise<void>;
}
