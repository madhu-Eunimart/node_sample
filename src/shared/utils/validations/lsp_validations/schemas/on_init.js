const oninitContext = {
    "id": "/oninitContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,
    "properties": {
        "domain": { "enum": ["nic2004:60232"] },
        "action": { "enum": ["on_init"] },
        "country": { "type": "string" },
        "city": { "type": "string" },
        "core_version": { "enum": ["1.1.0"] },
        "bap_id": { "enum": ["ondc.eunimart.com"] },
        "bap_uri": { "type": "string" },
        "bpp_id": { "type": "string" },
        "bpp_uri": { "type": "string" },
        "transaction_id": { "type": "string" },
        "message_id": { "type": "string" },
        "timestamp": { "type": "string" },
    }
};

const oninitMessage = {
    "id": "/oninitMessage",
    "type": "object",
    "required": ["order"],
    "additionalProperties": true,
    "properties": {
        "order": {
            "type": "object",
            "required": ["provider", "items", "quote","payment"],
            "properties": {
                "provider": {
                    "type": "object",
                    "required": ["id"],
                    "properties": {
                        "id": { "type": "string" },
                    }
                },
                "items": {
                    "type": "array",
                    "items": {
                        "properties": {
                            "id": { "type": "string" },
                        },
                        "required": ["id"],
                    }
                },
                "quote": {
                    "type": "object",
                    "required": ["price", "breakup"],
                    "properties": {
                        "price": {
                            "type": "object",
                            "required": ["currency", "value"],
                            "properties": {
                                "currency": { "type": "string" },
                                "value": { "type": "string" },
                            }
                        },
                        "breakup": {
                            "type": "array",
                            "items": {
                                "properties": {
                                    "@ondc/org/item_id": { "type": "string" },
                                    "@ondc/org/title_type": { "type": "string" },
                                    "price": {
                                        "type": "object",
                                        "required": ["currency", "value"],
                                        "properties": {
                                            "currency": { "type": "string" },
                                            "value": { "type": "string" },
                                        }
                                    }
                                },
                                "required": ["@ondc/org/item_id", "@ondc/org/title_type", "price"]
                            }
                        }
                    }
                },
                "payment": {
                    "type": "object",
                      "required": ["collected_by", "type"],
                        "properties": {
                      "collected_by": { "type": "string" },
                      "type": { "enum": ["ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER"] }
          
                    }
                  }
            }
        },
    }
};

const oninitValidation = {
    "id": "/oninit",
    "type": "object",
    "properties": {
        "context": { "$ref": "/oninitContext" },
        "message": { "$ref": "/oninitMessage" },
    }
};

export { oninitContext, oninitMessage, oninitValidation }