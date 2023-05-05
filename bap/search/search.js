import axios from "axios"
import Event from "../event.js"
import {SearchPayload} from "../payloads/payloads.js"
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
  var search_payload=SearchPayload(data.city,{"search_string":data.search_string})
    await Search(search_payload,function(err,data){
        callback(err,data)
    })
}
async function SearchByProvider(data,callback){
  var search_payload=SearchPayload(data.city,{"provider_name":data.provider_name})
  await Search(search_payload,function(err,data){
      callback(err,data)
  })
}
async function SearchByCategoryId(data,callback){
  var search_payload=SearchPayload(data.city,{"category_id":data.category_id})
  await Search(search_payload,function(err,data){
      callback(err,data)
  })
}
export {
  SearchByProduct,
  SearchByProvider,
  SearchByCategoryId
};

