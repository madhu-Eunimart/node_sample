import { PROTOCOL_CONTEXT } from "../../../../shared/utils/buyer_enums.js";
import BppReturnService from "./bppReturn.service.js";
import ContextFactory from "../../../../shared/factories/ContextFactory.js";
import CustomError from "../../../../shared/lib/errors/custom.error.js";
import { v4 as uuidv4} from 'uuid';
import { envdata } from "../../../config/config.js";
const bppReturnService = new BppReturnService();

class ReturnOrderService {

    /**
    * return order
    * @param {Object} orderRequest
    */
    async returnOrder(orderRequest) {
        try {

            // const orderDetails = await getOrderById(orderRequest.message.order_id);

            const { context: requestContext = {}, message: message = {} } = orderRequest || {};

            const contextFactory = new ContextFactory();
            // domain, country, city, action, bap 2, time stamp
            const context = contextFactory.create({
                domain: requestContext.domain ? requestContext.domain : envdata?.DOMAIN,
                country: requestContext.country ? requestContext.country : envdata?.COUNTRY,
                city: requestContext.city ? requestContext.city : envdata?.CITY,
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.RETURN,
                core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                ttl: requestContext.ttl ? requestContext.ttl : null,
                message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                timestamp: requestContext.timestamp ? requestContext.timestamp  : new Date().toISOString(),
                transactionId: requestContext.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                bapId: requestContext.bap_id ? requestContext.bap_id : envdata?.BAP_ID,
                bapUrl: requestContext.bap_uri ? requestContext.bap_id : envdata.BAP_URL,
                });
                //TODO:Delete Test
            const { order_id, return_reason_id } = message || {};

            if (!(context?.bpp_id)) {
                throw new CustomError("BPP Id is mandatory");
            }

            return await bppReturnService.returnOrder(
                context,
                order_id,
                return_reason_id
            );
        }
        catch (err) {
            throw err;
        }
    }

}

export default ReturnOrderService;
