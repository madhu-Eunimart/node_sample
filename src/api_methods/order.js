import axios from "axios";
import Authentication from "../auth/auth.js";
import { Configuration,routes } from "../buyer/config/config.js";
import { SearchRequest,SelectRequest } from "../payloads/payloads.js";
class Order{
  constructor(key_id,secret_key){
    this.key_id=key_id
    this.secret_key=secret_key
  }
async Search(payload,callback){
    if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    const data=SearchRequest(payload)
    console.log("-----",data)
    await axios.post(routes.search, data)
      .then(function (response) {
        callback(response.data,null)
      })
      .catch(function (error) {
        callback(null,error)
      });
    } 
}
async Select(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    const data=SelectRequest(payload)

  await axios.post(routes.select, data,
  {
    // headers:{
    //   Authorization: Configuration?.TOKEN
    // }
  })
    .then(function (response) {
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
async Init(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(routes.init, payload,
  {
    // headers:{
    //   Authorization: Configuration?.TOKEN
    // }
  })
    .then(function (response) {
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
async Confirm(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(routes.confirm, payload,
  {
    // headers:{
    //   Authorization: Configuration?.TOKEN
    // }
  })
    .then(function (response) {
      console.log("=========",response.data)
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
async Update(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(routes.update, payload,
  {
    // headers:{
    //   Authorization: Configuration?.TOKEN
    // }
  })
    .then(function (response) {
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
async Status(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(routes.status, payload,
  {
    // headers:{
    //   Authorization: Configuration?.TOKEN
    // }
  })
    .then(function (response) {
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
}

export default Order