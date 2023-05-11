const onSearchContext = {
    "id": "/onSearchContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp"],
    "additionalProperties": true,
    "properties": {
        "domain": { "type": "string", "minLength": 1 },
        "country": { "type": "string", "minLength": 1 },
        "city": { "type": "string", "minLength": 1 },
        "action": { "enum": ["on_search"] },
        "core_version": { "type": "string", "minLength": 1 },
        "bap_id": { "type": "string", "minLength": 1 },
        "bap_uri": { "type": "string", "minLength": 1 },
        "bpp_id": { "type": "string", "minLength": 1 },
        "bpp_uri": { "type": "string", "minLength": 1 },
        "transaction_id": { "type": "string", "minLength": 1 },
        "message_id": { "type": "string", "minLength": 1 },
        "timestamp": { "type": "string", "minLength": 1 },
    }
};

const onSearchDescriptor = {
    "id": "/onSearchDescriptor",
    "type": "object",
    "required": ["name", "symbol", "short_desc", "long_desc", "images"],
    "properties": {
        "name": { "type": "string", "minLength": 1 },
        "symbol": { "type": "string", "minLength": 1 },
        "short_desc": { "type": "string", "minLength": 1 },
        "long_desc": { "type": "string", "minLength": 1 },
        "images": { "type": "array" },
    }
}

const onSearchPackagedCommodities = {
    "id": "/onSearchPackagedCommodities",
    "type": "object",
    "properties": {
        "manufacturer_or_packer_name": { "type": "string", "minLength": 1 },
        "manufacturer_or_packer_address": { "type": "string", "minLength": 1 },
        "common_or_generic_name_of_commodity_in_pkg": { "type": "string", "minLength": 1 },
        "month_year_of_manufacture_packing_import": { "type": "string", "minLength": 1 }
    }
}

const onSearchPrepackagedfood = {
    "id": "/onSearchPrepackagedfood",
    "type": "object",
    "properties": {
        "nutritional_info": { "type": "string", "minLength": 1 },
        'additives_info': { "type": "string", "minLength": 1 },
        "brand_owner_FSSAI_license_no": { "type": "string", "minLength": 1 },
        "other_FSSAI_LICENSE_NO": { "type": "string", "minLength": 1 },
        "importer_FSSAI_license_no": { "type": "string", "minLength": 1 }
    }
}
const onSearchItems = {
    "id": "/onSearchItems",
    "type": "object",
    "properties": {
        "id": { "type": "string", "minLength": 1 },
        "descriptor": { "$ref": "/onSearchDescriptor" },
        "quantity": {
            "type": "object",
            "properties": {
                "available": {
                    "type": "object",
                    "properties": {
                        "count": { "type": "string", "minLength": 1 }
                    }
                },
                "maximum": {
                    "type": "object",
                    "properties": {
                        "count": { "type": "string", "minLength": 1 }
                    }
                }
            }
        },
        "price": {
            "type": "object",
            "properties": {
                "currency": { "type": "string", "minLength": 1 },
                "value": { "type": "string", "minLength": 1 },
                "maximum_value": { "type": "string", "minLength": 1 }
            }
        },
        "category_id": { "type": "string", "minLength": 1 },
        "fulfillment_id": { "type": "string", "minLength": 1 },
        "location_id": { "type": "string", "minLength": 1 },
        "@ondc/org/returnable": { "enum": [false, true] },
        "@ondc/org/cancellable": { "enum": [false, true] },
        "@ondc/org/return_window": { "type": "string" },
        "@ondc/org/seller_pickup_return": { "enum": [false, true] },
        "@ondc/org/time_to_ship": { "type": "string" },
        "@ondc/org/available_on_cod": { "enum": [false, true] },
        "@ondc/org/contact_details_consumer_care": { "type": "string", "minLength": 1 },
        "@ondc/org/statutory_reqs_packaged_commodities": { "$ref": "/onSearchPackagedCommodities" },
        "@ondc/org/statutory_reqs_prepackaged_food": { "$ref": "/onSearchPrepackagedfood" },
        "@ondc/org/mandatory_reqs_veggies_fruits": {
            "type": "object",
            "properties": {
                "net_quantity": { "type": "string", "minLength": 1 }
            }
        },
        "tags": { "$ref": "/onsearchItemTags" }
    },
    "required": [
        "id",
        "descriptor",
        "quantity",
        "price",
        "category_id",
        "fulfillment_id",
        "location_id",
        "@ondc/org/returnable",
        "@ondc/org/cancellable",
        "@ondc/org/time_to_ship",
        "@ondc/org/available_on_cod",
        "@ondc/org/contact_details_consumer_care",
    ]
}


const onsearchItemTags = {
    "id": "/onsearchItemTags",
    "type": "object",
    "properties": {
        "veg": { "type": "string", "enum": ["yes", "no"] },
        "non_veg": { "type": "string", "enum": ["yes", "no"] }
    }
}

const onsearchTags = {
    "id": "/onsearchTags",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "code": { "type": "string", "minLength": 1 },
            "list": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "code": { "type": "string", "minLength": 1 },
                        "value": { "type": "string", "minLength": 1 }
                    }
                }
            }
        }
    }
}

const onsearchLocations = {
    "id": "/onsearchLocations",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "gps": { "type": "string" },
            "address": {
                "type": "object",
                "properties": {
                    "street": { "type": "string" },
                    "city": { "type": "string" },
                    "area_code": { "type": "string" },
                    "state": { "type": "string" }
                }
            },
            "time": {
                "type": "object",
                "properties": {
                    "days": { "type": "string" },
                    "schedule": {
                        "type": "object",
                        "properties": {
                            "holidays": {
                                "type": "array",
                                "items": {
                                    "frequency": { "type": "string" }
                                }
                            },
                            "times": {
                                "type": "array",
                                "items": {
                                    "0": { "type": "string" },
                                    "1": { "type": "string" }
                                }
                            }
                        }

                    },
                    "range": {
                        "type": "object",
                        "properties": {
                            "start": { "type": "string" },
                            "end": { "type": "string" }
                        }
                    }
                }
            }
        }
    }
}

const onsearchFulfillments = {
    "id": "/onsearchFulfillments",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "contact": {
                "type": "object",
                "properties": {
                    "phone": { "type": "string" },
                    "email": { "type": "string" }
                }
            }
        }
    }
}
const onSearchMessage = {
    "id": "/onSearchMessage",
    "type": "object",
    "required": ["catalog"],
    "additionalProperties": true,

    "properties": {
        "catalog": {
            "type": "object",
            "required": ["bpp/fulfillments", "bpp/descriptor", "bpp/providers"],
            "properties": {
                "bpp/fulfillments": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": { "type": "string" },
                            "type": { "type": "string" }
                        }
                    }
                },
                "bpp/descriptor": { "$ref": "/onSearchDescriptor" },
                "bpp/providers": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "id": { "type": "string" },
                            "descriptor": { "$ref": "/onSearchDescriptor" },
                            "@ondc/org/fssai_license_no": { "type": "string" },
                            "ttl": { "type": "string" },
                            "locations": { "$ref": "/onsearchLocations" },
                            "items": { "type": "array" },
                            "time": {
                                "type": "object",
                                "properties": {
                                    "label": { "type": "string" },
                                    "timestamp": { "type": "string" }
                                }
                            },
                            "fulfillments": { "$ref": "/onsearchFulfillments" },
                            "tags": { "$ref": "/onsearchTags" }
                        },
                        "required": ["id", "descriptor", "ttl", "locations", "items", "fulfillments", "tags"],

                    }
                }
            }
        }
    }
}


const onSearch = {
    "id": "/onSearch",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onSearchContext" },
        "message": { "$ref": "/onSearchMessage" },
    }
};

export { onSearchContext, onSearchMessage, onSearch, onSearchDescriptor, onSearchItems, onSearchPackagedCommodities, onsearchFulfillments, onsearchTags, onSearchPrepackagedfood, onsearchLocations, onsearchItemTags };