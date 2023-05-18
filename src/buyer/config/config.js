import { Router } from 'express';
import bapRoutes from '../../router.js'
import Authentication from '../../auth/auth.js';
import dbConnect from '../../shared/database/mongooseConnector.js';
const router = new Router();

var routes={}
var Configuration={}
class Config {
    constructor(key_id, secret_key) {
        this.key_id = key_id
        this.secret_key = secret_key
    }
    RouterExport() {
        if (Authentication(`${this.key_id}`, `${this.secret_key}`)) {
            router.use(bapRoutes);
            return router
        }
    }
    DbConfig(uri) {
        if (Authentication(`${this.key_id}`, `${this.secret_key}`)) {
            (async () => {
                await dbConnect(uri)
            })()

        }
    }
    SdkConfig(config) {
        config.forEach((user) => {
            Configuration["BAP_ID"]=user.BAP_ID
            Configuration["BAP_UNIQUE_KEY_ID"]=user.BAP_UNIQUE_KEY_ID
            Configuration["BAP_PRIVATE_KEY"]=user.BAP_PRIVATE_KEY
            Configuration["BAP_URL"]=user.BAP_URL
            Configuration["HOST_URL"]=user.HOST_URL
            Configuration["BG_ID"]="prod.gateway.ondc.org"
            Configuration["PROTOCOL_BASE_URL"]="https://prod.gateway.ondc.org/"
            Configuration["DOMAIN"]="nic2004:52110"
            Configuration["COUNTRY"]="IND"
            Configuration["REGISTRY_BASE_URL"]="https://prod.registry.ondc.org/"

            const api_data=user?.api
            api_data.forEach((endpoint)=>{
                routes[endpoint?.name]=endpoint?.http_entity_endpoint
            })
          });
          console.log(Configuration)
    }

}
export { Config, Configuration,routes };