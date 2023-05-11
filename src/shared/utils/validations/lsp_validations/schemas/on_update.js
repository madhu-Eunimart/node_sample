const onupdateContext = {
    "id": "/onupdateContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,
    "properties": {
        "domain": { "enum": ["nic2004:60232"] },
        "action": { "enum": ["on_update"] },
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

const onupdateMessage = {
    "id": "/onupdateMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["id", "state", "items", "fulfillments", "updated_at"],
            "properties": {
                "id": { "type": "string" },
                "state": { "enum": ["Created", "Accepted", "In-progress", "Completed", "Cancelled"] },
                "items": {
                    "type": "array",
                    "items": {
                        "properties": {
                            "id": { "type": "string" },
                            "category_id": { "type": "string" },
                            "descriptor": {
                                "type": "object",
                                "required": ["code"],
                                "properties": {
                                    "code": { "enum": ["P2P", "P2H2P"] }
                                }
                            }
                        },
                        "required": ["id"],
                    }
                },
                "quote": {
                    "type": "object",
                    "required": ["price", "breakup"],
                    "properties": {
                        "price": {
                            "type": "object",
                            "required": ["currency", "value"],
                            "properties": {
                                "currency": { "type": "string" },
                                "value": { "type": "string" },
                            }
                        },
                        "breakup": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "@ondc/org/item_id": { "type": "string" },
                                    "@ondc/org/title_type": { "type": "string" },
                                    "price": {
                                        "type": "object",
                                        "required": ["currency", "value"],
                                        "properties": {
                                            "currency": { "type": "string" },
                                            "value": { "type": "string" },
                                        }
                                    }
                                },
                                "required": ["@ondc/org/item_id", "@ondc/org/title_type", "price"]
                            }
                        }
                    }
                },
                "fulfillments": {
                    "type": "array",
                    "items": {
                        "properties": {
                            "id": { "type": "string" },
                            "type": { "enum": ["Prepaid", "CoD", "RTO", "Reverse QC"] },
                            "start": {
                                "type": "object",
                                "properties": {
                                    "instructions": {
                                        "type": "object",
                                        "properties": {
                                            "short_desc": { "type": "string" },
                                            "long_desc": { "type": "string" },
                                            "images": { "type": "array" },
                                        }
                                    },
                                    "time": {
                                        "type": "object",
                                        "required": ["range"],
                                        "properties": {
                                            "range": {
                                                "type": "object",
                                                "required": ["start", "end"],
                                                "properties": {
                                                    "start": { "type": "string" },
                                                    "end": { "type": "string" },
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "end": {
                                "type": "object",
                                "properties": {
                                    "instructions": {
                                        "type": "object",
                                        "properties": {
                                            "short_desc": { "type": "string" },
                                            "long_desc": { "type": "string" },
                                            "additional_desc": { "type": "object" },
                                        }
                                    },
                                    "time": {
                                        "type": "object",
                                        "required": ["range"],
                                        "properties": {
                                            "range": {
                                                "type": "object",
                                                "required": ["start", "end"],
                                                "properties": {
                                                    "start": { "type": "string" },
                                                    "end": { "type": "string" },
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "state": {
                                "type": "object",
                                "required": ["descriptor"],
                                "properties": {
                                    "descriptor": {
                                        "type": "object",
                                        "required": ["code"],
                                        "properties": {
                                            "code": { "enum": ["Pending", "Searching-for-Agent", "Agent-assigned", "Order-picked-up", "Out-for-delivery", "Order-delivered", "RTO-Initiated", "RTO-Delivered", "RTO-Disposed", "Cancelled"] },
                                        }
                                    }
                                }
                            },
                            "tracking": { "type": "boolean" }
                        },
                        "required": ["id", "type", "state"],
                    }
                },
                "updated_at": { "type": "string" },
            }
        },
    }
};

const onupdateValidation = {
    "id": "/onupdate",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onupdateContext" },
        "message": { "$ref": "/onupdateMessage" },
    }
};

export { onupdateContext, onupdateMessage, onupdateValidation };