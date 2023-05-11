const cancelContext = {
    "id": "/cancelContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "country": {"type": "string"},
        "city": {"type": "string"},
        "action": {"enum": [ "cancel" ]},
        "core_version": {"type": "string"},
        "bap_id": {"type": "string"},
        "bap_uri": {"type": "string"},
        "bpp_id": {"type": "string"},
        "bpp_uri": {"type": "string"},
        "transaction_id": {"type": "string"},
        "message_id": {"type": "string"},
        "timestamp": {"type": "string"},
        "ttl": {"type": "string"},
      }
  };
  
  const cancelMessage = {
    "id": "/cancelMessage",
    "type": "object",
    "required": ["order_id", "cancellation_reason_id"],
    "additionalProperties": true,    
  
    "properties": {
        "order_id":  {"type": "string"},
        "cancellation_reason_id":  {"type": "string"},
    }
  };
  
  const cancelValidation = {
    "id": "/cancel",
    "type": "object",
    "properties": {
        "context": {"$ref": "/cancelContext"},
        "message": {"$ref": "/cancelMessage"},
      }
  };
  
  export  { cancelContext, cancelMessage, cancelValidation}