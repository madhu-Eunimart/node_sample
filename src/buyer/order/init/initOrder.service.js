import { PROTOCOL_CONTEXT } from "../../../shared/utils/buyer_enums.js";
import BppInitService from "./bppInit.service.js";
import ContextFactory from "../../../shared/factories/ContextFactory.js";
import { v4 as uuidv4} from 'uuid';


const bppInitService = new BppInitService();

class InitOrderService {

    /**
    * init order
    * @param {Object} orderRequest
    * @param {Boolean} isMultiSellerRequest
    */
     async ONDCInitOrder(orderRequest, isMultiSellerRequest = false) {
        try {

            const { context: requestContext = {}, message = {} } = orderRequest;
            const { items = [], fulfillments = [], payment = {} } = message.order;
            
            //TODO
            //check all validations
            //transaction id to be same as select transaction id

            // var validation_flag = new BAPValidator().validateInit(orderRequest)

            // if(!validation_flag){
            //     return res.status(401)
                
            //     .json({ message : { 
            //             "ack": { "status": "NACK" },  
            //             "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
            //         })
            // }

            if (!(items?.length)) {
                return {
                    context : requestContext,
                    error: { message: "Empty order received" }
                };
            }

            const bppResponse = await bppInitService.ONDCInit(
                requestContext.bpp_uri,
                orderRequest
            );

            return bppResponse;
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCInitOrderEvent(orderRequest) {
        try {

            const { context: requestContext = {}, message = {} } = orderRequest;
            const { items = [], fulfillments = [], payment = {} } = message.order;
            
            //TODO
            //check all validations
            //transaction id to be same as select transaction id

            // var validation_flag = new BAPValidator().validateInit(orderRequest)

            // if(!validation_flag){
            //     return res.status(401)
                
            //     .json({ message : { 
            //             "ack": { "status": "NACK" },  
            //             "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
            //         })
            // }

            if (!(items?.length)) {
                return {
                    context : requestContext,
                    error: { message: "Empty order received" }
                };
            }

            const bppResponse = await bppInitService.ONDCInit(
                requestContext.bpp_uri,
                orderRequest
            );

            // console.log("ONDCInitOrderEvent====> ", JSON.stringify(bppResponse));

            return bppResponse;
        }
        catch (err) {
            throw err;
        }
    }
}

export default InitOrderService;
