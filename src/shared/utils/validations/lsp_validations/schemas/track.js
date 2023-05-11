const trackContext = {
    "id": "/trackContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "track" ]},
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
        "ttl": {"type": "string"}
      }
  };
  

const trackMessage = {
    "id": "/trackMessage",
    "type": "object",
    "required": ["order_id", "callback_url"],
    "additionalProperties": true,    
    "properties": {
        "order_id": {"type": "string"},
        "callback_url": {"type": "string"},
        }
};
  
const trackValidation = {
    "id": "/track",
    "type": "object",
    "properties": {
        "context": {"$ref": "/trackContext"},
        "message": {"$ref": "/trackMessage"},
      }
  };

export { trackContext, trackMessage, trackValidation};