import mongoose from "mongoose";
import { LocationSchema } from './provider.js'
import mongoosePaginate from "mongoose-paginate-v2";



const DescriptorSchema = new mongoose.Schema(
    {
        name: { type: String },
        symbol: { type: String },
        short_desc: { type: String },
        long_desc: { type: String },
        images: { type: [String] },
        code : { type: String },
    },
    { _id: false }
);

const QuantitySchema = new mongoose.Schema(
    {
        available: { type: Object },
        maximum: { type: Object },
    },
    { _id: false }
);

const PriceSchema = new mongoose.Schema(
    {
        currency: { type: String },
        value: { type: String },
        maximum_value: { type: String },
    },
    { _id: false }
);

const TagsSchema = new mongoose.Schema(
    {
        veg: { type: String },
        non_veg: { type: String },
        product_type: { type: String },
        brand_name: { type: String },
        color: { type: String },
        gender: { type: String },
        size: { type: String },
        country_of_origin: { type: String },
    },
    { _id: false }
);


const AddressSchema = new mongoose.Schema(
    {
        full: { type: String }
    },
    { _id: false }
)


const ContactSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: AddressSchema }
    },
    { _id: false }
)


const ManfacturerSchema = new mongoose.Schema(
    {
        address: { type: AddressSchema },
        contact: { type: ContactSchema },
        descriptor: { type: DescriptorSchema }
    },
    { _id: false, timestamps: true }
)


const ProductSchema = new mongoose.Schema(
    {
        id: { type: String },
        provider_id: { type: String },
        location_id: { type: String },
        descriptor: { type: DescriptorSchema },
        quantity: { type: QuantitySchema },
        price: { type: PriceSchema },
        category_id: { type: String },
        fulfillment_id: { type: String },
        "@ondc/org/available_on_cod": { type: Boolean, default: false },
        "@ondc/org/cancellable": { type: Boolean, default: false },
        "@ondc/org/returnable": { type: Boolean, default: false },
        "@ondc/org/seller_pickup_return": { type: Boolean, default: false },

        "@ondc/org/return_window": { type: String },
        "@ondc/org/time_to_ship": { type: String },
        "@ondc/org/contact_details_consumer_care": { type: String },

        "@ondc/org/statutory_reqs_prepackaged_food": { type: Object },
        "@ondc/org/statutory_reqs_packaged_commodities": { type: Object },
        "@ondc/org/mandatory_reqs_veggies_fruits": { type: Object },
        tags: { type: TagsSchema },

        location_ids: { type: [String] },
        expected_delivery_time: { type: String },
        created_by: { type: Number },
        external_id: { type: String },
        hsn_code_details: { type: Object },
        package_dimensions: { type: Object },

        rating: { type: Number },
        rating_count: { type: Number },
        offer_details: { type: Object }

    },
    { _id: true, timestamps: true },
    { versionKey: false }
);

ProductSchema.index({ userId: 1, createdAt: -1 });
ProductSchema.plugin(mongoosePaginate)
const Product = mongoose.model('products', ProductSchema, "products");

export default Product;