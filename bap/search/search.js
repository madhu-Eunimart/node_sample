import axios from "axios"
import Event from "../event.js"
import {SearchPayload} from "../payloads/payloads.js"
import Authentication from "../auth/auth.js"
class Search{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
    }
async Search(data,callback){
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
                await new Promise(r => setTimeout(r, 7000));
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
async SearchByProduct(data,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    var search_payload=SearchPayload(data)
    await this.Search(search_payload,function(err,data){
        callback(err,data)
    })}else{
        callback(new Error("invalid credentials"),null)
    }
}
async SearchByProvider(data,callback){
    if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  var search_payload=SearchPayload(data)
  await this.Search(search_payload,function(err,data){
      callback(err,data)
  })}else{
    callback(new Error("invalid credentials"),null)
}
}
async SearchByCategoryId(data,callback){
if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  var search_payload=SearchPayload(data)
  await this.Search(search_payload,function(err,data){
      callback(err,data)
  })}else{
    callback(new Error("invalid credentials"),null)
}
}
}
export default Search;

