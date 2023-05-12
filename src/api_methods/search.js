import axios from "axios";
import Authentication from "../auth/auth.js";
class Order{
  constructor(key_id,secret_key){
    this.key_id=key_id
    this.secret_key=secret_key
  }
async Search(payload,callback){
    if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    await axios.post(process.env.HOST_URL+"search", payload)
      .then(function (response) {
        callback(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
}
}

export default Order