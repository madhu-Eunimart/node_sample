import dotenv from "dotenv";
import Search from "./bap/search.js";
dotenv.config()
class Eunimart{
    constructor(key_id,secret_key){
        this.sdk={
            "key_id":process.env.YOUR_KEY_ID,
            "secret_key":process.env.YOUR_KEY_SECRET,
            "buyer":{
                "search":Search
            }
        }
    }
}
