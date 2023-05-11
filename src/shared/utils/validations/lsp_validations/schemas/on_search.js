const onsearchContext = {
    "id": "/onsearchContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,
    "properties": {
        "domain": { "enum": ["nic2004:60232"] },
        "action": { "enum": ["on_search"] },
        "country": { "type": "string" },
        "city": { "type": "string" },
        "core_version": { "enum": ["1.1.0"] },
        "bap_id": { "enum": ["ondc.eunimart.com"] },
        "bap_uri": { "type": "string" },
        "bpp_id": { "type": "string" },
        "bpp_uri": { "type": "string" },
        "transaction_id": { "type": "string" },
        "message_id": { "type": "string" },
        "timestamp": { "type": "string" },
    }
};

const onsearchMessage = {
    "id": "/onsearchMessage",
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
                        "properties": {
                            "id": { "type": "string" },
                            "type": { "enum": ["Prepaid", "CoD", "RTO", "Reverse QC"] }
                        },
                        "required": ["id", "type"]
                    }
                },
                "bpp/descriptor": {
                    "type": "object",
                    "required": ["name"],
                    "properties": {
                        "name": { "type": "string" }
                    }
                },
                "bpp/providers": {
                    "type": "array",
                    "items": {
                        "properties": {
                            "id": { "type": "string" },
                            "descriptor": {
                                "type": "object",
                                "required": ["name", "short_desc", "long_desc"],
                                "properties": {
                                    "name": { "type": "string" },
                                    "short_desc": { "type": "string" },
                                    "long_desc": { "type": "string" },
                                }
                            },
                            "categories": {
                                "type": "array",
                                "items": {
                                    "properties": {
                                        "id": { "type": "string" },
                                        "time": {
                                            "type": "object",
                                            "required": ["label", "duration"],
                                            "properties": {
                                                "label": { "enum": ["TAT"] },
                                                "duration": { "type": "string" },
                                            }
                                        }
                                    },
                                    "required": ["id", "time"],
                                }
                            },
                            "locations": {
                                "type": "array",
                                "items": {
                                    "properties": {
                                        "id": { "type": "string" },
                                        "gps": { "type": "string" },
                                        "address": { "type": "object" },
                                    },
                                    "required": ["id", "gps", "address"]
                                }
                            },
                            "items": {
                                "type": "array",
                                "items": {
                                    "properties": {
                                        "id": { "type": "string" },
                                        "parent_item_id": { "type": "string" },
                                        "category_id": { "type": "string" },
                                        "fulfillment_id": { "type": "string" },
                                        "descriptor": {
                                            "type": "object",
                                            "required": ["code"],
                                            "properties": {
                                                "code": { "enum": ["P2P", "P2H2P"] }
                                            }

                                        },
                                        "price": {
                                            "type": "object",
                                            "required": ["currency", "value"],
                                            "properties": {
                                                "currency": { "type": "string" },
                                                "value": { "type": "string" }
                                            }
                                        }
                                    },
                                    "required": ["id", "parent_item_id", "category_id", "fulfillment_id", "descriptor", "price"]
                                }
                            }
                        },
                        "required": ["id", "descriptor", "categories", "items"]
                    }
                }
            }
        }
    }
};

const onsearchValidation = {
    "id": "/onsearch",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onsearchContext" },
        "message": { "$ref": "/onsearchMessage" },
    }
};

export { onsearchContext, onsearchMessage, onsearchValidation }