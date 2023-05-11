import {getProviderById} from '../db/dbService.js'
class ValidateProvider {
async ProviderValidation(request){

var provider = await getProviderById(request.message.order?.provider?.id)
        if( !provider.company_details?.is_active){
            const response = {
                message: {
                    "ack": { "status": "NACK" },
                    "error": { "type": "Seller App", "code": "30001", "message": "Provider not found" }
                }
            }
            return response;
        }
        const date = new Date().toJSON().slice(0, 10);
        var response
        if(provider.company_details?.holidays){
        provider.company_details?.holidays.map((i)=>{
            if (i.slice(0, 10)==date){
                response = {
                    message: {
                        "ack": { "status": "NACK" },
                        "error": { "type": "Seller App", "code": "30017", "message": "Merchant is currently not taking orders" }
                    }
                }
            }
        })
        if (response){
            return response
        }
    }
}
}
export default ValidateProvider;
