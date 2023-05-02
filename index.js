#!/usr/bin/env node
import dotenv from "dotenv";
import Configure from "./configure/config.js";
dotenv.config({path:'../node_sample/.env'})
class Eunimart{
    constructor(key_id,secret_key){
        this.buyer=Configure(key_id,secret_key)
    }
}
export default Eunimart;

