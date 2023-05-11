import { Router } from 'express';
import bapRoutes from '../../router.js'
import Authentication from '../../auth/auth.js';
const router = new Router();
function RouterExport(key_id,secret_key){
    if(Authentication(key_id,secret_key)){
    router.use(bapRoutes);
    return router
    }

}
export default RouterExport;