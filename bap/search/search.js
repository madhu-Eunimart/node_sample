import axios from "axios"
import Event from "../event.js"
async function Search(api_body){
        try{
            let api_request = {
                baseURL:process.env.BASE_URL,
                url: "api/v1/ondc/clientApis/bap/eunimart_bap/search",
                method: "POST",
                data: api_body
            }
            let api_response = await axios(api_request)  
            console.log(api_response.data.context.message_id)
            let api_event_request = {
                baseURL:process.env.BASE_URL,
                url: "api/v1/ondc/events?messageId="+api_response.data.context.message_id,
                method: "GET",
            }
            return await Event(api_event_request)
        
        }
        catch(err){
            console.log(err)
        }
}
export default Search;
