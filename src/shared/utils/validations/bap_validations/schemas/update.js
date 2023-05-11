const updateContext = {
    "id": "/updateContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "update" ]},
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


  const updateItems ={
      "id":"/updateItems",
      "type":"array",
      "items":{
        "id":{"type":"string"},
        "quantity":{
            "type":"object",
            "required":["count"],
            "properties":{
                "count":{"type":"string"}
            }
        },
         "tags":{
            "type":"object",
            "properties":{
                "update_type":{"type":"string"},
                "reason_code":{"type":"string"},
                "ttl_approval":{"type":"string"},
                "ttl_reverseqc":{"type":"string"},
                "image":{"type":"string"}
            }
         }
      }
  }

  const updateProvider={
    "id":"/updateProvider",
    "type":"object",
    "properties":{
        "id":{"type":"string"}
    }
  }

  const updatePayment={
    "id":"/updatePayment",
    "type":"object",
    "properties":{
        "@ondc/org/settlement/details":{
            "type":"object",
            "properties":{
                "settlement_counterparty":{"type":"string"},
                "settlement_phase":{"type":"string"},
                "settlement_type":{"type":"string"},
                "settlement_amount":{"type":"string"},
                "settlement_timestamp":{"type":"string"}
            }
        }
    }
  }
  

  const updateMessage = {
    "id": "/updateMessage",
    "type": "object",
    "required": ["update_target", "order"],
    "additionalProperties": true,    
    "properties": {
        "update_target": {"type": "string"},
        "order": {"type": "object"},
         "properties":{
            "id":{"type":"string"},
            "state":{"type":"string"},
            "provider": {"$ref":"/updateProvider"},
            "items":{"$ref":"/updateItems"},
            "payment": {"$ref":"/updatePayment"}
         }
        }
};
  
const update = {
    "id": "/update",
    "type": "object",
    "properties": {
        "context": {"$ref": "/updateContext"},
        "message": {"$ref": "/updateMessage"},
      }
  };
  
  export { updateContext, updateMessage, update,updateItems,updatePayment,updateProvider};