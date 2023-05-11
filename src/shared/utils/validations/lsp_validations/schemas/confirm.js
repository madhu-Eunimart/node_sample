const confirmContext = {
    "id":"/confirmContext",
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

const confirmMessage ={
    "id": "/confirmMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["id","state"],
            "properties": {
                "id": {"type": "string"},
                "state": {"type": "string"},
            }
        }
    }
};

const confirmValidation = {
    "id":"/searchValidation",
    "type" : "object",
    "properties" : {
        "context": {"$ref":"/confirmContext"},
        "message": {"$ref":"/confirmMessage"},
    }
}

export {
    confirmValidation, 
    confirmContext,
    confirmMessage
};