const onTrackContext = {
    "id": "/onTrackContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "on_track" ]},
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
  

  const onTrackMessage = {
    "id": "/onTrackMessage",
    "type": "object",
    "required": ["url", "status"],
    "additionalProperties": true,    
    "properties": {
        "url": {"type": "string"},
        "status": {"type": "string"},
        }
};
  
const onTrack = {
    "id": "/onTrack",
    "type": "object",
    "properties": {
        "context": {"$ref": "/onTrackContext"},
        "message": {"$ref": "/onTrackMessage"},
      }
  };

export  { onTrackContext, onTrackMessage, onTrack};