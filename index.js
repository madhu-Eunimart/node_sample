#!/usr/bin/env node
import Search from "./bap/search/search.js";
class Eunimart{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
        this.search=new Search(key_id,secret_key)
    }
}
// export default Eunimart;

