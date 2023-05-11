import mongoose from "mongoose";

const BapSearchProviderCacheSchema = new mongoose.Schema(
    {
        context: { type: Object },
        "bpp/fulfillments": { type: Array },
        "bpp/descriptor": { type: Object },
        id: { type: String },
        descriptor: { type: Object },
        ttl : { type: String },
        tags: { type: Array },
        fulfillments: { type: Array },
        time: { type: Object },
        locations: { type: Array },
    },
    { _id: true }
);

const BapSearchItemCacheSchema = new mongoose.Schema(
    {
        id: { type: String },
        descriptor: { type: Object },
        quantity: { type: Object },
        price: { type: Object },
        category_id: { type: String },
        fulfillment_id: { type: String },
        "@ondc/org/returnable": { type: Boolean },
        "@ondc/org/cancellable": { type: Boolean },
        "@ondc/org/return_window": { type: String },
        "@ondc/org/seller_pickup_return": { type: Boolean },
        "@ondc/org/time_to_ship": { type: String },
        "@ondc/org/available_on_cod": { type: Boolean },
        "@ondc/org/contact_details_consumer_care": { type: String },
        "@ondc/org/statutory_reqs_prepackaged_food": { type: Object },
        location_id: { type: String },
        tags: { type: Object },
        provider_id: { type: String },
        bpp_id : { type: String },
        city: { type: String }
    },
    { _id: true }
);

const BapSearchProviderCache = mongoose.model('bap_search_provider_cache', BapSearchProviderCacheSchema, "bap_search_provider_cache");
const BapSearchItemCache = mongoose.model('bap_search_item_cache', BapSearchItemCacheSchema, "bap_search_item_cache");

export {BapSearchProviderCache, BapSearchItemCache}