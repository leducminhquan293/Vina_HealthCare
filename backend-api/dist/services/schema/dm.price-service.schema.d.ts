import { Document } from 'mongoose';
export type DMPriceServiceDocument = DMPriceService & Document;
export declare class DMPriceService {
    service_id: string;
    description: string;
    price: number;
    is_popular: boolean;
}
export declare const DMPriceServiceSchema: import("mongoose").Schema<DMPriceService, import("mongoose").Model<DMPriceService, any, any, any, Document<unknown, any, DMPriceService, any> & DMPriceService & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DMPriceService, Document<unknown, {}, import("mongoose").FlatRecord<DMPriceService>, {}> & import("mongoose").FlatRecord<DMPriceService> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
