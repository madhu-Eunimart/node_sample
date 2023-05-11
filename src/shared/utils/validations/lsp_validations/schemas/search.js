const searchContext = {
    "id":"/searchContext",
    "type":"object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "ttl"],
    "additionalProperties": true,    
    "properties": {
        "domain": {"type": "string"},
        "action": {"enum": [ "search" ]},
        "country": {"type": "string"},
        "city": {"type": "string"},
        "core_version": {"type": "string"},
        "bap_id": {"type": "string"},
        "bap_uri": {"type": "string"},
        "transaction_id": {"type": "string"},
        "message_id": {"type": "string"},
        "timestamp": {"type": "string"},
        "ttl": {"type": "string"},
      }
};

const searchMessage ={
    "id": "/searchMessage",
    "type": "object",
    "required": ["intent"],
    "additionalProperties": true,
    "properties": {
        "intent": {
            "type": "object",
            "required": ["category", "provider", "fulfillment", "payment","@ondc/org/payload_details"],
            "properties": {
                "category": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id":{"type": "string"}
                    }
                },
                "provider": {
                    "type": "object",
                    "required": ["time"],
                    "properties": {
                        "time": {
                            "type": "object",
                            "required": ["days"],
                            "properties": {
                                "days": {"type": "string"},
                                "schemas": {"type": "object"},
                                "range": {"type": "object"}
                            }
                        }
                    }
                },
                "payment": {
                    "type": "object",
                    "required": ["@ondc/org/collection_amount"],
                    "properties": {
                        "@ondc/org/collection_amount":{"type": "string"}
                    }
                },
                "@ondc/org/payload_details":{
                    "type": "object",
                    "required": ["category", "value", "weight","dimensions"],
                    "properties": {
                        "weight": {
                            "type": "object",
                            "required": ["value", "unit"],
                            "properties": {
                                "value": {"type": "number"},
                                "unit": {"type": "string"},
                            }
                        },
                        "dimensions":{
                            "type": "object",
                            "required": ["breadth", "length","height"],
                            "properties": {
                                "breadth":{
                                    "type": "object",
                                    "required": ["value", "unit"],
                                    "properties": {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"},
                                    }
                                },
                                "length":{
                                    "type": "object",
                                    "required": ["value", "unit"],
                                    "properties": {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"},
                                    }
                                },
                                "height":{
                                    "type": "object",
                                    "required": ["value", "unit"],
                                    "properties": {
                                        "value": {"type": "number"},
                                        "unit": {"type": "string"},
                                    }
                                }
                            }
                        },
                        "category":{ "type": "string"},
                        "value":{
                            "currency": {"type": "string"},
                            "value": {"type": "string"}
                        }
                    }
                }
            }
        }
    }
};

const searchValidation = {
    "id":"/searchValidation",
    "type" : "object",
    "properties" : {
        "context": {"$ref":"/searchContext"},
        "message": {"$ref":"/searchMessage"},
    }
}

export {
    searchValidation, 
    searchContext,
    searchMessage
};