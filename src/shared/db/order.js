import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { PROTOCOL_PAYMENT, RETAIL_ORDER_STATE, PAYMENT_TYPES } from "../utils/buyer_enums.js";

const AddOnsSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
    },
    { _id: false }
);

const OrganizationSchema = new mongoose.Schema(
    {
        name: { type: String },
        cred: { type: String },
    },
    { _id: false }
);

const AddressSchema = new mongoose.Schema(
    {
        door: { type: String },
        name: { type: String },
        building: { type: String },
        street: { type: String },
        locality: { type: String },
        ward: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        area_code: { type: String }
    },
    { _id: false }
);

const TimeRangeSchema = new mongoose.Schema(
    {
        start: { type: Date },
        end: { type: Date },
    },
    { _id: false }
);

const TimeSchema = new mongoose.Schema(
    {
        label: { type: String },
        timestamp: { type: Date },
        duration: { type: String },
        range: { type: TimeRangeSchema },
        days: { type: String },
    },
    { _id: false }
);

const BillingSchema = new mongoose.Schema(
    {
        id: String,
        name: { type: String, required: true },
        phone: { type: String, required: true },
        organization: { type: OrganizationSchema },
        address: { type: AddressSchema },
        email: { type: String },
        time: { type: TimeSchema },
        taxNumber: { type: String },
        locationId: { type: String },
        created_at: { type: String },
        updated_at: { type: String }
    },
    { _id: false, timestamps: false }
);

const DescriptorSchema = new mongoose.Schema(
    {
        name: String,
        phone: { type: String },
        email: { type: String },
        code: { type: String },
        symbol: { type: String },
        short_desc: { type: String },
        long_desc: { type: String },
        images: { type: [String] },
        audio: { type: String },
        "3d_render": { type: String }
    },
    { _id: false }
);

const StateSchema = new mongoose.Schema(
    {
        descriptor: { type: DescriptorSchema },
        updatedAt: { type: Date },
        updatedBy: { type: String },
    },
    { _id: false }
);

const PersonSchema = new mongoose.Schema(
    {
        name: { type: String },
        phone: { type: String },
        image: { type: String },
        dob: { type: Date },
        gender: { type: String },
        cred: { type: String },
        tags: { type: Map },
    },
    { _id: false }
);

const VehicleSchema = new mongoose.Schema(
    {
        category: { type: String },
        capacity: { type: Number },
        make: { type: String },
        model: { type: String },
        size: { type: String },
        variant: { type: String },
        color: { type: String },
        energyType: { type: String },
        registration: { type: String }
    },
    { _id: false }
);

const CitySchema = new mongoose.Schema(
    {
        name: { type: String },
        code: { type: String }
    },
    { _id: false }
);

const CountrySchema = new mongoose.Schema(
    {
        name: { type: String },
        code: { type: String }
    },
    { _id: false }
);

const ScalarRangeSchema = new mongoose.Schema(
    {
        min: { type: mongoose.Decimal128 },
        max: { type: mongoose.Decimal128 },
    },
    { _id: false }
);

const ScalarSchema = new mongoose.Schema(
    {
        value: { type: mongoose.Decimal128, required: true },
        unit: { type: String, required: true },
        type: { type: String, enum: ['CONSTANT', 'VARIABLE'] },
        estimatedValue: { type: mongoose.Decimal128 },
        computedValue: { type: mongoose.Decimal128 },
        range: { type: ScalarRangeSchema },
    },
    { _id: false }
);

const CircleSchema = new mongoose.Schema(
    {
        radius: { type: ScalarSchema },
    },
    { _id: false }
);

const LocationSchema = new mongoose.Schema(
    {
        id: { type: String },
        descriptor: { type: DescriptorSchema },
        gps: { type: String },
        address: { type: AddressSchema },
        stationCode: { type: String },
        city: { type: CitySchema },
        country: { type: CountrySchema },
        circle: { type: CircleSchema },
        polygon: { type: String },
        "3dspace": { type: String }
    },
    { _id: false }
);

const ContactSchema = new mongoose.Schema(
    {
        phone: { type: String },
        email: { type: String },
        tags: { type: Map }
    },
    { _id: false }
);

const FulfillmentStartSchema = new mongoose.Schema(
    {
        location: { type: LocationSchema },
        time: { type: TimeSchema },
        instructions: { type: DescriptorSchema },
        contact: { type: ContactSchema }
    },
    { _id: false }
);

const FulfillmentEndSchema = new mongoose.Schema(
    {
        location: { type: LocationSchema },
        time: { type: TimeSchema },
        instructions: { type: DescriptorSchema },
        contact: { type: ContactSchema }
    },
    { _id: false }
);

const CustomerSchema = new mongoose.Schema(
    {
        person: { type: PersonSchema },
        contact: { type: ContactSchema }
    },
    { _id: false }
);

const FulfillmentSchema = new mongoose.Schema(
    {
        id: { type: String },
        type: { type: String },
        state: { type: StateSchema },
        tracking: { type: Boolean },
        agent: { type: PersonSchema },
        vehicle: { type: VehicleSchema },
        start: { type: FulfillmentStartSchema },
        end: { type: FulfillmentEndSchema },
        purpose: { type: String },
        customer: { type: CustomerSchema },
        tags: { type: Map },
        provider_id: { type: String },
        '@ondc/org/provider_name': { type: String },
        '@ondc/org/TAT': { type: String },
        rateable: { type: Boolean }
    },
    { _id: false, strict: false }
);

const ProviderLocationSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
    },
    { _id: false }
);

const ProviderSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        locations: [ProviderLocationSchema],
        rateable: { type: Boolean }
    },
    { _id: false }
);

const ItemQuantityAllocatedSchema = new mongoose.Schema(
    {
        count: { type: Number },
        measure: { type: ScalarSchema },
    },
    { _id: false }
);

const ItemsSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        quantity: { type: ItemQuantityAllocatedSchema, required: true },
        descriptor: { type: DescriptorSchema },
        product: { type: Object, required: false },
        fulfillment_status: { type: String, required: false },
        cancellation_status: { type: String, required: false },
        return_status: { type: String, required: false }
    },
    { _id: false }
);

const OfferSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
    },
    { _id: false }
);

const PriceSchema = new mongoose.Schema(
    {
        currency: { type: String },
        value: { type: String },
        estimated_value: { type: String },
        computed_value: { type: String },
        listed_value: { type: String },
        offered_value: { type: String },
        minimum_value: { type: String },
        maximum_value: { type: String },
    },
    { _id: false }
);

const QuotationBreakupSchema = new mongoose.Schema(
    {
        type: { type: String, enum: ['item', 'offer', 'add-on', 'fulfillment'] },
        refId: { type: String },
        title: { type: String },
        price: { type: PriceSchema }
    },
    { _id: false }
);

const QuotationSchema = new mongoose.Schema(
    {
        price: { type: PriceSchema },
        breakup: { type: [QuotationBreakupSchema] },
        ttl: { type: String }
    },
    { _id: false }
);

const PaymentSchema = mongoose.Schema(
    {
        uri: { type: String },
        tlMethod: { type: String, enum: ['http/get', 'http/post'] },
        params: { type: Object },
        type: { type: String, enum: PAYMENT_TYPES },
        status: { type: String, enum: PROTOCOL_PAYMENT },
        time: { type: TimeSchema },
        collected_by: { type: String },
        '@ondc/org/buyer_app_finder_fee_type': { type: String },
        '@ondc/org/buyer_app_finder_fee_amount': { type: String },
        "@ondc/org/settlement_details": { type: Object }
    },
    { _id: false, strict: false }
);

const OrderSchema = new mongoose.Schema(
    {
        confirm: { type: Object },
        onConfirm: { type: Object },
        cancelRequest: { type: Object, default: null },
        updateRequest: { type: Object, default: null },
        context: { type: Object },
        provider: { type: ProviderSchema },
        items: { type: Object },
        addOns: { type: [AddOnsSchema] },
        offers: { type: [OfferSchema] },
        billing: { type: BillingSchema },
        fulfillments: { type: [FulfillmentSchema] },
        quote: { type: Object },
        payment: { type: PaymentSchema },
        id: { type: String },
        city: { type: String },
        state: { type: String, enum: RETAIL_ORDER_STATE }, 
        userId: String,
        transactionId: { type: String },
        messageId: { type: String },
        parentOrderId: { type: String },
        paymentStatus: { type: String, enum: PROTOCOL_PAYMENT, default: PROTOCOL_PAYMENT["NOT-PAID"] },
        bppDescriptor: { type: Object },
        bppProvider: { type: Object },
        bapDescriptor: { type: Object },
        bapOrderId: { type: String },
        CreatedBy: { type: String },
        created_at: { type: String },
        updated_at: { type: String },
        // createdAt: { type: Date, default: new Date() },
        delivery_city: { type: String },
        delivery_pincode: { type: String },
        sku_name: { type: String, default: null },
        sku_code: { type: String, default: null },
        delivery_type: { type: String, default: "OFF NETWORK" },
        logistics_network_order_id: { type: String, default: "" },
        logistics_seller_np_name: { type: String, default: "" },
        logistics_network_transaction_id: { type: String, default: "" },
        cancelled_at: { type: String, default: null },
        cancelled_by: { type: String, default: null },
        cancellation_reason: { type: String, default: null },
        cancellation_remark: { type: String, default: null },
        documents: { type: Object },
        source: { type: String },
        received_on_confirm: { type: String },
        retry_count: { type: Number }
    },
    { _id: true, timestamps: true }
);

OrderSchema.index({ userId: 1, createdAt: -1 });
OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('order', OrderSchema, "order");

export default Order;