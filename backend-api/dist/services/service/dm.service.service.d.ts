import { Model } from 'mongoose';
import { DMService, DMServiceDocument } from '../schema/dm.service.schema';
import { CreateDMServiceDTO } from '../dto/create-dm-service.dto';
export declare class DMServiceService {
    private serviceModel;
    constructor(serviceModel: Model<DMServiceDocument>);
    create(createDMServiceDTO: CreateDMServiceDTO): Promise<DMService>;
    findAll(category?: string): Promise<DMService[]>;
    findOne(id: string): Promise<DMService | null>;
    update(id: string, createDMServiceDTO: CreateDMServiceDTO): Promise<DMService | null>;
    remove(id: string): Promise<void>;
}
