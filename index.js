#!/usr/bin/env node
import Search from "./bap/search/search.js";
import Select from "./bap/select/select.js";
import Init from "./bap/init/init.js";
import Confirm from "./bap/confirm/confirm.js";

class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.search=new Search(key_id,secret_key)
        this.select=new Select(key_id,secret_key)
        this.init=new Init(key_id,secret_key)
        this.confirm=new Confirm(key_id,secret_key) 
    }
}
export default Eunimart;
