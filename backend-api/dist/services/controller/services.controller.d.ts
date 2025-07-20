import { ServicesService } from '../service/services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: any): Promise<import("../schema/service.schema").ServiceDocument>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/service.schema").ServiceDocument, {}> & import("../schema/service.schema").Service & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
