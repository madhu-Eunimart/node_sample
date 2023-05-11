import {getBPPCartByTransactionId} from '../db/dbService.js'
class BuyerFinderFeeValidateProvider {
    async BuyerFinderFeeValidate(request){

        let query = {
            transactionId: request.context.transaction_id,
            providerId: request.message.order?.provider?.id
        }
        
        var BPPUser = await getBPPCartByTransactionId(query)
        if( BPPUser.on_init?.message.order?.payment?.['@ondc/org/buyer_app_finder_fee_amount'] !== request.message.order?.payment?.['@ondc/org/buyer_app_finder_fee_amount']){
            const response = {
                message: {
                    "ack": { "status": "NACK" },
                    "error": { "type": "Seller App", "code": "50005", "message": "Terms unacceptable" }
                }
            }
            return response;
        }
        if( BPPUser.on_init?.message.order?.payment?.['@ondc/org/buyer_app_finder_fee_type'] !== request.message.order?.payment?.['@ondc/org/buyer_app_finder_fee_type']){
            const response = {
                message: {
                    "ack": { "status": "NACK" },
                    "error": { "type": "Seller App", "code": "50005", "message": "Terms unacceptable" }
                }
            }
            return response;
        }
    }
}

export default BuyerFinderFeeValidateProvider;