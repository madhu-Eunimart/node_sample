const onstatusContext = {
  "id": "/onstatusContext",
  "type": "object",
  "required": ["domain", "action", "country", "city", "core_version", "bap_id", "bap_uri", "transaction_id", "message_id", "timestamp", "bpp_id", "bpp_uri"],
  "additionalProperties": true,
  "properties": {
    "domain": { "enum": ["nic2004:60232"] },
    "action": { "enum": ["on_status"] },
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

const onstatusMessage = {
  "id": "/onstatusMessage",
  "type": "object",
  "required": ["order"],
  "additionalProperties": true,
  "properties": {
    "order": {
      "type": "object",
      "required": ["id", "state", "fulfillments"],
      "properties": {
        "id": { "type": "string" },
        "state": { "enum": ["Created", "Accepted", "In-progress", "Completed", "Cancelled"] },
        "provider": {
          "type": "object",
          "required": ["id"],
          "properties": {
            "id": { "type": "string" },
            "locations": {
              "type": "array",
              "items": {
                "properties": {
                  "id": { "type": "string" },
                },
                "required": ["id"],
              }
            }
          }
        },
        "items": {
          "type": "array",
          "items": {
            "properties": {
              "id": { "type": "string" },
              "category_id": { "type": "string" },
              "descriptor": {
                "type": "object",
                "required": ["code"],
                "properties": {
                  "code": { "enum": ["P2P", "P2H2P"] }
                }
              }
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
                "required": ["@ondc/org/title_type", "price"]
              }
            }
          }
        },
        "fulfillments": {
          "type": "array",
          "items": {
            "properties": {
              "id": { "type": "string" },
              "type": { "enum": ["Prepaid", "CoD", "RTO", "Reverse QC"] },
              "@ondc/org/awb_no": { "type": "string" },
              "start": {
                "type": "object",
                "properties": {
                  "time": {
                    "type": "object",
                    "required": ["range"],
                    "properties": {
                      "range": {
                        "type": "object",
                        "required": ["start", "end"],
                        "properties": {
                          "start": { "type": "string" },
                          "end": { "type": "string" },
                        }
                      }
                    }
                  }
                }
              },
              "end": {
                "type": "object",
                "properties": {
                  "time": {
                    "type": "object",
                    "required": ["range"],
                    "properties": {
                      "range": {
                        "type": "object",
                        "required": ["start", "end"],
                        "properties": {
                          "start": { "type": "string" },
                          "end": { "type": "string" },
                        }
                      }
                    }
                  }
                }
              },
              "@ondc/org/ewaybillno": { "type": "string" },
              "@ondc/org/ebnexpirydate": { "type": "string" },
              "state": {
                "type": "object",
                "required": ["descriptor"],
                "properties": {
                  "descriptor": {
                    "type": "object",
                    "required": ["code"],
                    "properties": {
                      "code": { "enum": ["Pending", "Searching-for-Agent", "Agent-assigned", "Order-picked-up", "Out-for-delivery", "Order-delivered", "RTO-Initiated", "RTO-Delivered", "RTO-Disposed", "Cancelled"] },
                    }
                  }
                }
              },
              "tracking": { "type": "boolean" },
              "tags": {
                "cancellation_reason_id": { "type": "string" },
                "AWB no": { "type": "string" },
              }
            },
            "required": ["type", "state"],
          }
        },
        "billing": {
          "type": "object",
          "required": ["name", "address", "tax_number", "phone"],
          "properties": {
            "name": { "type": "string" },
            "address": {
              "type": "object",
              "required": ["name", "building", "locality", "city", "state", "country", "area_code"],
              "properties": {
                "name": { "type": "string" },
                "building": { "type": "string" },
                "locality": { "type": "string" },
                "city": { "type": "string" },
                "state": { "type": "string" },
                "country": { "type": "string" },
                "area_code": { "type": "string" },
              }
            },
            "tax_number": { "type": "string" },
            "phone": { "type": "string" },
            "email": { "type": "string" },
            "created_at": { "type": "string" },
            "updated_at": { "type": "string" },
          }
        },
        "payment": {
          "type": "object",
          "required": ["collected_by", "type"],
          "properties": {
            "collected_by": { "type": "string" },
            "type": { "enum": ["ON-FULFILLMENT", "POST-FULFILLMENT", "ON-ORDER"] },
            "@ondc/org/settlement_details": { "type": "array" },

          }
        }
      }
    }
  }
};

const onstatusValidation = {
  "id": "/onstatus",
  "type": "object",
  "properties": {
    "context": { "$ref": "/onstatusContext" },
    "message": { "$ref": "/onstatusMessage" },
  }
};

export { onstatusContext, onstatusMessage, onstatusValidation };