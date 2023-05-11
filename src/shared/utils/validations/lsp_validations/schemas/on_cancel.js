const oncancelContext = {
  "id": "/oncancelContext",
  "type": "object",
  "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
  "additionalProperties": true,
  "properties": {
    "domain": { "enum": ["nic2004:60232"] },
    "action": { "enum": ["on_cancel"] },
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

const oncancelMessage = {
  "id": "/oncancelMessage",
  "type": "object",
  "required": ["order"],
  "additionalProperties": true,
  "properties": {
    "order": {
      "type": "object",
      "required": ["id", "state", "fulfillments"],
      "properties": {
        "id": { "type": "string" },
        "state": { "enum": ["Cancelled"] },
        "fulfillments": {
          "type": "array",
          "items": {
            "properties": {
              "id": { "type": "string" },
              "type": { "enum": ["Prepaid", "CoD", "RTO", "Reverse QC"] },
              "state": {
                "type": "object",
                "required": ["descriptor"],
                "properties": {
                  "descriptor": {
                    "type": "object",
                    "required": ["code"],
                    "properties": {
                      "code": { "enum": ["Cancelled"] },
                    }
                  }
                }
              },
              "tags": {
                "cancellation_reason_id": { "type": "string" },
                "AWB no": { "type": "string" },
              }
            },
            "required": ["id", "type", "state"],
          }
        },
      }
    },
  }
};

const oncancelValidation = {
  "id": "/oncancel",
  "type": "object",
  "properties": {
    "context": { "$ref": "/oncancelContext" },
    "message": { "$ref": "/oncancelMessage" },
  }
};

export { oncancelContext, oncancelMessage, oncancelValidation }