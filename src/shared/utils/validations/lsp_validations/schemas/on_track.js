const ontrackContext = {
  "id": "/ontrackContext",
  "type": "object",
  "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
  "additionalProperties": true,
  "properties": {
    "domain": { "enum": ["nic2004:60232"] },
    "action": { "enum": ["on_track"] },
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

const ontrackMessage = {
  "id": "/ontrackMessage",
  "type": "object",
  "required": ["tracking"],
  "additionalProperties": true,
  "properties": {
    "tracking": {
      "type": "object",
      "required": ["url", "status"],
      "additionalProperties": true,
      "properties": {
        "url": { "type": "string" },
        "status": { "enum": ["active", "inactive"] }
      }
    }
  }
};

const ontrackValidation = {
  "id": "/ontrack",
  "type": "object",
  "properties": {
    "context": { "$ref": "/ontrackContext" },
    "message": { "$ref": "/ontrackMessage" },
  }
};
export { ontrackContext, ontrackMessage, ontrackValidation };