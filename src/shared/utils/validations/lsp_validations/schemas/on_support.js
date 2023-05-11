const onsupportContext = {
    "id": "/onsupportContext",
    "type": "object",
    "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
    "additionalProperties": true,
    "properties": {
        "domain": { "enum": ["nic2004:60232"] },
        "action": { "enum": ["on_support"] },
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

const onsupportMessage = {
    "id": "/onsupportMessage",
    "type": "object",
    "required": ["phone", "email", "uri"],
    "additionalProperties": true,
    "properties": {
        "phone": { "type": "string" },
        "email": { "type": "string" },
        "uri": { "type": "string" },
    }
};

const onsupportValidation = {
    "id": "/onsupport",
    "type": "object",
    "properties": {
        "context": { "$ref": "/onsupportContext" },
        "message": { "$ref": "/onsupportMessage" },
    }
};

export { onsupportContext, onsupportMessage, onsupportValidation };