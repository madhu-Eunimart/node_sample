#!/usr/bin/env node
import express from "express";
import cors from "cors";
import RouterExport from "./src/buyer/config/config.js";
import dbConnect from "./src/shared/database/mongooseConnector.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
// import { eventEmitter } from "./src/emitter/emitter.js";
import { redisConnect, redisClient } from "./src/shared/database/redis.js";
dotenv.config();
class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.router=RouterExport(key_id,secret_key)
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
  await redisConnect();
  console.info("Redis connection successful");
} catch (err) {
  console.error(err);
  process.exit(1);
}
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
app.use("/api/v1/ondc/clientApis/bap/eunimart_bap/", cors(), bap.router);

// export default Eunimart;
