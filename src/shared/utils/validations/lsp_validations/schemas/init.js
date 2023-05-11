const initContext = {
    "id":"/initContext",
    "type":"object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "init" ]},
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
        "ttl": {"type": "string"}
      }
};

const initMessage ={
    "id": "/initMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["provider"],
            "properties": {
                "provider": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id": {"type": "string"}
                    }
                }
            }
        }
    }
};

const initValidation = {
    "id":"/searchValidation",
    "type" : "object",
    "properties" : {
        "context": {"$ref":"/initContext"},
        "message": {"$ref":"/initMessage"},
    }
}

export {
    initValidation, 
    initContext,
    initMessage
};