#!/usr/bin/env node
import express from "express";
import cors from "cors";
import RouterExport from "./src/buyer/config/config.js";
import dbConnect from "./src/shared/database/mongooseConnector.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import { eventEmitter } from "./src/emitter/emitter.js";
import Order from "./src/api_methods/search.js";
// import { eventEmitter } from "./src/emitter/emitter.js";
// import { redisConnect, redisClient } from "./src/shared/database/redis.js";
dotenv.config();
class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.router=RouterExport(key_id,secret_key)
        this.order=new Order(key_id,secret_key)
        this.emitter=eventEmitter
    }
}
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
await dbConnect();
// try {
//   await redisConnect();
//   console.info("Redis connection successful");
// } catch (err) {
//   console.error(err);
//   process.exit(1);
// }
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

var bap=new Eunimart("eunimart_DSah67jgadh","KSJIPWBjda123jHOSPfhspeqjhrwqwlmm")
// bap.emitter.on('search', (data) => {
//   console.log('myEvent was triggered with data:', data);
// });
app.use("/api/v1/ondc/clientApis/bap/eunimart_bap/", cors(), bap.router);
const test=async()=>{
await bap.order.Search({
  "context": {
      "city": "Hyderabad",
      "state": "Telangana"
  },
  "message": {
      "criteria": {
          "search_string": "shirt",
          "delivery_location": "17.385044,78.486671",
          "area_code": ""
      },
      "payment": {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3"
      }
  }
},async function(data,err){
console.log(data,err)
})
}
test()
// export default Eunimart;
