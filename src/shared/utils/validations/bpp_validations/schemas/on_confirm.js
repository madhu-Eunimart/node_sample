import {  FINDER_FEE_TYPE, PAYMENT_COLLECTED_BY, PAYMENT_TYPES, RETAIL_ORDER_STATE } from "../../../buyer_enums.js";



const onConfirmContext = {
    "id": "/onConfirmContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp"],
    "additionalProperties": true,
    "properties": {
        "domain": { "type": "string", "minLength": 1 },
        "country": { "type": "string", "minLength": 1 },
        "city": { "type": "string", "minLength": 1 },
        "action": { "enum": ["on_confirm"] },
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

const onConfirmProvider = {
    "id": "/onConfirmProvider",
    "type": "object",
    "required": ["id", "locations"],
    "properties": {
        "id": { "type": "string", "minLength": 1 },
        "locations": {
            "type": "array",
            "required": ["id"],
            "items": {
                "type": "object",
                "properties": {
                    "id": { "type": "string", "minLength": 1 }
                }
            },
        },
        "rateable": { "enum": [false, true] }
    }
};

const onConfirmItems = {
    "id": "/onConfirmItems",
    "type": "array",
    "items": {
        "type": "object",
        "required": ["id", "fulfillment_id", "quantity"],
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "fulfillment_id": { "type": "string", "minLength": 1 },
            "quantity": {
                "type": "object",
                "required": ["count"],
                "properties": {
                    "count": { "type": "integer", "minLength": 1 },
                }
            }
        }
    }
};

const onConfirmBilling = {
    "id": "/onConfirmBilling",
    "type": "object",
    "required": ["name", "address", "phone", "email", "created_at", "updated_at"],
    "properties": {
        "name": { "type": "string", "minLength": 1 },
        "address": {
            "type": "object",
            "required": ["building", "name", "locality", "city", "state", "country", "area_code"],
            "properties": {
                "building": { "type": "string", "minLength": 1 },
                "name": { "type": "string", "minLength": 1 },
                "locality": { "type": "string", "minLength": 1 },
                "city": { "type": "string", "minLength": 1 },
                "state": { "type": "string", "minLength": 1 },
                "country": { "type": "string", "minLength": 1 },
                "area_code": { "type": "string", "minLength": 1 },
            },
        },
        "phone": { "type": "string", "minLength": 1 },
        "email": { "type": "string", "minLength": 1 },
        "created_at": { "type": "string", "minLength": 1 },
        "updated_at": { "type": "string", "minLength": 1 },
    }
};

const onConfirmEnd = {
    "id": "/onConfirmEnd",
    "type": "object",
    "required": ["time", "contact", "location"],
    "properties": {
        "location": {
            "type": "object",
            "required": ["gps", "address"],
            "properties": {
                "gps": { "type": "string", "minLength": 1 },
                "address": {
                    "type": "object",
                    "required": ["building", "name", "locality", "city", "state", "country", "area_code"],
                    "properties": {
                        "building": { "type": "string", "minLength": 1 },
                        "name": { "type": "string", "minLength": 1 },
                        "locality": { "type": "string", "minLength": 1 },
                        "city": { "type": "string", "minLength": 1 },
                        "state": { "type": "string", "minLength": 1 },
                        "country": { "type": "string", "minLength": 1 },
                        "area_code": { "type": "string", "minLength": 1 }
                    }
                }
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
                        "start": { "type": "string", "minLength": 1 },
                        "end": { "type": "string", "minLength": 1 }
                    }
                }
            }
        },
        "instructions": {
            "type": "object",
            "required": ["name", "short_desc"],
            "properties": {
                "name": { "type": "string" },
                "short_desc": { "type": "string" },
            }
        },
        "contact": {
            "type": "object",
            "required": ["phone"],
            "properties": {
                "email": { "type": "string", "minLength": 1 },
                "phone": { "type": "string", "minLength": 1 },
            }
        },
    }
}

const onConfirmStart = {
    "id": "/onConfirmStart",
    "type": "object",
    "required": ["time", "contact", "location", "instructions"],
    "properties": {
        "location": {
            "type": "object",
            "required": ["gps", "descriptor", "id"],
            "properties": {
                "gps": { "type": "string" },
                "id": { "type": "string" },
                "descriptor": {
                    "type": "object",
                    "required": ["name"],
                    "properties": {
                        "name": { "type": "string" },
                    }
                }
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
        },
        "instructions": {
            "type": "object",
            "required": ["name", "short_desc"],
            "properties": {
                "name": { "type": "string" },
                "short_desc": { "type": "string" },
            }
        },
        "contact": {
            "type": "object",
            "required": ["phone", "email"],
            "properties": {
                "email": { "type": "string" },
                "phone": { "type": "string" }
            }
        },
    }
}

const onConfirmFulfillments = {
    "id": "/onConfirmFulfillments",
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "@ondc/org/provider_name": { "type": "string", "minLength": 1 },
            "state": {
                "type": "object",
                "required": ["descriptor"],
                "properties": {
                    "descriptor": {
                        "type": "object",
                        "required": ["code"],
                        "properties": {
                            "code": { "type": "string", "minLength": 1 }
                        }
                    }
                }
            },
            "type": { "type": "string" },
            "tracking": { "enum": [false, true] },
            "start": { "$ref": "/onConfirmStart" },
            "end": { "$ref": "/onConfirmEnd" },
            "rateable": { "enum": [false, true] }
        }
    },
};

const onConfirmPrice = {
    "id": "/onConfirmPrice",
    "type": "object",
    "required": ["currency", "value"],
    "properties": {
        "currency": { "type": "string", "minLength": 1 },
        "value": { "type": "string", "minLength": 1 },
    }
}

const onConfirmQuote = {
    "id": "/onConfirmQuote",
    "type": "object",
    "required": ["price", "breakup"],
    "properties": {
        "price": { "$ref": "/onConfirmPrice" },
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

                        },
                        "title": { "type": "string", "minLength": 1 },
                        "@ondc/org/title_type": { "type": "string", "minLength": 1 },
                        "price": { "$ref": "/onConfirmPrice" },
                        "item": {
                            "type": "object",
                            "properties": {
                                "price": { "$ref": "/onConfirmPrice" }
                            }
                        }
                    }
                }
            }
        },
        "ttl": { "type": "string", "minLength": 1 }
    }
};

const onConfirmPayment = {
    "id": "/onConfirmPayment",
    "type": "object",
    "required": ["type", "collected_by", "status",
        "@ondc/org/buyer_app_finder_fee_type",
        "@ondc/org/buyer_app_finder_fee_amount",
        "@ondc/org/settlement_details"],
    "properties": {
        "uri": { "type": "string", "minLength": 1 },
        "tl_method": { "type": "string", "minLength": 1 },
        "type": { "type": "string", "enums": Object.values(PAYMENT_TYPES) },
        "collected_by": { "type": "string", "enum": Object.values(PAYMENT_COLLECTED_BY) },
        "@ondc/org/buyer_app_finder_fee_type": { "type": "string", "enum": Object.values(FINDER_FEE_TYPE) },
        "status": { "type": "string", "minLength": 1 },
        "params": {
            "type": "object",
            "properties": {
                "currency": { "type": "string", "minLength": 1 },
                "transaction_id": { "type": "string", "minLength": 1 },
                "amount": { "type": "string", "minLength": 1 }
            }
        },
        "@ondc/org/buyer_app_finder_fee_amount": { "type": "string", "minLength": 1 },
        // "@ondc/org/withholding_amount": {"type": "string", "minLength": 1 },
        // "@ondc/org/return_window": {"type": "string", "minLength": 1 },
        // "@ondc/org/settlement_basis": {"type": "string", "minLength": 1 },
        // "@ondc/org/settlement_window": {"type": "string"},
        "@ondc/org/settlement_details": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "settlement_counterparty": { "type": "string", "minLength": 1 },
                    "settlement_phase": { "type": "string", "minLength": 1 },
                    "settlement_type": { "type": "string", "minLength": 1 },
                    "upi_address": { "type": "string", "minLength": 1 },
                    "settlement_bank_account_no": { "type": "string", "minLength": 1 },
                    "settlement_ifsc_code": { "type": "string", "minLength": 1 },
                    "beneficiary_name": { "type": "string", "minLength": 1 },
                    "bank_name": { "type": "string", "minLength": 1 },
                    "branch_name": { "type": "string", "minLength": 1 },
                }
            }
        }
    }
};

const onConfirmDocument = {
    "id": "/onConfirmDocument",
    "type": "object",
    "properties": {
        "url": { "type": "string", "minLength": 1 },
        "label": { "type": "string", "minLength": 1 }
    }
}
const onConfirmMessage = {
    "id": "/onConfirmMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["id", "state", "provider", "items", "billing", "fulfillments", "quote", "payment", "created_at", "updated_at"],
            "properties": {
                "id": { "type": "string", "minLength": 1 },
                "state": { "type": "string", "enum": Object.values(RETAIL_ORDER_STATE) },
                "provider": { "$ref": "/onConfirmProvider" },
                "items": { "$ref": "/onConfirmItems" },
                "billing": { "$ref": "/onConfirmBilling" },
                "fulfillments": { "$ref": "/onConfirmFulfillments" },
                "quote": { "$ref": "/onConfirmQuote" },
                "payment": { "$ref": "/onConfirmPayment" },
                "documents": { "$ref": "/onConfirmDocument" },
                "created_at": { "type": "string", "minLength": 1 },
                "updated_at": { "type": "string", "minLength": 1 },
            },
        }
    }
};

const onConfirm = {
    "id": "/onConfirm",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onConfirmContext" },
        "message": { "$ref": "/onConfirmMessage" },
    }
};

export { onConfirmContext, onConfirmMessage, onConfirm, onConfirmPayment, onConfirmQuote, onConfirmPrice, onConfirmFulfillments, onConfirmStart, onConfirmEnd, onConfirmBilling, onConfirmItems, onConfirmProvider, onConfirmDocument };