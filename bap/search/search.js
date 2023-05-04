import axios from "axios"
import Event from "../event.js"
var search_payload={
    context: {
        city: "",
        state: "",
      },
      message: {
        criteria: {
          delivery_location:"17.385044,78.486671",
          area_code:"",
        },
        payment: {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3",
        },
      },
}
async function Search(data,callback){
        try{

            let api_request = {
                baseURL:"https://ondc.eunimart.com/",
                url: "api/v1/ondc/clientApis/bap/eunimart_bap/search",
                method: "POST",
                data: data
            }
            let api_response = await axios(api_request)  
            if(api_response.data.message?.error){
                callback(new Error(JSON.stringify(api_response.data.message)),null)
            }else{
            let api_event_request = {
                baseURL:"https://ondc.eunimart.com/",
                url: "api/v1/ondc/events?message_id="+api_response.data.context.message_id,
                method: "GET",
            }
            callback(null,await Event(api_event_request)); 
        }       
        }
        catch(err){
            callback(new Error("error occured"),null);
        }
}
async function SearchByProduct(data,callback){
    search_payload.context.city=data.city
    search_payload.context.state=data.state
    search_payload.message.criteria.search_string=data.search_string
    await Search(search_payload,function(err,data){
        callback(err,data)
    })
}
async function SearchByProvider(data,callback){
  search_payload.context.city=data.city
  search_payload.context.state=data.state
  search_payload.message.criteria.provider_name=data.provider_name
  await Search(search_payload,function(err,data){
      callback(err,data)
  })
}
async function SearchByCategoryId(data,callback){
  search_payload.context.city=data.city
  search_payload.context.state=data.state
  search_payload.message.criteria.category_id=data.category_id
  await Search(search_payload,function(err,data){
      callback(err,data)
  })
}
export {
  SearchByProduct,
  SearchByProvider,
  SearchByCategoryId
};

