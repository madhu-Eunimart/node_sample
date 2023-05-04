#!/usr/bin/env node
import Configure from "./configure/config.js";class Eunimart{
    constructor(key_id,secret_key){
        this.buyer=Configure(key_id,secret_key)
    }
}
export default Eunimart;

