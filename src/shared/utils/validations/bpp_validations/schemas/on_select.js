const onSelectContext = {
    "id": "/onSelectContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp"],
    "additionalProperties": true,
    "properties": {
        "domain": { "type": "string", "minLength": 1 },
        "country": { "type": "string", "minLength": 1 },
        "city": { "type": "string", "minLength": 1 },
        "action": { "enum": ["on_select"] },
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

const onSelectBppFulfillments = {
    "id": "/onSelectBppFulfillments",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "@ondc/org/provider_name": { "type": "string", "minLength": 1 },
            "tracking": { "enum": [false, true] },
            "@ondc/org/category": { "type": "string", "minLength": 1 },
            "@ondc/org/TAT": { "type": "string", "minLength": 1 },
            "state": {
                "type": "object",
                "properties": {
                    "descriptor": {
                        "type": "object",
                        "properties": {
                            "code": { "type": "string", "minLength": 1 }
                        }
                    }
                }
            }
        }
    }
};

const onSelectItems = {
    "id": "/onSelectItems",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "fulfillment_id": { "type": "string", "minLength": 1 }
        }
    }
}

const onSelectBppProviders = {
    "id": "/onSelectBppProviders",
    "type": "object",
    "properties": {
        "id": { "type": "string", "minLength": 1 }
    },
}

const onSelectPrice = {
    "id": "/onSelectPrice",
    "type": "object",
    "required": ["currency", "value"],
    "properties": {
        "currency": { "type": "string", "minLength": 1 },
        "value": { "type": "string", "minLength": 1 },
    }
}



const onSelectQuote = {
    "id": "/onSelectQuote",
    "type": "object",
    "required": ["price", "breakup"],
    "properties": {
        "price": { "$ref": "/onSelectPrice" },
        "breakup": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "@ondc/org/item_id": { "type": "string", "minLength": 1 },
                    "@ondc/org/item_quantity": {
                        "type": "object",
                        "required": ["count"],
                        "properties": {
                            "count": { "type": "integer", "minLength": 1 }

                        }
                    },
                    "title": { "type": "string", "minLength": 1 },
                    "@ondc/org/title_type": { "type": "string", "minLength": 1 },
                    "price": { "$ref": "/onSelectPrice" },
                    "item": {
                        "type": "object",
                        "properties": {
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
                            "price": { "$ref": "/onSelectPrice" }
                        }
                    },
                }
            }
        },
        "ttl": { "type": "string", "minLength": 1 }
    }
};

const onSelectMessage = {
    "id": "/onSelectMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["fulfillments", "provider", "quote", "items"],
            "properties": {
                "fulfillments": { "$ref": "/onSelectBppFulfillments" },
                "provider": { "$ref": "/onSelectBppProviders" },
                "quote": { "$ref": "/onSelectQuote" },
                "items": { "$ref": "/onSelectItems" }
            },
        },
    }
};

const onSelect = {
    "id": "/onSelect",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onSelectContext" },
        "message": { "$ref": "/onSelectMessage" },
    }
};

export { onSelectContext, onSelectMessage, onSelect, onSelectBppFulfillments, onSelectItems, onSelectBppProviders, onSelectPrice, onSelectQuote };