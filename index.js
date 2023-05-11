#!/usr/bin/env node
// import Search from "./src/search/search.js";
// import Select from "./src/select/select.js";
// import Init from "./src/init/init.js";
// import Confirm from "./src/confirm/confirm.js";
import express from "express";
import cors from "cors";
import RouterExport from "./src/buyer/config/config.js";
import dbConnect from "./src/shared/database/mongooseConnector.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import EventEmitter from 'events'
const myEmitter = new EventEmitter();
dotenv.config();
class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.router=RouterExport(key_id,secret_key)
        // this.search=new Search(key_id,secret_key)
        // this.select=new Select(key_id,secret_key)
        // this.init=new Init(key_id,secret_key)
        // this.confirm=new Confirm(key_id,secret_key) 
    }
}
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
myEmitter.on('on_search', (data) => {
  console.log('myEvent was triggered with data:', data);
});
// parse application/json
app.use(bodyParser.json());
await dbConnect();
try {
    const dbPort = 8081
    var server = app.listen(dbPort, () => {
      console.info(`Listening on port ${dbPort}`);
    });
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
  app.use(cors());
  const obj={
    "city":"Hyderabad",
    "state":"Telangana",
    // "category_id":"Bakery, Cakes & Dairy"
    "search_string":"shirt",
    // provider_name:"siva"
    "location":"17.385044,78.486671"
    // 
}

var bap=new Eunimart("eunimart_DSah67jgadh","KSJIPWBjda123jHOSPfhspeqjhrwqwlmm")
app.use("/api/v1/ondc/clientApis/bap/eunimart_bap/", cors(), bap.router);
// async function test(){
//     var dat=await bap.search.SearchByProduct(obj,function(err,data){
//         if(err){
//             console.log(err)
//         }else{
//             app.use("/api/v1/ondc", cors(), bap.router);
//         }
//     })}
// test()


// export default Eunimart;
