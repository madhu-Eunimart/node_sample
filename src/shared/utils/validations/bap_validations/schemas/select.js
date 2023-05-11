const selectContext = {
    "id": "/selectContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "select" ]},
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
  
  const selectProvider = {
    "id": "/selectProvider",
    "type": "object",
    "required": ["id", "locations"],
    "properties": {
        "id": {"type": "string"},
        "locations": {
            "type": "array",
            "required":["id"],
            "items":{
                "id": {"type": "string"},    
            }
        }
        }
    };

    const selectItems = {
        "id": "/selectItems",
        "type": "array",
        "required":["id","location_id","quantity"],
        "items":{
            "id": {"type": "string"},
            "location_id": {"type": "string"},
            "quantity":{
                "type": "object",
                "required": ["count"],
                "properties": {
                    "count": {"type": "integer"},
                    }
                }
            }
        };

  const selectEnd ={
      "id":"/selectEnd",
      "type":"object",
      "required":["location"],
      "properties":
      {
          "location":{
               "type":"object",
               "required":["gps","address"],
               "properties":{
                  "gps":{"type":"string"},
                  "address":{
                   "type":"object",
                   "required":["area_code"],
                   "properties":{
                       "area_code":{"type":"string"}
                          }
                      }
                  }
              }
          }
  };

    const selectFulfillment={
        "id":"/selectFulfillment",
        "type":"object",
        "properties":{
            "end":{"$ref":"/selectEnd"}
        }
    }
            
    const selectMessage = {
    "id": "/selectMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,    
  
    "properties": {
        "order": {
            "type": "object",
            "required": ["provider", "items", "fulfillments"],
            "properties": {
                "provider":{"$ref": "/selectProvider"},
                "items": {"$ref":"/selectItems"},
                "fulfillments": {"$ref":"/selectFulfillment"},
                "billing":{
                    "type":"object",
                    "properties":{
                        "tax_number":{"type":"string"}
                    }
                }
            },
        },
    }
};
  
const select = {
    "id": "/select",
    "type": "object",
    "properties": {
        "context": {"$ref": "/selectContext"},
        "message": {"$ref": "/selectMessage"},
      }
  };
  
  export { selectContext, selectMessage, select, selectProvider,selectEnd,selectFulfillment,selectItems};