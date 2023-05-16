import { PROTOCOL_CONTEXT } from "../../../shared/utils/buyer_enums.js";

import ContextFactory from "../../../shared/factories/ContextFactory.js";
import BppOrderStatusService from "./bppOrderStatus.service.js";
import BAPValidator from "../../../shared/utils/validations/bap_validations/validations.js";
import { v4 as uuidv4} from 'uuid';
import { envdata } from "../../config/config.js";
const bppOrderStatusService = new BppOrderStatusService();

class OrderStatusService {
    /**
    * status order
    * @param {Object} order
    */
    async orderStatus(order) {
        try {

            const { context: requestContext, message } = order || {};


            const contextFactory = new ContextFactory();
            const context = contextFactory.create(
                {
                domain: requestContext.domain ? requestContext.domain : envdata?.DOMAIN,
                country: requestContext.country ? requestContext.country : envdata?.COUNTRY,
                city: requestContext.city ? requestContext.city : envdata?.CITY,
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.STATUS,
                core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                ttl: requestContext.ttl ? requestContext.ttl : null,
                message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                timestamp: requestContext.timestamp ? requestContext.timestamp  : new Date().toISOString(),
                transactionId: requestContext.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                bapId: requestContext.bap_id ? requestContext.bap_id : envdata?.BAP_ID,
                bapUrl: requestContext.bap_uri ? requestContext.bap_id : envdata.BAP_URL,
                }
                );

            return await bppOrderStatusService.getOrderStatus(
                requestContext?.bpp_uri,
                context,
                message
            );
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * status order
    * @param {Object} order
    */
     async ONDCOrderStatus(orderRequest) {
        try {

            const { context: requestContext = {}, message = {} } = orderRequest;

            var validation_flag = new BAPValidator().validateStatus(orderRequest)

            if(!validation_flag){
                return { message : { 
                        "ack": { "status": "NACK" },  
                        "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
                    }
            }

            return await bppOrderStatusService.getONDCOrderStatus(
                requestContext.bpp_uri,
                orderRequest
            );
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCOrderStatusEvent(orderRequest) {
        try {

            const { context: requestContext = {}, message = {} } = orderRequest;

            var validation_flag = new BAPValidator().validateStatus(orderRequest)

            if(!validation_flag){
                return { message : { 
                    "ack": { "status": "NACK" },  
                    "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
                }
            }

            return await bppOrderStatusService.getONDCOrderStatus(
                requestContext.bpp_uri,
                orderRequest
            );
        }
        catch (err) {
            throw err;
        }
    }

}

export default OrderStatusService;
