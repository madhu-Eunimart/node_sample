import { RETAIL_ORDER_STATE , PAYMENT_COLLECTED_BY, FINDER_FEE_TYPE, PAYMENT_TYPES,  PROTOCOL_PAYMENT} from "../../../buyer_enums.js";

const confirmContext = {
    "id": "/confirmContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "confirm" ]},
        "core_version": {"type": "string"},
        "bap_id": {"type": "string"},
        "bap_uri": {"type": "string"},
        "bpp_id": {"type": "string"},
        "bpp_uri": {"type": "string"},
        "transaction_id": {"type": "string"},
        "message_id": {"type": "string"},
        "city": {"type": "string"},
        "country": {"type": "string"},
        "timestamp": {"type": "string"},
        "ttl": {"type": "string"},
        }
};


const order_state = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": {"type": "string", enum : Object.keys(RETAIL_ORDER_STATE)}             
}
}


const finder_fee_type = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": {"type": "string", enum : Object.keys(FINDER_FEE_TYPE)}             
}
}

const status = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": {"type": "string", enum: Object.keys(PROTOCOL_PAYMENT)}             
}
}



const confirmProvider = {
"id": "/confirmProvider",
"type": "object",
"required": ["id", "locations"],
"properties": {
    "id": {"type": "string"},
    "locations": {
        "type": "object",
        "required": ["id"],
        "properties": {
            "id": {"type": "string"},   
            },
        }
    }
};

const confirmItems = {
"id": "/confirmItems",
"type": "array",
"items":{
    "id": {"type": "string"},
    "fulfillment_id": {"type": "string"},
    "quantity":{
        "type": "object",
        "required": ["count"],
        "properties": {
            "count": {"type": "integer"},
            }
        }
    }
};
    
const confirmBilling = {
    "id": "/confirmBilling",
    "type": "object",
    "required": ["name", "address", "phone", "email"],
    "properties": {
        "name": {"type": "string"},
        "address": {
            "type": "",
            "required": ["building","name","locality","city","state","country","area_code"],
            "properties": {
                "building": {"type": "string"},
                "name": {"type": "string"},
                "locality": {"type": "string"},
                "city": {"type": "string"},
                "state": {"type": "string"},
                "country": {"type": "string"},
                "area_code": {"type": "string"},
            },
        "phone": {"type": "string"},
        "email": {"type": "string"},
        "created_at":{"type":"string"},
        "updated_at":{"type":"string"}
        }
    }
};
        
const confirmEnd = {
    "id": "/confirmEnd",
    "type": "object",
    "required": ["person", "contact", "location"],
    "properties": {
        "person": {
            "type": "object",
            "required": ["name"],
            "properties": {
                "name": {"type": "string"}
            }
        },
        "contact": {
            "type": "object",
            "required": ["email", "phone"],
            "properties": {
                "email": {"type": "string"},
                "phone": {"type": "string"}, 
            }
        },
        "location": {
            "type": "object",
            "required": ["gps", "address"],
            "properties": {
                "gps": {"type": "string"},
                "address": {
                    "type": "object",
                    "required": ["building", "name", "locality", "city", "state", "country", "area_code"],
                    "properties": {
                        "building": {"type": "string"}, 
                        "name": {"type": "string"}, 
                        "locality": {"type": "string"}, 
                        "city": {"type": "string"}, 
                        "state": {"type": "string"}, 
                        "country": {"type": "string"}, 
                        "area_code": {"type": "string"}
                        }
                    } 
                }
            }
        }
}

const confirmFulfillments = {
        "id": "/confirmFulfillments",
        "type": "array",
        "items":{
            "id": {"type": "string"},
            "type": {"type": "string"},
            "tracking": {"enum": [ false, true ]},
            // "provider_id": {"type": "string"},
            "end": {"$ref": "/confirmEnd"},
        },

};
     
const confirmPrice = {
    "id": "/confirmPrice",
    "type": "object",
        "required": ["currency", "value"],
        "properties": {
            "currency": {"type": "string"},
            "value": {"type": "string"},
        }
}

const confirmQuote = {
"id": "/confirmQuote",
"type": "object",
"required": ["price", "breakup"],
"properties": {
    "price": {"$ref": "/confirmPrice"},
    "breakup":{
        "type": "array",
        "items":{
            "@ondc/org/item_id": {"type": "string"},
            "@ondc/org/item_quantity": {
                "type": "object",
                "required": ["count"],
                "properties": {
                    "count": {"type": "string"},
                },
            },
            "title": {"type": "string"},
            "@ondc/org/title_type": {"type": "string"},
            "price": {"$ref": "/confirmPrice"},   
            "item":{
                "type":"object",
                 "properties":{
                    "price": {"$ref": "/confirmPrice"},  
                 }
            }

        }
        },
    "ttl": {"type": "string"},
   
    }
};

const collected_by = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": {"type": "string", enum : Object.keys(PAYMENT_COLLECTED_BY)}             
}
}


const confirmPayment = {
"id": "/confirmPayment",
"type": "object",
"required": ["uri", "tl_method", "params", "type", "collected_by",
    "@ondc/org/buyer_app_finder_fee_type",
    "@ondc/org/buyer_app_finder_fee_amount",
    // "@ondc/org/@ondc/org/withholding_amount",
    // "@ondc/org/return_window",
    // "@ondc/org/settlement_basis",
    // "@ondc/org/settlement_window",
    // "@ondc/org/buyer_app_finder_fee_amount",
    "@ondc/org/settlement_details"
    ],
"properties": {
    "uri": {"type": "string"},
    "tl_method": {"type": "string"},
    "params": {
        "type": "object",
        "required": ["currency", "transaction_id", "amount"],
        "properties": {
            "currency":{"type": "string"},
            "transaction_id":{"type": "string"},
            "amount":{"type": "string"}
        }
    },
    "status": status,
    "type": {"type": "string"},
    "collected_by": collected_by,
    "@ondc/org/buyer_app_finder_fee_type": finder_fee_type,
    "@ondc/org/buyer_app_finder_fee_amount": {"type": "string"},
    // "@ondc/org/@ondc/org/withholding_amount": {"type": "string"},
    // "@ondc/org/return_window": {"type": "string"},
    // "@ondc/org/settlement_basis": {"type": "string"},
    // "@ondc/org/settlement_window": {"type": "string"},
    // "@ondc/org/buyer_app_finder_fee_amount": {"type": "string"},
    "@ondc/org/settlement_details": {
        "type": "array",
        "item":{
            "settlement_counterparty":{"type": "string"},
            "settlement_phase":{"type": "string"},
            "settlement_type":{"type": "string"},
            "upi_address":{"type": "string"},
            "settlement_bank_account_no":{"type": "string"},
            "settlement_ifsc_code":{"type": "string"},
            "beneficiary_name":{"type": "string"},
            "bank_name":{"type": "string"},
            "branch_name":{"type": "string"}
        }
    },
    }
};

const confirmMessage = {
"id": "/confirmMessage",
"type": "object",
"required": ["order"],
"additionalProperties": true,    
"properties": {
    "order": {
        "type": "object",
        "required": ["id", "state", "provider", "items", "billing", "fulfillments", "quote", "payment", "created_at", "updated_at"],
        "properties": {
            "id": {"type": "string"},
            "state": order_state,
            "provider": {"$ref": "/confirmProvider"},
            "items": {"$ref": "/confirmItems"},
            "billing": {"$ref": "/confirmBilling"},
            "fulfillments": {"$ref": "/confirmFulfillments"},
            "quote": {"$ref": "/confirmQuote"},
            "payment": {"$ref": "/confirmPayment"},
            "created_at": {"type": "string"},
            "updated_at": {"type": "string"},
    },
    }
}
};

const confirm = {
"id": "/confirm",
"type": "object",
"properties": {
    "context": {"$ref": "/confirmContext"},
    "message": {"$ref": "/confirmMessage"},
    }
};
export { confirmContext, confirmMessage, confirm, confirmPayment, confirmQuote, confirmPrice, confirmFulfillments, confirmEnd, confirmBilling, confirmItems, confirmProvider};