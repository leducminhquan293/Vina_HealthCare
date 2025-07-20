import { Model } from 'mongoose';
import { DMFeatureService, DMFeatureServiceDocument } from '../schema/dm.feature-service.schema';
import { CreateDMFeatureServiceDTO } from '../dto/create-dm-feature-service.dto';
export declare class DMFeatureServiceService {
    private serviceModel;
    constructor(serviceModel: Model<DMFeatureServiceDocument>);
    create(createDMServiceDTO: CreateDMFeatureServiceDTO): Promise<DMFeatureService>;
    findAll(category?: string): Promise<DMFeatureService[]>;
    findOne(id: string): Promise<DMFeatureService | null>;
    update(id: string, createDMServiceDTO: CreateDMFeatureServiceDTO): Promise<DMFeatureService | null>;
    remove(id: string): Promise<void>;
}
