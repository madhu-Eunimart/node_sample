import axios from "axios"
import Event from "./event.js"
async function Search(api_request){
    // var search=async()=>{
        try{
            let api_response = await axios(api_request)  
            console.log(api_response.data.context.message_id)
            let api_event_request = {
                baseURL:"https://ondc.eunimart.com/",
                url: "api/v1/ondc/events?messageId="+api_response.data.context.message_id,
                method: "GET",
                // headers: {
                //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MjYsIlVzZXJuYW1lIjoiIiwiYWNjZXNzX3RlbXBsYXRlX2lkIjoyLCJjb21wYW55X2lkIjo0LCJlbWFpbCI6ImJ1eWVyX3Rlc3RlckBldW5pbWFydC5jb20iLCJleHAiOjE2ODI1Nzc1MDYsImZpcnN0X25hbWUiOiIiLCJsYXN0X25hbWUiOiIiLCJtb2JpbGVfbnVtYmVyIjoiIiwicHJlZmVyZW5jZXMiOltdLCJyb2xlX2lkIjoxLCJ1c2VyX3R5cGVzIjpbeyJpZCI6NjQsIm5hbWUiOiJCdXllciJ9XX0._lfiHzpsUfrcY1AgoesAYs7zA9cN4-EkAIijt9Xcp7Q",
                // },
                // data: requestBody
            }
            return await Event(api_event_request)
        
        }
        catch(err){
            console.log(err)
        }
    // }
    // return await search()
}
export default Search;
