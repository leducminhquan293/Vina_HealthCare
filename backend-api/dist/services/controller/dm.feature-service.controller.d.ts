import { CreateDMFeatureServiceDTO } from '../dto/create-dm-feature-service.dto';
import { DMFeatureServiceService } from '../service/dm.feature-service.service';
export declare class DMFeatureServiceController {
    private readonly serviceService;
    constructor(serviceService: DMFeatureServiceService);
    create(createServiceDto: CreateDMFeatureServiceDTO): Promise<import("../schema/dm.feature-service.schema").DMFeatureService>;
    findAll(): Promise<import("../schema/dm.feature-service.schema").DMFeatureService[]>;
    findByCategory(category: string): Promise<import("../schema/dm.feature-service.schema").DMFeatureService[]>;
    findOne(id: string): Promise<import("../schema/dm.feature-service.schema").DMFeatureService | null>;
    update(id: string, updateServiceDto: CreateDMFeatureServiceDTO): Promise<import("../schema/dm.feature-service.schema").DMFeatureService | null>;
    remove(id: string): Promise<void>;
}
