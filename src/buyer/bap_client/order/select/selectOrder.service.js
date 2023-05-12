import { PROTOCOL_CONTEXT } from "../../../../shared/utils/buyer_enums.js";
import ContextFactory from "../../../../shared/factories/ContextFactory.js";
import BppSelectService from "./bppSelect.service.js";
import { v4 as uuidv4 } from 'uuid';

const bppSelectService = new BppSelectService();

class SelectOrderService {
    /**
    * select order
    * @param {Object} orderRequest
    */
    async selectOrder(orderRequest, sourceType) {
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
            //TODO:Delete Test

            if (!(order?.items || order?.items?.length)) {
                return { 
                    context, 
                    error: { message: "Empty order received" }
                };
            }
            
            return await bppSelectService.select(
                requestContext.bpp_uri,
                context,
                { order, fulfillments, CreatedBy },
                sourceType
            );
        }
        catch (err) {
            // console.log("Error in SelectOrder (service.js)");
            console.log(err);
            throw err;
        }
    }
    
    /**
     * select multiple orders
     * @param {Array} requests 
     */
    async selectMultipleOrder(requestArray, sourceType) {

        const transactionId = requestArray[0]?.context?.transactionId || uuidv4()

        const selectOrderResponse = await Promise.all(
            requestArray.map(async request => {
                try {
                    let item_ids_Array =[]
                    for (let i = 0; i < request?.message?.order?.items.length; i++) {
                        item_ids_Array.push(request?.message?.order?.items[i]?.id || "")
                    }
                    request.context.transaction_id = transactionId
                    let response = await this.selectOrder(request, sourceType);
                    response.item_ids = item_ids_Array;
                    
                    return response;
                }
                catch (err) {
                    throw err;
                }
            })
        );

        return selectOrderResponse;
    }
}

export default SelectOrderService;
