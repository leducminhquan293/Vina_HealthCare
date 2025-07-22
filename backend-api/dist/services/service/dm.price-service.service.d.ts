import { Model } from 'mongoose';
import { DMPriceService, DMPriceServiceDocument } from '../schema/dm.price-service.schema';
import { CreateDMPriceServiceDTO } from '../dto/create-dm-price-service.dto';
export declare class DMPriceServiceService {
    private serviceModel;
    constructor(serviceModel: Model<DMPriceServiceDocument>);
    create(createDMServiceDTO: CreateDMPriceServiceDTO): Promise<DMPriceService>;
    findAll(category?: string): Promise<DMPriceService[]>;
    findOne(id: string): Promise<DMPriceService | null>;
    update(id: string, createDMServiceDTO: CreateDMPriceServiceDTO): Promise<DMPriceService | null>;
    remove(id: string): Promise<void>;
}
