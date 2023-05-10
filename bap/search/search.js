import axios from "axios"
import Event from "../event.js"
import {SearchPayload} from "../payloads/payloads.js"
import Authentication from "../auth/auth.js"
const search_topic = "search"
// import Emitter from "../emitters/emitters.js"
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
class Search{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
    }
async Search(data,callback){
        try{
            let api_request = {
                baseURL:process.env.BASE_URL,
                url: process.env.SEARCH_API,
                method: "POST",
                data: data
            }
            let api_response = await axios(api_request)  
            if(api_response.data.message?.error){
                callback(new Error(JSON.stringify(api_response.data.message)),null)
            }else{
                await new Promise(r => setTimeout(r, 7000));
            let api_event_request = {
                baseURL:process.env.BASE_URL,
                url: process.env.EVENT_API+api_response.data.context.message_id,
                method: "GET",
            }
            callback(null,await Event(api_event_request)); 
        }      

        eventEmitter.on(api_response?.data?.context?.message_id, this.Searchcallback)

        // await new Promise(r => setTimeout(r, 7000));
        // return readis.get(msg_id)

        }
        catch(err){
            callback(new Error("error occured"),null);
        }
}

async Searchcallback (data){
    console.log(data);
    // callback(null,data); 
}

// async Onsearch(data){
//     try {
//         eventEmitter.emit(data?.context?.message_id,data)
//     } catch (error) {
//         callback(new Error("error occured"),null);
//     }
// }

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

