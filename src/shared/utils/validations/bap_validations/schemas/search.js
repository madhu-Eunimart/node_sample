const searchContext = {
    "id": "/searchContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "ttl"],
    "additionalProperties": true,
    "properties": {
        "domain": { "type": "string" },
        "action": { "enum": ["search"] },
        "country": { "type": "string" },
        "city": { "type": "string" },
        "core_version": { "type": "string" },
        "bap_id": { "type": "string" },
        "bap_uri": { "type": "string" },
        "transaction_id": { "type": "string" },
        "message_id": { "type": "string" },
        "timestamp": { "type": "string" },
        "ttl": { "type": "string" },
    }
};
const fulfillment = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": { "type": "string" }
    }
}


const searchByCityMessage = {
    "id": "/searchByCityMessage",
    "type": "object",
    "required": ["intent"],
    "additionalProperties": true,

    "properties": {
        "intent": {
            "type": "object",
            "required": ["fulfillment", "payment"],
            "properties": {
                "fulfillment": fulfillment,

                "payment": {
                    "type": "object",
                    "required": ["@ondc/org/buyer_app_finder_fee_type"],
                    "properties": {
                        "@ondc/org/buyer_app_finder_fee_type": { "type": "string" },
                        "@ondc/org/buyer_app_finder_fee_amount": { "type": "string" }
                    }
                }
            },
        }
    }
};

const initEnd = {
    "id": "/initEnd",
    "type": "object",
    "required": ["location"],
    "properties":
    {
        "location": {
            "type": "object",
            "required": ["gps", "address"],
            "properties": {
                "gps": { "type": "string" },
                "address": {
                    "type": "object",
                    "required": ["area_code"],
                    "properties": {
                        "area_code": { "type": "string" }
                    }
                }
            }
        }
    }
};

const searchByItemMessage = {
    "id": "/searchByItemMessage",
    "type": "object",
    "required": ["intent"],
    "additionalProperties": true,

    "properties": {
        "intent": {
            "type": "object",
            "required": ["item", "fulfillment", "payment"],
            "properties": {
                "item": {
                    "type": "object",
                    "properties": {
                        "descriptor": {
                            "type": "object",
                            "properties": {
                                "required": ["name"],
                                "name": { "type": "string" }
                            }
                        }
                    }
                },
                "fulfillment": fulfillment
            },
            "payment": {
                "type": "object",
                "required": ["@ondc/org/buyer_app_finder_fee_type"],
                "properties": {
                    "@ondc/org/buyer_app_finder_fee_type": { "type": "string" },
                    "@ondc/org/buyer_app_finder_fee_amount": { "type": "string" }
                }
            }
        },
    }
}



const searchByCategoryMessage = {
    "id": "/searchByCategoryMessage",
    "type": "object",
    "required": ["intent"],
    "additionalProperties": true,

    "properties": {
        "intent": {
            "type": "object",
            "required": ["category", "fulfillment", "payment"],
            "properties": {
                "category": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id": { "type": "string" }
                    }
                },
                "fulfillment": fulfillment
            },
            "payment": {
                "type": "object",
                "required": ["@ondc/org/buyer_app_finder_fee_type"],
                "properties": {
                    "@ondc/org/buyer_app_finder_fee_type": { "type": "string" },
                    "@ondc/org/buyer_app_finder_fee_amount": { "type": "string" }
                }
            }
        },
    }
}


const searchByCity = {
    "id": "/searchByCity",
    "type": "object",
    "properties": {
        "context": { "$ref": "/searchContext" },
        "message": { "$ref": "/searchByCityMessage" },
    }
};

const searchByItem = {
    "id": "/searchByItem",
    "type": "object",
    "properties": {
        "context": { "$ref": "/searchContext" },
        "message": { "$ref": "/searchByItemMessage" },
    }
};

const searchByCategory = {
    "id": "/searchByCategory",
    "type": "object",
    "properties": {
        "context": { "$ref": "/searchContext" },
        "message": { "$ref": "/searchByCategoryMessage" },
    }
};

export { searchContext, searchByCategory, searchByItem, searchByCity, searchByCityMessage, searchByItemMessage, searchByCategoryMessage, initEnd };
