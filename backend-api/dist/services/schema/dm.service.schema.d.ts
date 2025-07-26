import { Document } from 'mongoose';
export type DMServiceDocument = DMService & Document;
export declare class DMService {
    name: string;
    description: string;
    icon: string;
    name_en: string;
    description_en: string;
    is_active: boolean;
}
export declare const DMServiceSchema: import("mongoose").Schema<DMService, import("mongoose").Model<DMService, any, any, any, Document<unknown, any, DMService, any> & DMService & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DMService, Document<unknown, {}, import("mongoose").FlatRecord<DMService>, {}> & import("mongoose").FlatRecord<DMService> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
