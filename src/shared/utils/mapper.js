import axios from "axios";

const Mapper=async(input,mapper_file) =>{
    try {
      let authorization = process.env.BPP_AUTH;

    
      let request = {
        baseURL: process.env.EUNIMART_CORE_HOST,
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