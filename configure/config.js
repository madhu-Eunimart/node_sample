import Search from "../bap/search/search.js";
import Cancel from "../bap/cancel/cancel.js"
import Init from "../bap/init/init.js"
import Update from "../bap/update/update.js"
import Select from "../bap/select/select.js"
import Confirm from "../bap/confirm/confirm.js"
function Configure(key_id,secret_key){
    console.log("ENV variables",process.env.YOUR_KEY_ID,process.env.YOUR_KEY_SECRET)
    if(key_id==process.env.YOUR_KEY_ID && secret_key==process.env.YOUR_KEY_SECRET){
        return {

                "search":Search,
                "cancel":Cancel,
                "init":Init,
                "update":Update,
                "select":Select,
                "confirm":Confirm

        }
    }
    console.log("invalid credentials")
    // const obj
    return {}
}
export default Configure;
