import axios from "axios"
import Event from "../event.js"
import Authentication from "../auth/auth.js"
class Init{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
    }
async Init(data,callback){
        try{
            let token = process.env.TOKEN
            let api_request = {
                baseURL:process.env.BASE_URL,
                url: process.env.INIT_API,
                method: "POST",
                data: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            let api_response = await axios(api_request)  
            console.log("herer",api_response);
            if(api_response.data.message?.error){
                callback(new Error(JSON.stringify(api_response.data.message)),null)
            }else{
                await new Promise(r => setTimeout(r, 7000));
            let api_event_request = {
                baseURL:process.env.BASE_URL,
                url: process.env.EVENT_API+api_response.data[0]?.context.message_id,
                method: "GET",
            }
            callback(null,await Event(api_event_request)); 
        }       
        }
        catch(err){
            callback(new Error("error occured"),null);
        }
}
async Initfunc(data,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    await this.Init(data,function(err,data){
        callback(err,data)
    })}else{
        callback(new Error("invalid credentials"),null)
    }
}
}
export default Init;