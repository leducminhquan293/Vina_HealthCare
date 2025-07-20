import { Model } from 'mongoose';
import { Service, ServiceDocument } from '../schema/service.schema';
export declare class ServicesService {
    private serviceModel;
    constructor(serviceModel: Model<ServiceDocument>);
    create(createServiceDto: any): Promise<ServiceDocument>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ServiceDocument, {}> & Service & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
