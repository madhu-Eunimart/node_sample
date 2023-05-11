import { RETAIL_FULFILLMENT_STATE} from "../../../buyer_enums.js";

const onCancelContext = {
  "id": "/onCancelContext",
  "type": "object",
  "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
  "additionalProperties": true,    
  "properties": {
        "domain": {"type": "string"},
        "country": {"type": "string"},
        "city": {"type": "string"},
        "action": {"enum": [ "on_cancel" ]},
        "core_version": {"type": "string"},
        "bap_id": {"type": "string"},
        "bap_uri": {"type": "string"},
        "bpp_id": {"type": "string"},
        "bpp_uri": {"type": "string"},
        "transaction_id": {"type": "string"},
        "message_id": {"type": "string"},
        "timestamp": {"type": "string"},
    }
};

const state = {
    "type": "object",
    "required": ["type"],
    "properties": {
        "type": {"type": "string", enum: Object.keys(RETAIL_FULFILLMENT_STATE)}             
}
}

const onCancelMessage = {
  "id": "/onCancelMessage",
  "type": "object",
  "required": ["order"],
  "additionalProperties": true,    

  "properties": {
      "order": {
          "type": "object",
          "required": ["id", "state", "tags"],
          "properties": {
              "tags":{
                  "type": "object",
                  "required": ["cancellation_reason_id"],
                  "properties": {
                      "cancellation_reason_id": {"type": "string"}             
                  }
              },
              "state": state,
              "id": {"type": "string"},
          },
      }
  }
};

const onCancel = {
  "id": "/onCancel",
  "type": "object",
  "properties": {
      "context": {"$ref": "/onCancelContext"},
      "message": {"$ref": "/onCancelMessage"},
    }
};

export  { onCancelContext, onCancelMessage, onCancel};