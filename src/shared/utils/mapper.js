import axios from "axios";
import { envdata } from "../../buyer/config/config";
const Mapper=async(input,mapper_file) =>{
    try {
      let authorization = envdata?.BPP_AUTH;

    
      let request = {
        baseURL: envdata?.EUNIMART_CORE_HOST,
        url: "/ipaas/boson_convertor",
        method: "POST",
        headers: {
          Authorization: authorization,
        },
        data:{
          data:{
            input_data:[input],
            mapper_template:mapper_file
          }
        }
      };
      let response = await axios(request);
      let apiResponse
      if (response?.data?.data?.error_message==null){
        apiResponse = response?.data?.data?.mapped_response[0]
      }
      else{
        console.log("input data : ",input)
        console.log("mapper error message",response?.data?.data?.error_message)
        console.log("mapper response",response?.data?.data?.mapped_response)
      }
      return apiResponse;
    } catch (err) {
      console.log("Error ========>>> ", err);
    }
  }

  export {Mapper}