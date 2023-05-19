import { v4 as uuidv4 } from 'uuid';
function SearchRequest(data){
        const {context = {} } = data || {};
          const searchRequest = {
            context: context,
            message: {
              intent: {
                ...(data?.search_string && {
                  item: {
                    descriptor: {
                      name: data.search_string,
                    },
                  },
                }),
                ...((data?.provider_id ||
                  data?.category_id ||
                  data?.provider_name) && {
                  provider: {
                    ...(data?.provider_id && {
                      id: data?.provider_id,
                    }),
                    ...(data?.category_id && {
                      category_id: data.category_id,
                    }),
                    ...(data?.provider_name && {
                      descriptor: {
                        name: data?.provider_name,
                      },
                    }),
                  },
                }),
                ...((data?.pickup_location || data?.delivery_location) && {
                  fulfillment: {
                    type: "Delivery",
                    ...(data?.pickup_location && {
                      start: {
                        location: {
                          gps: data?.pickup_location,
                        },
                      },
                    }),
                    ...(data?.delivery_location && {
                      end: {
                        location: {
                          gps: data?.delivery_location,
                        },
                      },
                    }),
                  },
                }),
                ...((data?.category_id || data?.category_name) && {
                  category: {
                    ...(data?.category_id && {
                      id: data?.category_id,
                    }),
                    ...(data?.category_name && {
                      descriptor: {
                        name: data?.category_name,
                      },
                    }),
                  },
                }),
                payment: {
                  "@ondc/org/buyer_app_finder_fee_type":
                  data?.buyer_app_finder_fee_type ||
                  "percent",
                  "@ondc/org/buyer_app_finder_fee_amount":
                    data?.buyer_app_finder_fee_amount ||
                    "3",
                },
              },
            },
          };
          if(data?.area_code){
          searchRequest.message.intent.fulfillment.end.location["address"]={area_code:data?.area_code}
          }
          if(!data.context?.message_id){
            searchRequest.context.message_id=uuidv4()
          }if(!data.context?.transaction_id){
            searchRequest.context.transaction_id=uuidv4()
          }
          if(!data.context.timestamp){
            searchRequest.context.timestamp=new Date()
          }
          if(!data.context.city_code){
            searchRequest.context.city="*"
          }
          return searchRequest
      }

function SelectRequest(data){
    const {context = {} } = data || {};
      const selectRequest = {
        context: context,
        message: {
          order: {
              ...((data?.provider_id || data?.locations) && {
                  provider:{
                      id:data?.provider_id,
                      locations:data?.locations
                  }
              }),
              ...(data?.items && {
                  items:data?.items
              }),
              ...(data?.fulfillments && {
                  fulfillments:[
                      {
                          end:{
                              location:{
                                  gps:data?.fulfillments[0]?.gps,
                                  address:{
                                      area_code:data?.fulfillments[0]?.area_code
                                  }
                              }
                          }
                      }
                  ]
              }),
              ...(data?.payment_type && {
                payment:{
                  type:data?.payment_type
                }
              }),
              ...(data?.tags && {
                tags:data?.tags
              })
          }
    
        },
      };
//   console.log("------",selectRequest)
      return selectRequest
}
function InitRequest(data) {
  const { context = {} } = data || {};
  const initRequest = {
      context: context,
      message: {
          order: {
              ...((data?.provider_id || data?.locations) && {
                  provider: {
                      id: data?.provider_id,
                      locations: data?.locations
                  }
              }),
              ...(data?.items && {
                  items: data?.items
              }),
                  billing: {
                      address: {
                          name: data?.billing_name,
                          locality: data?.billing_locality,
                          building: data?.billing_building,
                          city: data?.billing_city,
                          state: data?.billing_state,
                          country: data?.billing_country,
                          area_code: data?.billing_area_code
                      },
                      phone: data?.phone,
                      name: data?.name,
                      email: data?.email,
                      created_at: data?.created_at,
                      updated_at: data?.updated_at
                  }
              ,
              ...(data?.fulfillments && {
                  fulfillments: [
                      {
                          id:data?.fulfillments[0]?.id,
                          end: {
                              location: {
                                  gps: data?.fulfillments[0]?.gps,
                                  address: {
                                      name: data?.data?.fulfillments[0]?.shipping_name || data?.billing_name,
                                      locality: data?.fulfillments[0]?.shipping_locality || data?.billing_locality,
                                      building: data?.fulfillments[0]?.shipping_building || data?.billing_building,
                                      city: data?.fulfillments[0]?.shipping_city || data?.billing_city,
                                      state: data?.fulfillments[0]?.shipping_state || data?.billing_state,
                                      country: data?.fulfillments[0]?.shipping_country || data?.billing_country,
                                      area_code: data?.fulfillments[0]?.shipping_area_code || data?.billing_area_code
                                  }
                              },
                              contact: {
                                  phone: data?.fulfillments[0]?.shipping_phone || data?.phone
                              }
                          },
                          type: data?.fulfillments[0]?.type
                      }
                  ]
              })
          }

      },
  };
  //   console.log("------",initRequest)
  return initRequest
}
function UpdateRequest(data) {
  const { context = {} } = data || {};
  const updateRequest = {
      context: context,
      message: {
          update_target: data?.update_target,
          order: {
              id: data?.order_id,
              state: data?.state,
              ...((data?.provider_id) && {
                  provider: {
                      id: data?.provider_id,
                  }
              }),
              ...(data?.items && {
                  items: data?.items
              }),
              ...(data?.settlement_details && {
                  payment: {
                      ["@ondc/org/settlement_details"]: data?.settlement_details
                  }
              })
          }

      },
  };
  //   console.log("------",updateRequest)
  return updateRequest
}
function ConfirmRequest(data) {
  const { context = {} } = data || {};
  const confirmRequest = {
      context: context,
      message: {
          order: {
              id: data?.order_id || data?.id,
              state: data?.state,
              billing: {
                  address: {
                      name: data?.billing_name,
                      locality: data?.billing_locality,
                      building: data?.billing_building,
                      city: data?.billing_city,
                      state: data?.billing_state,
                      country: data?.billing_country,
                      area_code: data?.billing_area_code
                  },
                  phone: data?.billing_phone,
                  name: data?.billing_name,
                  email: data?.billing_email,
                  created_at: data?.billing_created_at,
                  updated_at: data?.billing_updated_at
              },
              ...((data?.provider_id || data?.locations) && {
                  provider: {
                      id: data?.provider_id,
                      locations: data?.locations
                  }
              }),
              ...(data?.items && {
                  items: data?.items
              }),
              payment:{
                  params:{
                      amount: data?.amount,
                      currency: data?.currency,
                      transaction_id: data?.transaction_id
                  },
                  status: data?.payment_status,
                  type: data?.payment_type,
                  collected_by: data?.payment_collected_by,
                  ["@ondc/org/settlement_details"]: data?.settlement_details,
                  ["@ondc/org/buyer_app_finder_fee_amount"]: data?.buyer_app_finder_fee_amount,
                  ["@ondc/org/buyer_app_finder_fee_type"]: data?.buyer_app_finder_fee_type
              },
              quote: {
                  price:{
                      currency: data?.quote?.price,
                      breakup: data?.quote?.breakup,
                      ttl: data?.quote?.ttl
                  }
              },
              created_at: data?.order_created_at,
              updated_at: data?.order_updated_at,
              ...(data?.fulfillments && {
                  fulfillments: [
                      {
                          id: data?.fulfillments[0]?.id,
                          end: {
                              location: {
                                  gps: data?.fulfillments[0]?.gps,
                                  address: {
                                      name: data?.data?.fulfillments[0]?.shipping_name || data?.billing_name,
                                      locality: data?.fulfillments[0]?.shipping_locality || data?.billing_locality,
                                      building: data?.fulfillments[0]?.shipping_building || data?.billing_building,
                                      city: data?.fulfillments[0]?.shipping_city || data?.billing_city,
                                      state: data?.fulfillments[0]?.shipping_state || data?.billing_state,
                                      country: data?.fulfillments[0]?.shipping_country || data?.billing_country,
                                      area_code: data?.fulfillments[0]?.shipping_area_code || data?.billing_area_code
                                  }
                              },
                              contact: {
                                  phone: data?.fulfillments[0]?.shipping_phone || data?.billing_phone,
                                  email: data?.fulfillments[0]?.shipping_email || data?.billing_email,
                              },
                              person: data?.fulfillments[0]?.delivery_person_name
                          },
                          type: data?.fulfillments[0]?.type,
                          tracking: data?.fulfillments[0]?.tracking,
                      }
                  ]
              })
          }

      },
  };
  //   console.log("------",confirmRequest)
  return confirmRequest
}
function StatusRequest(data) {
  const { context = {} } = data || {};
  const statusRequest = {
      context: context,
      message: {
          order_id: data?.order_id
      }
  }
  //   console.log("------",statusRequest)
  return statusRequest
}
function CancelRequest(data) {
  const { context = {} } = data || {};
  const cancelRequest = {
      context: context,
      message: {
          order_id: data?.order_id,
          cancellation_reason_id: data?.cancellation_reason_id
      }
  }
  //   console.log("------",cancelRequest)
  return cancelRequest
}
function SupportRequest(data) {
  const { context = {} } = data || {};
  const supportRequest = {
      context: context,
      message: {
          ref_id: data?.ref_id
      }
  }
  //   console.log("------",supportRequest)
  return supportRequest
}
function TrackRequest(data) {
  const { context = {} } = data || {};
  const trackRequest = {
      context: context,
      message: {
          order_id: data?.order_id,
          callback_url: data?.callback_url
      }
  }
  //   console.log("------",trackRequest)
  return trackRequest
}

export{
  SearchRequest,
  SelectRequest,
  InitRequest,
  UpdateRequest,
  ConfirmRequest,
  TrackRequest,
  SupportRequest,
  CancelRequest,
  StatusRequest
}