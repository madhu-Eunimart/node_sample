//@ts-check
import mongoose from "mongoose";


const FulfillmentSchema = new mongoose.Schema(
    {
        id: { type: String },
        type: { type: String },    
    },
    { _id: false }
);

const DescriptorSchema = new mongoose.Schema(
    {
        name: { type: String },
        symbol: { type: String },
        short_desc: { type: String },
        long_desc: { type: String },
        images: { type: [String] },   
        external_id: {type: String},
    },
    { _id: false }
);

const CircleSchema = new mongoose.Schema(
    {
        gps: { type: String },
        radius: { type: Object },    
    },
    { _id: false }
);

const TimeSchema = new mongoose.Schema(
    {
        days: { type: String },
        schedule: { type: Object },
        range: { type: Object },    
    },
    { _id: false }
);

const LocationSchema = new mongoose.Schema(
    {
        id: { type: String },
        gps: { type: String },
        address: { type: Object },
        circle: { type: CircleSchema },
        time: {type: TimeSchema},
        contact : { type: Object}   
    },
    { _id: false }
);

const ProviderSchema = new mongoose.Schema(
    {
        id: { type: String },
        company_id : {type : Number},
        descriptor: { type: DescriptorSchema },
        ttl: { type: String },
        locations: { type: [LocationSchema] },
        tags : {type : Object, default: []},
        company_details :{type : Object},
        "@ondc/org/fssai_license_no" : { type: String },
        bpp_fulfillments: { type: Object , default: []},
        fulfillments : {type : Object, default: []},
        time : { type: Object },
    },
    { _id: true, timestamps: true },
);

ProviderSchema.index({userId: 1, createdAt: -1});

const Provider = mongoose.model('provider', ProviderSchema, "provider");

export default Provider;
export  {
    LocationSchema
}