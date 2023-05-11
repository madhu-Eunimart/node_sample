const issueContext = {
    "id": "/issueContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "issue" ]},
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
  

  const issueMessage = {
    "id": "/issueMessage",
    "type": "object",
    "required": ["ref_id"],
    "additionalProperties": true,    
    "properties": {
        "ref_id": {"type": "string"},
        }
};
  
const issue = {
    "id": "/issue",
    "type": "object",
    "properties": {
        "context": {"$ref": "/issueContext"},
        "message": {"$ref": "/issueMessage"},
      }
  };
  
  export { issueContext, issueMessage, issue};