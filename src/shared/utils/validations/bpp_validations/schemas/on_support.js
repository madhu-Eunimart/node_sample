const onSupportContext = {
    "id": "/onSupportContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "on_support" ]},
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
  

  const onSupportMessage = {
    "id": "/onSupportMessage",
    "type": "object",
    "required": ["phone", "email", "uri"],
    "additionalProperties": true,    
    "properties": {
        "phone": {"type": "string"},
        "email": {"type": "string"},
        "uri": {"type": "string"},
    }
};
  
const onSupport = {
    "id": "/onSupport",
    "type": "object",
    "properties": {
        "context": {"$ref": "/onSupportContext"},
        "message": {"$ref": "/onSupportMessage"},
      }
  };
  
  export  { onSupportContext, onSupportMessage, onSupport};