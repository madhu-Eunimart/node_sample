import { Router } from 'express';
import bapRoutes from '../../router.js'
import Authentication from '../../auth/auth.js';
import dbConnect from '../../shared/database/mongooseConnector.js';
const router = new Router();
class Config{
    constructor(key_id,secret_key){
        this.key_id=key_id
        this.secret_key=secret_key
    }
    RouterExport(){
    if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
    router.use(bapRoutes);
    return router
    }
}
    DbConfig(uri){
        if(Authentication(`${this.key_id}`,`${this.secret_key}`)){
            (async()=>{
                await dbConnect(uri)
            })()
            
        }
    }
    // Ondc(ondc_details){

    // }
}
export default Config;