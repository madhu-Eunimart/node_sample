import {SearchByProduct,SearchByCategoryId, SearchByProvider} from "../bap/search/search.js";
import Cancel from "../bap/cancel/cancel.js"
import Init from "../bap/init/init.js"
import Update from "../bap/update/update.js"
import Select from "../bap/select/select.js"
import Confirm from "../bap/confirm/confirm.js"
function Configure(key_id,secret_key){
    if(key_id=="eunimart_DSah67jgadh" && secret_key=="KSJIPWBjda123jHOSPfhspeqjhrwqwlmm"){
        return {

            "searchByCategoryId":SearchByCategoryId,
            "searchByProduct":SearchByProduct,
            "searchByProvider":SearchByProvider,
            // "cancel":Cancel,
            // "init":Init,
            // "update":Update,
            // "select":Select,
            // "confirm":Confirm

        }
    }
    console.log("invalid credentials")
    // const obj
    return {}
}
export default Configure;
