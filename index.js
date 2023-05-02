#!/usr/bin/env node
import dotenv from "dotenv";
import Configure from "./configure/config.js";
dotenv.config({path:'../node-js-sample_eunimart/.env'})
class Eunimart{
    constructor(key_id,secret_key){
        this.buyer=Configure(key_id,secret_key)
    }
}
export default Eunimart;

