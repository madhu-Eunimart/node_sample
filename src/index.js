#!/usr/bin/env node
import { Config } from "./buyer/config/config.js";
import dotenv from 'dotenv'
import { eventEmitter } from "./emitter/emitter.js";
import Order from "./api_methods/order.js";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

dotenv.config();


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

try {
    const dbPort = 8081
    var server = app.listen(dbPort, () => {
      console.info(`Listening on port ${dbPort}`);
    });
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
  app.use(cors());
class Eunimart {
  constructor(key_id, secret_key) {
    this.key_id = key_id
    this.secret_key = secret_key
    this.config = new Config(key_id, secret_key)
    this.order = new Order(key_id, secret_key)
    this.emitter = eventEmitter
  }
  Config(config) {
    // this.config.DbConfig(data.uri)
    this.config.SdkConfig(config)
  }
  Router() {
    return this.config.RouterExport()
  }
}
// var bap=new Eunimart("eunimart_DSah67jgadh","KSJIPWBjda123jHOSPfhspeqjhrwqwlmm")
// var inputData = {
//   "uri": "mongodb+srv://madhu_123:madhu@cluster0.4ra5aa2.mongodb.net/ondc_local",
//   "BPP_ID": "ondc.eunimart.com",
//   "HOST_URL": "http://localhost:8081/eunimart_bap/",
//   "BAP_URL": "https://7cf6-2401-4900-4e2f-d592-b7dc-e4de-1f82-397d.in.ngrok.io/eunimart_bap",
//   "REGISTRY_BASE_URL": "https://prod.registry.ondc.org/", //*
//   "BAP_FINDER_FEE_TYPE": "percent",
//   "BAP_FINDER_FEE_AMOUNT": 2,
//   "DOMAIN": "nic2004:52110",
//   "COUNTRY": "IND",
//   "CITY": "std:080",
//   "TTL": "P1M",
//   "JWT_SECRET": "secretkey",
//   "BG_ID": "prod.gateway.ondc.org",
//   "BAP_ID": "ondc.eunimart.com",
//   "BAP_UNIQUE_KEY_ID": "70edf422-4fcf-4aa8-b3b0-f18671c1e724",//signin public and private , unique
//   "BAP_PRIVATE_KEY": "yNVrBBM+oAOWOEcXPFjJuvXXpUq/4XR1KuSGX/i+slF+oE/geu2uW25PXjfWS9pwjmTry3WXn7q0DH7I+vNSjw==",
//   "ENCRYPTION_PRIVATE_KEY":"MFECAQEwBQYDK2VuBCIEIEiwzlIarl07ZbiJe5XXvUsEJHRTT2t3jQL5/b80hTFfgSEALfEi/Z+NwEJD/jx/32qGi6Y+v4w9uGRcA3T8Rwe+SHM=",
// "ENCRYPTION_PUBLIC_KEY":"MCowBQYDK2VuAyEALfEi/Z+NwEJD/jx/32qGi6Y+v4w9uGRcA3T8Rwe+SHM=",//*
//   "BPP_URL": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
//   "BPP_UNIQUE_KEY_ID": "70edf422-4fcf-4aa8-b3b0-f18671c1e724",
//   "BPP_PRIVATE_KEY": "yNVrBBM+oAOWOEcXPFjJuvXXpUq/4XR1KuSGX/i+slF+oE/geu2uW25PXjfWS9pwjmTry3WXn7q0DH7I+vNSjw==",
//   "BPP_AUTH": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjMsIlVzZXJuYW1lIjoiYnBwX2FkbWluQGV1bmltYXJ0LmNvbSIsImFjY2Vzc190ZW1wbGF0ZV9pZCI6MTMsImNvbXBhbnlfaWQiOjEsImV4cCI6MTY5ODgyNjYxNCwiZmlyc3RfbmFtZSI6IkJQUCIsImxhc3RfbmFtZSI6IkFkbWluIiwicm9sZV9pZCI6bnVsbCwidXNlcl90eXBlcyI6W3siaWQiOjU2OCwibmFtZSI6IkJQUF9BRE1JTiJ9XX0.NatEooWE23QrOAvcMva57hB2_JzboXA_iPbQFKp_xgs",
//   "PROTOCOL_BASE_URL": "https://prod.gateway.ondc.org/",
//   "EUNIMART_CORE_HOST": "https://adya-backend-prod.eunimart.com/",
//   "USER_COMPANY_DETAILS_BASE_PATH": "/api/v1/core/company_preferences/"
// }
// var config=[
// 	{
// 		"subscriber_id": "https://mock_bpp1.com/",
// 		"keyid": "buyer",
// 		"BAP_URL":"https://7cf6-2401-4900-4e2f-d592-b7dc-e4de-1f82-397d.in.ngrok.io/eunimart_bap",
// 		"HOST_URL": "http://localhost:8081/eunimart_bap/",
// 		"BAP_ID": "ondc.eunimart.com",
// 		"BAP_UNIQUE_KEY_ID": "70edf422-4fcf-4aa8-b3b0-f18671c1e724",
// 		"BAP_PRIVATE_KEY": "yNVrBBM+oAOWOEcXPFjJuvXXpUq/4XR1KuSGX/i+slF+oE/geu2uW25PXjfWS9pwjmTry3WXn7q0DH7I+vNSjw==",
// 		"signing": {
// 			"certificate_used": false,
// 			"certificate_type": "",
// 			"certificate_alias": "",
// 			"certificate_path": "",
// 			"certificate_pwd": "",
// 			"private_key": "cDs6yVU5VpAVCe9MCtHUf/muUKok287sgJkJvsuL/5Q="
// 		},
// 		"api": [
// 			{
// 				"name": "search",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/search",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "select",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/select",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "cancel",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/cancel",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "confirm",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/confirm",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "init",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/init",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "rating",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/rating",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "status",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/status",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "support",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/support",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "track",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/track",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "update",
// 				"http_entity_endpoint": "http://localhost:8081/eunimart_bap/update",
// 				"http_timeout": 8000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": true
// 			},
// 			{
// 				"name": "lookup",
// 				"http_entity_endpoint": "https://pilot-gateway-1.beckn.nsdl.co.in/lookup",
// 				"http_timeout": 9000,
// 				"http_retry_count": 0,
// 				"header_validity": 600000,
// 				"header_authentication": true,
// 				"set_authorization_header": false
// 			}
// 		]
// 	}]
// bap.Config(config)
// app.use("/eunimart_bap", cors(),bap.Router());
// const test=async()=>{

// await bap.order.Search(
//   {
//     "context": {
// 		"domain":"nic2004:52110",
// 		"action":"search",
// 		"country":"IND",
//     	"ttl":"PT30S",
// 		"bap_id":"ondc.eunimart.com",
// 		"bap_uri": "https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap",
//     },
//     "city": "Hyderabad",
//       "state": "Telangana",
//         "search_string": "shirt",
//         "delivery_location": "17.385044,78.486671",
//         "area_code": "",
//         "buyer_app_finder_fee_type": "percent",
//         "buyer_app_finder_fee_amount": "3"
// },async function(data,err){
//     bap.emitter.on(data?.context?.message_id,function(data){
//       console.log("events captured-------------->",data)
//     })
//     console.log(data,err)
//   })




//   await bap.order.Select(
// 	{
// 		"context":
// 		{
// 		  "domain":"nic2004:52110",
// 		  "action":"select",
// 		  "core_version":"1.1.0",
// 		  "bap_id":"ondc.eunimart.com",
// 		  "bap_uri":"https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap",
// 		  "bpp_id"	:	"ondc.eunimart.com",
// 		  "bpp_uri"	:	"https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
// 		  "transaction_id":"39abe4d4-7892-467c-930d-7814304db23a",
// 		  "message_id":"cb661253-8480-4c07-b2cf-0167cad264f3",
// 		  "city":"std:040",
// 		  "country":"IND",
// 		  "timestamp":"2023-05-18T08:25:40.533Z",
// 		  "ttl": "PT30S"
// 		},
	
// 	"provider_id":"SIVA-ONDC-STORE-974",
// 	"locations":
// 	[
// 	  {    
// 		"id":"SIVA-ONDC-STORE-974-LOC-1"
// 	  }
// 	]
// 	,
// 	"items":
// 	[
// 	{
// 	  "id":"BMV1234",
// 	  "location_id":"SIVA-ONDC-STORE-974-LOC-1",
// 	  "quantity":
// 	  {
// 		"count": 1
// 	  }
// 	}
// 	],
// 	"fulfillments":
// 	[{
	
// 		  "gps":"17.385044,78.486671",
// 			"area_code":""
// 	}
// 	],
// 	// "tags":
	
// 	// [
// 	//   {
// 	// 	"code":"buyer_id",
// 	// 	"list":
// 	// 	[
// 	// 	  {
// 	// 		"code":"buyer_id_code",
// 	// 		"value":"gst"
// 	// 	  },
// 	// 	  {
// 	// 		"code":"buyer_id_no",
// 	// 		"value":"xxxxxxxxxxxxxxx"
// 	// 	  }
// 	// 	]
// 	//   }
// 	// ]
// 	},async function(data,err){
// 	  bap.emitter.on(data?.context?.message_id,function(data){
// 		console.log("events captured-------------->",data)
// 	  })
// 	  console.log(data,err)
// 	})


// await bap.order.Init({"context":{"domain":"nic2004:52110","country":"IND","city":"std:040","action":"init","core_version":"1.1.0","bap_id":"ondc.eunimart.com","bap_uri":"https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap","transaction_id":"b2c79bd3-f94d-45a6-a485-777807361ebc","ttl":"PT30S","message_id":"a8569f37-a542-4709-a975-2c3f3ae1f680","timestamp":"2023-05-18T09:34:43.380Z","bpp_id":"ondc.eunimart.com","bpp_uri":"https://4a41-27-6-77-58.ngrok-free.app/eunimart_bpp"},"message":{"order":{"provider":{"id":"SIVA-ONDC-STORE-974","locations":[{"id":"SIVA-ONDC-STORE-974-LOC-1"}]},"items":[{"id":"BMV1234","quantity":{"count":1},"fulfillment_id":"ON_NETWORK_LOGISTICS_FULFILLMENT-1"}],"billing":{"address":{"name":"Bhavana","locality":"meeseva","building":"kanithi, meeseva","city":"Visakhapatnam","state":"Andhra Pradesh","country":"India","area_code":"530046"},"phone":"8790729941","name":"Bhavana","email":"bhavana@gmail.com","created_at":"2023-05-18T09:34:43.380Z","updated_at":"2023-05-18T09:34:43.380Z"},"fulfillments":[{"id":"ON_NETWORK_LOGISTICS_FULFILLMENT-1","end":{"location":{"address":{"building":"kanithi","name":"Bhavana","locality":"meeseva","city":"Visakhapatnam","state":"Andhra Pradesh","country":"India","area_code":"530046"},"gps":"17.6904547,83.164945"},"contact":{"phone":"8790729941"}},"type":"Delivery"}]}}},
// async function(data,err){
// 		  bap.emitter.on(data?.context?.message_id,function(data){
// 			console.log("events captured-------------->",data)
// 		  })
// 		  console.log(data,err)
// 		})



// with method
// await bap.order.Init({"context":{"domain":"nic2004:52110","country":"IND","city":"std:040","action":"init","core_version":"1.1.0","bap_id":"ondc.eunimart.com","bap_uri":"https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap","transaction_id":"39abe4d4-7892-467c-930d-7814304db23a","ttl":"PT30S","message_id":"a8569f37-a542-4709-a975-2c3f3ae1f680","timestamp":"2023-05-18T09:34:43.380Z","bpp_id":"ondc.eunimart.com","bpp_uri":"https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp"},
// "provider_id": "SIVA-ONDC-STORE-974",
// 	  "locations": [
// 		{
// 		  "id": "SIVA-ONDC-STORE-974-LOC-1"
// 		}
// 	  ],
// 	  "items": [
// 		{
// 		  "id": "BMV1234",
// 		  "quantity": {
// 			"count": 1
// 		  },
// 		  "fulfillment_id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1"
// 		}
// 	  ],
// 	  "billing_name": "Bhavana",
// 	  "billing_locality": "meeseva",
// 	  "billing_building": "kanithi, meeseva",
// 	  "billing_city": "Visakhapatnam",
// 	  "billing_state": "Andhra Pradesh",
// 	  "billing_country": "India",
// 	  "billing_area_code": "530046",
// 	  "phone": "8790729941",
// 	  "name": "Bhavana",
// 	  "email": "bhavana@gmail.com",
// 	  "created_at": "2023-05-18T09:34:43.380Z",
// 	  "updated_at": "2023-05-18T09:34:43.380Z",
// 	  "fulfillments": [
// 		{
// 		  "id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1",
// 		  "shipping_building": "kanithi",
// 		  "shipping_name": "Bhavana",
// 		  "shipping_locality": "meeseva",
// 		  "shipping_city": "Visakhapatnam",
// 		  "shipping_state": "Andhra Pradesh",
// 		  "shipping_country": "India",
// 		  "shipping_area_code": "530046",
// 		  "gps": "17.6904547,83.164945",
// 		  "shipping_phone": "8790729941",
// 		  "type": "Delivery"
// 		}
// 	  ]
// },function(data,err){
//   bap.emitter.on(data?.context?.message_id,function(data){
//     console.log("events captured-------------->",data)
//   })
// })

//   console.log(data,err)})

// await bap.order.Confirm({
//     "context":{"domain":"nic2004:52110","country":"IND","city":"std:040","action":"confirm","core_version":"1.1.0","bap_id":"ondc.eunimart.com","bap_uri":"https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap","transaction_id":"39abe4d4-7892-467c-930d-7814304db23a","ttl":"PT30S","message_id":"a2569f37-a542-4709-a975-2c3f3ae1f680","timestamp":"2023-05-18T09:34:43.380Z","bpp_id":"ondc.eunimart.com","bpp_uri":"https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp"},
//     "message": {
//         "order": {
//             "id": "39abe4d4-7892-467c-930d-7814304db23a",
//             "state": "Created",
//             "billing": {
//                 "address": {
//                   "name": "Bhavana",
//                   "locality": "meeseva",
//                   "building": "kanithi, meeseva",
//                   "city": "Visakhapatnam",
//                   "state": "Andhra Pradesh",
//                   "country": "India",
//                   "area_code": "530046"
//                 },
//                 "phone": "8790729941",
//                 "name": "madhu sdk",
//                 "email": "bhavana@gmail.com",
//                 "created_at": "2023-05-18T09:34:43.380Z",
//                 "updated_at": "2023-05-18T09:34:43.380Z"
//               },
//             "items": [
//                 {
//                     "id": "BMV1234",
//                     "quantity": {
//                         "count": 1
//                     },
//                     "fulfillment_id": "PROVIDER-FULFILLMENT-1"
//                 }
//             ],
//             "provider": {
//                 "id": "SIVA-ONDC-STORE-974",
//                 "locations": [
//                     {
//                         "id": "SIVA-ONDC-STORE-974-LOC-1"
//                     }
//                 ]
//             },
//             "payment": {
//                 "params": {
//                     "amount": "200.00",
//                     "currency": "INR",
//                     "transaction_id": "order_LJ5iVWem4lmY9A"
//                 },
//                 "status": "PAID",
//                 "type": "ON-ORDER",
//                 "collected_by": "BAP",
//                 "@ondc/org/settlement_details": [
//                     {
//                         "upi_address": "8712799171@jupiteraxis",
//                         "settlement_counterparty": "seller-app",
//                         "settlement_phase": "sale-amount",
//                         "settlement_type": "upi",
//                         "beneficiary_name": "Sridhar Kulkarni"
//                     }
//                 ],
//                 "@ondc/org/buyer_app_finder_fee_amount": "3",
//                 "@ondc/org/buyer_app_finder_fee_type": "percent"
//             },
//             "quote": {
//                 "price": {
//                   "currency": "INR",
//                   "value": "638.00"
//                 },
//                 "breakup": [
//                   {
//                     "@ondc/org/item_id": "BMV1234",
//                     "@ondc/org/item_quantity": {
//                       "count": 1
//                     },
//                     "title": "Thums up",
//                     "@ondc/org/title_type": "item",
//                     "price": {
//                       "currency": "INR",
//                       "value": "200.00"
//                     },
//                     "item": {
//                       "price": {
//                         "currency": "INR",
//                         "value": "200.00"
//                       }
//                     }
//                   },
//                   {
//                     "@ondc/org/item_id": "BMV1234",
//                     "title": "Tax",
//                     "@ondc/org/title_type": "tax",
//                     "price": {
//                       "currency": "INR",
//                       "value": "10.00"
//                     }
//                   },
//                   {
//                     "@ondc/org/item_id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1",
//                     "title": "Packing charges",
//                     "@ondc/org/title_type": "packing",
//                     "price": {
//                       "currency": "INR",
//                       "value": "15.00"
//                     }
//                   },
//                   {
//                     "@ondc/org/item_id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1",
//                     "title": "Delivery charges",
//                     "@ondc/org/title_type": "delivery",
//                     "price": {
//                       "currency": "INR",
//                       "value": "413.00"
//                     }
//                   }
//                 ],
//                 "ttl": "P1D"
//               },
//             "created_at": "2023-02-21T12:17:18.929Z",
//             "updated_at": "2023-02-21T12:17:18.929Z",
//             "fulfillments": [
//                 {
//                     "id": "PROVIDER-FULFILLMENT-1",
//                     "end": {
//                         "location": {
//                             "address": {
//                                 "building": "kanithi",
//                                 "name": "Bhavana",
//                                 "locality": "meeseva",
//                                 "city": "Visakhapatnam",
//                                 "state": "Andhra Pradesh",
//                                 "country": "India",
//                                 "area_code": "530046"
//                             },
//                             "gps": "17.6904547,83.164945"
//                         },
//                         "contact": {
//                             "phone": "7569316632",
//                             "email": "saira@yahoo.com"
//                         },
//                         "person": {
//                             "name": "Saira Bhanu Shaik"
//                         }
//                     },
//                     "type": "Delivery",
//                     "tracking": false
//                 }
//             ]
//         }
//     }
// },async function(data,err){
// 			  bap.emitter.on(data?.context?.message_id,function(data){
// 				console.log("events captured-------------->",data)
// 			  })
// 			  console.log(data,err)
// 			})
// }


/// with method
// await bap.order.Confirm({
// 	"context":{"domain":"nic2004:52110","country":"IND","city":"std:040","action":"confirm","core_version":"1.1.0","bap_id":"ondc.eunimart.com","bap_uri":"https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap","transaction_id":"39abe4d4-7892-467c-930d-7814304db23a","ttl":"PT30S","message_id":"a2569f37-a542-4709-a975-2c3f3ae1f680","timestamp":"2023-05-18T09:34:43.380Z","bpp_id":"ondc.eunimart.com","bpp_uri":"https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp"},
//     "id": "39abe4d4-7892-467c-930d-7814304db23a",
//     "state": "Created",
//     "billing_name": "Bhavana",
//     "billing_locality": "meeseva",
//     "billing_building": "kanithi, meeseva",
//     "billing_city": "Visakhapatnam",
//     "billing_state": "Andhra Pradesh",
//     "billing_country": "India",
//     "billing_area_code": "530046",
//     "billing_phone": "8790729941",
//     "billing_email": "bhavana@gmail.com",
//     "billing_created_at": "2023-05-18T09:34:43.380Z",
//     "billing_updated_at": "2023-05-18T09:34:43.380Z",
//     "items": [
//       {
//         "id": "BMV1234",
//         "quantity": {
//           "count": 1
//         },
//         "fulfillment_id": "PROVIDER-FULFILLMENT-1"
//       }
//     ],
//     "provider_id": "SIVA-ONDC-STORE-974",
//     "locations": [
//       {
//         "id": "SIVA-ONDC-STORE-974-LOC-1"
//       }
//     ],
//     "amount": "200.00",
//     "currency": "INR",
//     "transaction_id": "order_LJ5iVWem4lmY9A",
//     "payment_status": "PAID",
//     "payment_type": "ON-ORDER",
//     "payment_collected_by": "BAP",
//     "settlement_details": [
//       {
//         "upi_address": "8712799171@jupiteraxis",
//         "settlement_counterparty": "seller-app",
//         "settlement_phase": "sale-amount",
//         "settlement_type": "upi",
//         "beneficiary_name": "Sridhar Kulkarni"
//       }
//     ],
//     "buyer_app_finder_fee_amount": "2",
//     "buyer_app_finder_fee_type": "percent",
//     "quote": {
//       "price": {
//         "currency": "INR",
//         "value": "638.00"
//       },
//       "breakup": [
//         {
//           "item_id": "BMV1234",
//           "item_quantity": {
//             "count": 1
//           },
//           "title": "Thums up",
//           "title_type": "item",
//           "price": {
//             "currency": "INR",
//             "value": "200.00"
//           },
//           "item": {
//             "price": {
//               "currency": "INR",
//               "value": "200.00"
//             }
//           }
//         },
//         {
//           "item_id": "BMV1234",
//           "title": "Tax",
//           "title_type": "tax",
//           "price": {
//             "currency": "INR",
//             "value": "10.00"
//           }
//         },
//         {
//           "item_id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1",
//           "title": "Packing charges",
//           "title_type": "packing",
//           "price": {
//             "currency": "INR",
//             "value": "15.00"
//           }
//         },
//         {
//           "item_id": "ON_NETWORK_LOGISTICS_FULFILLMENT-1",
//           "title": "Delivery charges",
//           "title_type": "delivery",
//           "price": {
//             "currency": "INR",
//             "value": "413.00"
//           }
//         }
//       ],
//       "ttl": "P1D"
//     },
//     "order_created_at": "2023-02-21T12:17:18.929Z",
//     "order_updated_at": "2023-02-21T12:17:18.929Z",
//     "fulfillments": [
//       {
//         "id": "PROVIDER-FULFILLMENT-1",
//         "shipping_building": "kanithi",
//         "shipping_name": "Bhavana",
//         "shipping_locality": "meeseva",
//         "shipping_city": "Visakhapatnam",
//         "shipping_state": "Andhra Pradesh",
//         "shipping_country": "India",
//         "shipping_area_code": "530046",
//         "gps": "17.6904547,83.164945",
//         "shipping_phone": "7569316632",
//         "shipping_email": "saira@yahoo.com",
//         "delivery_person_name": "Saira Bhanu Shaik",
//         "type": "Delivery",
//         "tracking": false
//       }
//     ]
//   },function(data,err){
// 	bap.emitter.on(data?.context?.message_id,function(data){
// 						console.log("events captured-------------->",data)
// 					  })
// 					  console.log(data,err)
// 					})
// await bap.order.Status({
//     "context": {
//         "domain": "nic2004:52110",
//         "country": "IND",
//         "city": "std:08572",
//         "action": "status",
//         "core_version": "1.1.0",
//         "bap_id": "ondc.eunimart.com",
//         "bap_uri": "https://6d8c-2401-4900-4e19-5326-9b5f-7db5-4eb5-852.in.ngrok.io/eunimart_bap/",
//         "transaction_id": "bc457afd-3def-4e9a-9fc6-19bb07097a9b",
//         "ttl": "PT30S",
//         "message_id": "50da2637-efde-49bc-b421-5d7c1edd164c",
//         "timestamp": "2023-02-21T12:27:06.262Z",
//         "bpp_id": "ondc.eunimart.com",
//         "bpp_uri": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp/"
//     },
//     "message": {
//         "order_id": "b2c79bd3-f94d-45a6-a485-777807361ebc"
//     }
// },function(data,err){
// 	bap.emitter.on(data?.context?.message_id,function(data){
// 						console.log("events captured-------------->",data)
// 					  })
// })

// test()
export default Eunimart;
