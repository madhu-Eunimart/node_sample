import { PROTOCOL_CONTEXT } from "../../../../shared/utils/buyer_enums.js";
import BppInitService from "./bppInit.service.js";
import ContextFactory from "../../../../shared/factories/ContextFactory.js";
import { v4 as uuidv4} from 'uuid';


const bppInitService = new BppInitService();

class InitOrderService {
    /**
    * init order
    * @param {Object} orderRequest
    * @param {Boolean} isMultiSellerRequest
    */
    async initOrder(orderRequest, companyId, authToken, sourceType, isMultiSellerRequest = false) {
        try {
            const { context: requestContext = {}, message: message = {} } = orderRequest || {};
            const { items = [], fulfillments = [], payment = {} } = message.order;
            const contextFactory = new ContextFactory();
            const context = contextFactory.create({
                domain: requestContext.domain ? requestContext.domain : process.env.DOMAIN,
                country: requestContext.country ? requestContext.country : process.env.COUNTRY,
                // city: requestContext.city ? requestContext.city : process.env.CITY, 
                city: requestContext.city,
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.INIT,
                core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                ttl: requestContext.ttl ? requestContext.ttl : null,
                message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                timestamp: requestContext.timestamp ? requestContext.timestamp  : new Date().toISOString(),
                transactionId: requestContext.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                bapId: requestContext.bap_id ? requestContext.bap_id : process.env.BAP_ID,
                bapUrl: requestContext.bap_uri ? requestContext.bap_id : process.env.BAP_URL,
                //...(!isMultiSellerRequest && { transactionId: requestContext?.transaction_id })
            });

            //TODO:Delete Test
            context.bap_uri = "https://c1bc-106-0-38-226.in.ngrok.io/api/v1/ondc/clientApis/bap/eunimart_bap/"
            if (!(items?.length)) {
                return {
                    context,
                    error: { message: "Empty order received" }
                };
            }
            if (message.order?.delivery?.location?.address?.areaCode == "") {
                return {
                    context,
                    error: { message: "Delivery address not received" }
                };
            }
            if (message.order?.billing?.address?.areaCode == "") {
                return {
                    context,
                    error: { message: "Billing address not received" }
                };
            }

            const bppResponse = await bppInitService.init(
                requestContext.bpp_uri,
                context,
                message.order,
                companyId,
                authToken,
                sourceType
            );

            return bppResponse;
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * init multiple orders
     * @param {Array} orders 
     * @param {Object} user
     */
    async initMultipleOrder(requestArray, companyId, sourceType) {

        const initOrderResponse = await Promise.all(
            requestArray.map(async request => {
                try {
                    let item_ids_Array =[]
                    for (let i = 0; i < request?.message?.order?.items.length; i++) {
                        item_ids_Array.push(request?.message?.order?.items[i]?.id || "")
                    }
                    let response = await this.initOrder(request, companyId, "",sourceType);
                    response.item_ids = item_ids_Array;
                    
                    return response;
                }
                catch (err) {
                    throw err;
                }

            })
        );

        return initOrderResponse;
    }
}

export default InitOrderService;
