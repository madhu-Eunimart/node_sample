import { PROTOCOL_CONTEXT } from "../../../../shared/utils/buyer_enums.js";
import ContextFactory from "../../../../shared/factories/ContextFactory.js";
import BppOrderStatusService from "./bppOrderStatus.service.js";
import { v4 as uuidv4 } from 'uuid';

const bppOrderStatusService = new BppOrderStatusService();

class OrderStatusService {
    /**
    * status order
    * @param {Object} order
    */
    async orderStatus(order, sourceType) {
        try {

            const { context: requestContext, message } = order || {};


            const contextFactory = new ContextFactory();
            const context = contextFactory.create(
                {
                    domain: requestContext.domain ? requestContext.domain : process.env.DOMAIN,
                    country: requestContext.country ? requestContext.country : process.env.COUNTRY,
                    city: requestContext.city ? requestContext.city : process.env.CITY,
                    action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.STATUS,
                    core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                    ttl: requestContext.ttl ? requestContext.ttl : null,
                    message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                    timestamp: requestContext.timestamp ? requestContext.timestamp : new Date().toISOString(),
                    transactionId: requestContext.transaction_id,
                    bppId: requestContext.bpp_id,
                    bppUrl: requestContext.bpp_uri,
                    bapId: requestContext.bap_id ? requestContext.bap_id : process.env.BAP_ID,
                    bapUrl: requestContext.bap_uri ? requestContext.bap_id : process.env.BAP_URL,
                }
            );
            //TODO:Delete Test
            context.bap_uri = "https://3fec-103-175-108-213.in.ngrok.io/api/v1/ondc/clientApis/bap/eunimart_bap/"
            return await bppOrderStatusService.getOrderStatus(
                requestContext?.bpp_uri,
                context,
                message,
                sourceType
            );
        }
        catch (err) {
            throw err;
        }
    }


}

export default OrderStatusService;
