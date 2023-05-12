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
        callback(response.data,null)
      })
      .catch(function (error) {
        callback(null,error)
      });
    } 
}
async Select(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(process.env.HOST_URL+"select", payload)
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
  await axios.post(process.env.HOST_URL+"init", payload)
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
  await axios.post(process.env.HOST_URL+"confirm", payload)
    .then(function (response) {
      callback(response.data,null)
    })
    .catch(function (error) {
      callback(null,error)
    });
  } 
}
async Update(payload,callback){
  if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
  await axios.post(process.env.HOST_URL+"update", payload)
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
  await axios.post(process.env.HOST_URL+"status", payload)
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