import { PAYMENT_COLLECTED_BY, FINDER_FEE_TYPE } from "../../../buyer_enums.js";

const onInitContext = {
    "id": "/onInitContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp"],
    "additionalProperties": true,
    "properties": {
        "domain": { "type": "string", "minLength": 1 },
        "country": { "type": "string", "minLength": 1 },
        "city": { "type": "string", "minLength": 1 },
        "action": { "enum": ["on_init"] },
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

const onInitProvider = {
    "id": "/onInitProvider",
    "type": "object",
    "required": ["id"],
    "properties": {
        "id": { "type": "string", "minLength": 1 },
    }
};

const onInitBilling = {
    "id": "/onInitBilling",
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

const onInitItems = {
    "id": "/onInitItems",
    "type": "array",
    "items": {
        "type": "object",
        "required": ["id", "fulfillment_id", "quantity"],
        "properties": {
            "id": { "type": "string" },
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

const onInitEnd = {
    "id": "/onInitEnd",
    "type": "object",
    "required": ["contact", "location"],
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

const onInitFulfillments = {
    "id": "/onInitFulfillments",
    "type": "array",
    "items": {
        "type": "object",
        "required": ["id", "type", "tracking", "end"],
        "properties": {
            "id": { "type": "string", "minLength": 1 },
            "type": { "type": "string", "minLength": 1 },
            "tracking": { "enum": [false, true] },
            "end": { "$ref": "/onInitEnd" },
        },
    }
};

const onInitPrice = {
    "id": "/onInitPrice",
    "type": "object",
    "required": ["currency", "value"],
    "properties": {
        "currency": { "type": "string", "minLength": 1 },
        "value": { "type": "string", "minLength": 1 },
    }
}

const onInitQuote = {
    "id": "/onInitQuote",
    "type": "object",
    "required": ["price", "breakup"],
    "properties": {
        "price": { "$ref": "/onInitPrice" },
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
                        "price": { "$ref": "/onInitPrice" },
                        "item": {
                            "type": "object",
                            "properties": {
                                "price": { "$ref": "/onInitPrice" }
                            }
                        }
                    }
                }
            }
        },
        "ttl": { "type": "string", "minLength": 1 }
    }
};

const onInitPayment = {
    "id": "/onInitPayment",
    "type": "object",
    "required": [
        "@ondc/org/buyer_app_finder_fee_type",
        "@ondc/org/buyer_app_finder_fee_amount",
        "@ondc/org/settlement_details"],
    "properties": {
        "type": { "type": "string", "minLength": 1 },
        "collected_by": { "type": "string", enum: Object.values(PAYMENT_COLLECTED_BY) },
        "@ondc/org/buyer_app_finder_fee_type": { "type": "string", enum: Object.values(FINDER_FEE_TYPE) },
        "@ondc/org/buyer_app_finder_fee_amount": { "type": "string", "minLength": 1 },
        // "@ondc/org/withholding_amount": { "type": "string", "minLength": 1 },
        // "@ondc/org/return_window": { "type": "string", "minLength": 1 },
        // "@ondc/org/settlement_basis": { "type": "string", "minLength": 1 },
        // "@ondc/org/settlement_window": { "type": "string", "minLength": 1 },
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



const onInitMessage = {
    "id": "/onInitMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["provider", "provider_location", "items", "billing", "fulfillments", "quote", "payment"],
            "properties": {
                "provider": { "$ref": "/onInitProvider" },
                "provider_location": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id": { "type": "string", "minLength": 1 },
                    },
                    "items": { "$ref": "/onInitItems" },
                    "billing": { "$ref": "/onInitBilling" },
                    "fulfillments": { "$ref": "/onInitFulfillments" },
                    "quote": { "$ref": "/onInitQuote" },
                    "payment": { "$ref": "/onInitPayment" },
                },
            },
        }
    }
};

const onInit = {
    "id": "/init",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onInitContext" },
        "message": { "$ref": "/onInitMessage" },
    }
};

export { onInitContext, onInitMessage, onInit, onInitPayment, onInitQuote, onInitPrice, onInitFulfillments, onInitEnd, onInitItems, onInitProvider, onInitBilling };