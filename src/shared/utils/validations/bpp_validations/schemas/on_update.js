const onUpdateContext = {
    "id": "/onUpdateContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "on_update" ]},
        "country": {"type": "string"},
        "city": {"type": "string"},
        "core_version": {"type": "string"},
        "bap_id": {"type": "string"},
        "bap_uri": {"type": "string"},
        "bpp_id": {"type": "string"},
        "bpp_uri": {"type": "string"},
        "transaction_id": {"type": "string"},
        "message_id": {"type": "string"},
        "timestamp": {"type": "string"},
        // "ttl": {"type": "string"}
      }
  };
  
  const itemOnUpdate = {
    "id":"/itemOnUpdate",
    "type":"array",
    "items":{
        "id":{"type":"string"},
        "fulfillment_id":{"type":"string"},
        "quantity":{
            "type":"object",
            "properties":{
                "count":{"type":"integer"}
            }
        }
    }
  }
  const onUpdatePrice = {
    "id": "/onUpdatePrice",
    "type": "object",
        "required": ["currency", "value"],
        "properties": {
            "currency": {"type": "string"},
            "value": {"type": "string"},
        }
}

const onUpdateQuote = {
    "id": "/onUpdateQuote",
    "type": "object",
    "required": ["price", "breakup"],
    "properties": {
        "price": {"$ref": "/onUpdatePrice"},
        "breakup":{
            "type": "array",
            "items":{
                "@ondc/org/item_id": {"type": "string"},
                "@ondc/org/item_quantity": {
                    "type": "object",
                    "required": ["count"],
                    "properties": {
                        "count": {"type": "intiger"}
                
                },
                // "title": {"type": "string"},
                "@ondc/org/title_type": {"type": "string"},
                "item":{
                    "type":"object",
                    "properties":{
                "price": {"$ref": "/onUpdatePrice"},   
                }
            }
        }
            },
            // "created_at": {"type": "string"},
            // "updated_at": {"type": "string"},
            // "end": {"$ref": "/onConfirmPayment"}
            }
            // "ttl":{"type":"string"}
        }
    };
    

const onUpdateMessage = {
    "id": "/onUpdateMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,    
    "properties": {
        // "update_target": {"type": "string"},
        "order": {
            "type":"object",
             "properties":{
                "id":{"type":"string"},
                "state":{"type":"string"},
                "items":"/itemOnUpdate",
                "quote":"/onUpdateQuote",
                "fulfilments":"/onUpdateFulfillment"

                },
            }
        }
};

  
const onUpdateFulfillment={
    "id":"/onUpdateFulfillment",
    "type":"object",
    "properties":{
        "id":{"type":"string"},
        "type":{"type":"string"},
        "state":{
            "type":"object",
            "properties":{
                "descriptor":{
                    "type":"object",
                    "properties":{
                        "code":{"type":"string"}
                    }
                }
            }
        },
        "start":{
            "type":"object",
            "properties":{
                "time":{
                    "type":"object",
                    "properties":{
                        "range":{
                            "type":"object",
                            "properties":{
                                "start":{"type":"integer"},
                                "end":{"type":"integer"}
                            }
                        }
                    }
                },
                "instructions":{
                    "short_desc":{"type":"string"},
                    "long_desc":{"type":"string"},
                    "additional_desc":{
                        "type":"object",
                        "properties":{
                            "content_type":{"type":"string"},
                            "url":{"type":"string"}
                        }
                    },
                    "images":{
                        "type":"object",
                        "properties":{
                            "images":{
                                "type":"array",
                                "items":{
                                    "0":{"type":"string"}
                                }
                            }
                        }
                    }
                }
            }
        }

    }


}
const onUpdate = {
    "id": "/onUpdate",
    "type": "object",
    "properties": {
        "context": {"$ref": "/onUpdateContext"},
        "message": {"$ref": "/onUpdateMessage"},
      }
  };
  
  export  { onUpdateContext, onUpdateMessage, onUpdate,onUpdateFulfillment,onUpdatePrice,onUpdateQuote,itemOnUpdate};