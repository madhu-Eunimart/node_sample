#!/usr/bin/env node
import express from "express";
import cors from "cors";
import Config from "./src/buyer/config/config.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import { eventEmitter } from "./src/emitter/emitter.js";
import Order from "./src/api_methods/order.js";
dotenv.config();
class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.config=new Config(key_id,secret_key)
        this.order=new Order(key_id,secret_key)
        this.emitter=eventEmitter
    }
    Config(uri){
      this.config.DbConfig(uri)
    }
    Router(){
      return this.config.RouterExport()
    }
}
export default Eunimart;
