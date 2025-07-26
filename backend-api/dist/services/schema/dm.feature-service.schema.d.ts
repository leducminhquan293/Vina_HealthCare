import { Document } from 'mongoose';
export type DMFeatureServiceDocument = DMFeatureService & Document;
export declare class DMFeatureService {
    price_id: string;
    name: string;
    description: string;
    name_en: string;
    description_en: string;
    is_active: boolean;
}
export declare const DMFeatureServiceSchema: import("mongoose").Schema<DMFeatureService, import("mongoose").Model<DMFeatureService, any, any, any, Document<unknown, any, DMFeatureService, any> & DMFeatureService & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DMFeatureService, Document<unknown, {}, import("mongoose").FlatRecord<DMFeatureService>, {}> & import("mongoose").FlatRecord<DMFeatureService> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
