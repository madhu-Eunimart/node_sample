import { Router } from 'express';
import bapRoutes from '../../router.js'
import Authentication from '../../auth/auth.js';
import dbConnect from '../../shared/database/mongooseConnector.js';
const router = new Router();

var envdata = {}
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
    SdkConfig(data) {
        envdata = {
            BAP_ID: data?.BAP_ID,
            HOST_URL: data?.HOST_URL,
            BAP_URL: data?.BAP_URL,
            REGISTRY_BASE_URL: data?.REGISTRY_BASE_URL,
            BAP_FINDER_FEE_TYPE: data?.BAP_FINDER_FEE_TYPE,
            BAP_FINDER_FEE_AMOUNT: data?.BAP_FINDER_FEE_AMOUNT,
            BPP_ID: data?.BPP_ID,
            DOMAIN: data?.DOMAIN,
            COUNTRY: data?.COUNTRY,
            CITY: data?.CITY,
            TTL: data?.TTL,
            JWT_SECRET: data?.JWT_SECRET,
            TOKEN: data?.TOKEN,
            BG_ID: data?.BG_ID,
            BAP_ID: data?.BAP_ID,
            BAP_UNIQUE_KEY_ID: data?.BAP_UNIQUE_KEY_ID,
            BAP_PRIVATE_KEY: data?.BAP_PRIVATE_KEY,
            BPP_URL: data?.BPP_URL,
            BPP_UNIQUE_KEY_ID: data?.BPP_UNIQUE_KEY_ID,
            BPP_PRIVATE_KEY: data?.BPP_PRIVATE_KEY,
            BPP_AUTH: data?.BPP_AUTH,
            PROTOCOL_BASE_URL: data?.PROTOCOL_BASE_URL,
            EUNIMART_CORE_HOST: data?.EUNIMART_CORE_HOST,
            USER_COMPANY_DETAILS_BASE_PATH: data?.USER_COMPANY_DETAILS_BASE_PATH
        }
    }

}
export { Config, envdata };