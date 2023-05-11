
var city=""
function SearchPayload(data){
  city=data.city
  var payload={
    context: {
        city: city,
        state: data.state,
      },
      message: {
        criteria: {
          delivery_location:data.location,
          area_code:"",
        },
        payment: {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3",
        },
      },
}
// payload.message.criteria=Object.assign(payload.message.criteria,query)
    if (data.provider_name != undefined){
      payload.message.provider_name = data.provider_name
    }
    if (data.search_string != undefined){
      payload.message.search_string = data.search_string
    }
    if (data.category_id != undefined){
      payload.message.category_id = data.category_id
    }
    return payload
   }


var Selectpayload = [
    {
        "context": {
            "transaction_id": "296bffcc-249f-49c1-905a-4bd20ba0ee6f",
            "bpp_uri": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
            "bpp_id": "ondc.eunimart.com",
            "city": "std:040"
        },
        "message": {
            "order": {
                "provider": {
                    "id": "SIVA-ONDC-STORE-1",
                    "locations": [
                        {
                            "id": "SIVA-ONDC-STORE-1-LOC-1"
                        }
                    ]
                },
                "items": [
                    {
                        "id": "LAYS_G_327",
                        "descriptor": {
                            "name": "Green Lays Potato Chips - American Style Cream & Onion Flavour",
                            "code": "1004497358414",
                            "symbol": "https://dev-api-files.s3.ap-southeast-1.amazonaws.com/application/11/MDM/Products/2022/December/20/LAYS_G_327/Lay's_Potato_Chips_-_American_Style_Cream_&_Onion_Flavour_0.png",
                            "short_desc": "Green Lays Potato Chips",
                            "long_desc": "Green Lays Potato Chips",
                            "images": [
                                "https://dev-api-files.s3.ap-southeast-1.amazonaws.com/application/11/MDM/Products/2022/December/20/LAYS_G_327/Lay's_Potato_Chips_-_American_Style_Cream_&_Onion_Flavour_0.png",
                                "https://dev-api-files.s3.ap-southeast-1.amazonaws.com/application/11/MDM/Products/2022/December/20/LAYS_G_327/Lay's_Potato_Chips_-_American_Style_Cream_&_Onion_Flavour_0.png"
                            ]
                        },
                        "quantity": 1,
                        "price": {
                            "currency": "INR",
                            "value": "20.00",
                            "maximum_value": "20.00"
                        },
                        "category_id": "Snacks & Branded Foods",
                        "fulfillment_id": "1",
                        "@ondc/org/returnable": false,
                        "@ondc/org/cancellable": true,
                        "@ondc/org/return_window": "P7D",
                        "@ondc/org/seller_pickup_return": false,
                        "@ondc/org/time_to_ship": "PT45M",
                        "@ondc/org/available_on_cod": false,
                        "@ondc/org/contact_details_consumer_care": "Siva,siva@eunimart.com,7660056798",
                        "@ondc/org/statutory_reqs_prepackaged_food": {
                            "additives_info": "Potato, Edible Vegetable Oil (Palmolein, Rice Bran Oil), *Seasoning (Sugar, Iodized Salt, Milk Solids, ~Spiced And Condiments, Maltodextrin, Flavour (Natural And Nature Identical Flavouring Substances), Cheese Powder, Hydrolysed Vegetable Protein, Flavour Enhancers (627, 631), Edible Vegetable Oil (Palm, Coconut), Anticaking Agent (551). *As Flavouring Agent. ~Contains Onion.",
                            "brand_owner_FSSAI_license_no": "10014064000435",
                            "importer_FSSAI_license_no": "10014064000435",
                            "nutritional_info": "Potato, Edible Vegetable Oil (Palmolein, Rice Bran Oil), *Seasoning (Sugar, Iodized Salt, Milk Solids, ~Spiced And Condiments, Maltodextrin, Flavour (Natural And Nature Identical Flavouring Substances), Cheese Powder, Hydrolysed Vegetable Protein, Flavour Enhancers (627, 631), Edible Vegetable Oil (Palm, Coconut), Anticaking Agent (551). *As Flavouring Agent. ~Contains Onion.",
                            "other_FSSAI_license_no": "10014064000435"
                        },
                        "location_id": "SIVA-ONDC-STORE-1-LOC-1",
                        "tags": {
                            "veg": "yes",
                            "non_veg": "no"
                        },
                        "fssai_license_no": false,
                        "provider": {
                            "name": "Siva Store",
                            "short_desc": "Siva Store",
                            "long_desc": "Siva is a universal open-source platform for commerce and supply chain. With its Platform-as-a-Service and integration-Platform-as-a-service capabilities, Siva is a truly interoperable solution, with more than 100 ready-made solutions at the door.",
                            "images": [
                                "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                            ],
                            "symbol": "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                        },
                        "provider_id": "SIVA-ONDC-STORE-1",
                        "locations": {
                            "id": "SIVA-ONDC-STORE-1-LOC-1",
                            "gps": "17.4333064,78.3859893",
                            "address": {
                                "city": "Hyderabad",
                                "state": "Telangana",
                                "street": "Madhapur",
                                "locality": "Madhapur",
                                "area_code": "500081"
                            },
                            "time": {
                                "days": "1,2,3,4,5,6,7",
                                "schedule": {
                                    "holidays": [
                                        "2023-08-15",
                                        "2023-08-19"
                                    ]
                                },
                                "range": {
                                    "start": "0000",
                                    "end": "2359"
                                }
                            }
                        },
                        "city_code": "std:040",
                        "bpp_id": "ondc.eunimart.com",
                        "bpp_uri": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
                        "transaction_id": "f4519ecd-1c0a-4b67-98f5-684a4003f8b5",
                        "bppDescriptor": {
                            "name": "Siva store",
                            "short_desc": "Siva for ONDC",
                            "long_desc": "Siva is a universal open-source platform for commerce and supply chain. With its Platform-as-a-Service and integration-Platform-as-a-service capabilities, Siva is a truly interoperable solution, with more than 100 ready-made solutions at the door.",
                            "images": [
                                "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                            ],
                            "symbol": "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
                        }
                    }
                ]
            },
            "fulfillments": [
                {
                    "end": {
                        "location": {
                            "gps": "17.4465579,78.39125729999999",
                            "address": {
                                "area_code": "500081"
                            }
                        }
                    }
                }
            ]
        }
    }
]

var Initpayload = [
    {
        "context": {
            "transaction_id": "83dc9fd4-fdc8-4e29-8e6c-0164c7dd9a2c",
            "bpp_uri": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
            "bpp_id": "ondc.eunimart.com",
            "city": "std:040"
        },
        "message": {
            "order": {
                "provider": {
                    "id": "SIVA-ONDC-STORE-1"
                },
                "items": [
                    {
                        "id": "LAYS_G_327",
                        "quantity": {
                            "count": 1
                        },
                        "fulfillment_id": "PROVIDER-FULFILLMENT-1"
                    }
                ],
                "fulfillments": [
                    {
                        "id": "PROVIDER-FULFILLMENT-1",
                        "@ondc/org/provider_name": "Siva Store",
                        "tracking": false,
                        "@ondc/org/category": "Delivery",
                        "@ondc/org/TAT": "P7D",
                        "state": {
                            "descriptor": {
                                "code": "Serviceable"
                            }
                        },
                        "end": {
                            "location": {
                                "address": {
                                    "building": "Ayyappa Society",
                                    "name": "test name",
                                    "locality": "Ayyappa Society",
                                    "city": "Hyderabad",
                                    "state": "Telangana",
                                    "country": "India",
                                    "area_code": "500081"
                                },
                                "gps": "17.4465579,78.39125729999999"
                            },
                            "contact": {
                                "phone": "7894561231",
                                "email": "test@gmail.com"
                            }
                        }
                    }
                ],
                "billing": {
                    "gps": "28.6509821,77.286333",
                    "address": {
                        "name": "Shirooo",
                        "locality": "delhi",
                        "building": "Krishna Nagar, delhi",
                        "city": "Madhapur",
                        "state": "Telangana",
                        "country": "India",
                        "area_code": "500001"
                    },
                    "phone": "9638527415",
                    "name": "Shirooo",
                    "email": "shiroo@gmail.com"
                },
                "delivery": {
                    "type": "Delivery",
                    "name": "test name",
                    "email": "test@gmail.com",
                    "phone": "7894561231",
                    "location": {
                        "gps": "17.4465579,78.39125729999999",
                        "address": {
                            "building": "Ayyappa Society, Ayyappa Society",
                            "city": "Hyderabad",
                            "state": "Telangana",
                            "country": "",
                            "area_code": "500081"
                        }
                    }
                }
            }
        }
    }
]

var Confirmpayload = [
     {
		"context": {
			"bpp_id": "ondc.eunimart.com",
			"bpp_uri": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
			"city": "std:040",
			"transaction_id": "d9e7e549-ecfe-48e3-a544-e3a046b6a73c"
		},
		"message": {
			"billing_info": {
				"address": {
					"area_code": "500081",
					"building": "Ayyappa Society, Ayyappa Society",
					"city": "Hyderabad",
					"country": "India",
					"locality": "Ayyappa Society",
					"name": "saira",
					"state": "Telangana"
				},
				"created_at": "2023-05-10T06:00:41.492Z",
				"email": "saira@gmail.com",
				"name": "saira",
				"phone": "7894561321",
				"updated_at": "2023-05-10T06:00:41.492Z"
			},
			"delivery_info": {
				"email": "saira@gmail.com",
				"location": {
					"address": {
						"area_code": "500081",
						"building": "Ayyappa Society, Ayyappa Society",
						"city": "Hyderabad",
						"country": "",
						"state": "Telangana"
					},
					"gps": "17.4465579,78.39125729999999"
				},
				"name": "saira",
				"phone": "7894561321",
				"type": "Delivery"
			},
			"fulfillments": [
				{
					"end": {
						"contact": {
							"phone": "7894561321"
						},
						"location": {
							"address": {
								"area_code": "500081",
								"building": "Ayyappa Society",
								"city": "Hyderabad",
								"country": "India",
								"locality": "Ayyappa Society",
								"name": "saira",
								"state": "Telangana"
							},
							"gps": "17.4465579,78.39125729999999"
						}
					},
					"id": "PROVIDER-FULFILLMENT-1",
					"tracking": false,
					"type": "Delivery"
				}
			],
			"items": [
				{
					"bpp_id": "ondc.eunimart.com",
					"bpp_url": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
					"fulfillment_id": "PROVIDER-FULFILLMENT-1",
					"id": "BMV200234762",
					"provider": {
						"id": "SIVA-ONDC-STORE-1",
						"locations": [
							"SIVA-ONDC-STORE-1-LOC-1"
						]
					},
					"quantity": {
						"count": 1
					}
				}
			],
			"payment": {
				"@ondc/org/buyer_app_finder_fee_amount": "2",
				"@ondc/org/buyer_app_finder_fee_type": "percent",
				"@ondc/org/settlement_details": [
					{
						"bank_name": "Axis",
						"beneficiary_name": "Shayak Mazumder",
						"branch_name": "Madhapur",
						"settlement_bank_account_no": "78000768594",
						"settlement_counterparty": "seller-app",
						"settlement_ifsc_code": "UTIB0000008",
						"settlement_phase": "sale-amount",
						"settlement_type": "neft"
					}
				],
				"type": "ON-FULFILLMENT"
			},
			"provider": {
				"id": "SIVA-ONDC-STORE-1",
				"locations": [
					{
						"id": "SIVA-ONDC-STORE-1-LOC-1"
					}
				]
			},
			"quote": {
				"breakup": [
					{
						"@ondc/org/item_id": "BMV200234762",
						"@ondc/org/item_quantity": {
							"count": 1
						},
						"@ondc/org/title_type": "item",
						"item": {
							"price": {
								"currency": "INR",
								"value": "45.00"
							}
						},
						"price": {
							"currency": "INR",
							"value": "45.00"
						},
						"title": "Spices SABZI Masala "
					},
					{
						"@ondc/org/item_id": "BMV200234762",
						"@ondc/org/title_type": "tax",
						"price": {
							"currency": "INR",
							"value": "2.25"
						},
						"title": "Tax"
					},
					{
						"@ondc/org/item_id": "PROVIDER-FULFILLMENT-1",
						"@ondc/org/title_type": "packing",
						"price": {
							"currency": "INR",
							"value": "15.00"
						},
						"title": "Packing charges"
					},
					{
						"@ondc/org/item_id": "PROVIDER-FULFILLMENT-1",
						"@ondc/org/title_type": "delivery",
						"price": {
							"currency": "INR",
							"value": "50.00"
						},
						"title": "Delivery charges"
					}
				],
				"price": {
					"currency": "INR",
					"value": "112.25"
				},
				"ttl": "P1D"
			}
		}
	}
]
export{
  SearchPayload,
  Selectpayload,
  Initpayload,
  Confirmpayload
}