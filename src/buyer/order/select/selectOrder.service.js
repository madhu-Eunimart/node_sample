import { PROTOCOL_CONTEXT } from "../../../shared/utils/buyer_enums.js";
import ContextFactory from "../../../shared/factories/ContextFactory.js";
import BppSelectService from "./bppSelect.service.js";
import BAPValidator from "../../../shared/utils/validations/bap_validations/validations.js"

const bppSelectService = new BppSelectService();

class SelectOrderService {

    /**
    * select order
    * @param {Object} orderRequest
    */
    async selectOrder(orderRequest) {
        try {
            const { context: requestContext, message = {}} = orderRequest || {};
            const { order = {}, fulfillments = [],CreatedBy=orderRequest?.message?.CreatedBy } = message;

            const contextFactory = new ContextFactory();
            const context = contextFactory.create({
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.SELECT,
                transactionId: requestContext.transaction_id ? requestContext.transaction_id : requestContext?.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                cityCode :requestContext.city,
            });

            if (!(order?.items || order?.items?.length)) {
                return { 
                    context, 
                    error: { message: "Empty order received" }
                };
            }

            return await bppSelectService.select(
                requestContext.bpp_uri,
                context,
                { order, fulfillments, CreatedBy }
            );
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * select order
    * @param {Object} orderRequest
    */
     async ONDCSelectOrder(orderRequest) {
        try {
            const { context: requestContext = {}, message = {} } = orderRequest;
            const { provider = {}, items = [], fulfillments = [], payment = {} } = message.order;

            //TODO
            //Validations for Select item order

            var validation_flag = new BAPValidator().validateSelect(orderRequest)

            if(!validation_flag){
                return { message : { 
                        "ack": { "status": "NACK" },  
                        "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
                    }
            }
            
            if (!(items || items?.length)) {
                return { 
                    context : requestContext, 
                    error: { message: "Empty order received" }
                };
            }

            return await bppSelectService.ONDCSelect(
                requestContext.bpp_uri,
                orderRequest
            );
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCSelectOrderEvent(orderRequest) {
        try {
            const { context: requestContext = {}, message = {} } = orderRequest;
            const { provider = {}, items = [], fulfillments = [], payment = {} } = message.order;

            //TODO
            //Validations for Select item order

            // var validation_flag = new BAPValidator().validateSelect(orderRequest)

            // if(!validation_flag){
            //     return { message : { 
            //         "ack": { "status": "NACK" },  
            //         "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
            //     }
            // }
            
            if (!(items || items?.length)) {
                return { 
                    context : requestContext, 
                    error: { message: "Empty order received" }
                };
            }

            return await bppSelectService.ONDCSelect(
                requestContext.bpp_uri,
                orderRequest
            );
        }
        catch (err) {
            throw err;
        }
    }
}

export default SelectOrderService;
