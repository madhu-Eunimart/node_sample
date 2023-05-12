import { JUSPAY_PAYMENT_STATUS, PAYMENT_TYPES, PROTOCOL_CONTEXT, PROTOCOL_PAYMENT, SUBSCRIBER_TYPE } from "../../../../shared/utils/buyer_enums.js";
import ContextFactory from "../../../../shared/factories/ContextFactory.js";
import BppConfirmService from "./bppConfirm.service.js";
import JuspayService from "../../payment/juspay.service.js";
import { v4 as uuidv4 } from 'uuid';

const bppConfirmService = new BppConfirmService();
const juspayService = new JuspayService();

class ConfirmOrderService {

    /**
     * 
     * @param {Array} items 
     * @returns Boolean
     */
    areMultipleBppItemsSelected(items) {
        return items ? [...new Set(items.map(item => item.bpp_id))].length > 1 : false;
    }

    /**
     * 
     * @param {Object} payment
     * @param {String} orderId
     * @param {Boolean} confirmPayment
     * @returns Boolean
     */
    async arePaymentsPending(payment, orderId, total, confirmPayment = true) {
        if (payment?.type !== PAYMENT_TYPES["ON-ORDER"])
            return false;
        let paymentDetails = {}
        try{
            paymentDetails = (confirmPayment && await juspayService.getOrderStatus(orderId)) || {};
        }
        catch {
            paymentDetails = null
        }
        // return payment == null ||
        //     payment.paid_amount <= 0 ||
        //     total <= 0 ||
        //     (
        //         confirmPayment &&
        //         ((process.env.NODE_ENV === "prod" &&
        //             total !== paymentDetails?.amount) ||
        //             paymentDetails?.status !== JUSPAY_PAYMENT_STATUS.CHARGED.status)
        //     );
        return false
    }

    /**
    * confirm order
    * @param {Object} orderRequest
    */
    async confirmOrder(orderRequest,createdBy,sourceType) {
        try {

            const { context: requestContext, message: order = {} } = orderRequest || {};
            const contextFactory = new ContextFactory();
            const context = contextFactory.create({
                domain: requestContext.domain ? requestContext.domain : process.env.DOMAIN,
                country: requestContext.country ? requestContext.country : process.env.COUNTRY,
                city: requestContext.city ? requestContext.city : process.env.CITY,
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.CONFIRM,
                core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                ttl: requestContext.ttl ? requestContext.ttl : null,
                message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                timestamp: requestContext.timestamp ? requestContext.timestamp : new Date().toISOString(),
                transactionId: requestContext.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                bapId: requestContext.bap_id ? requestContext.bap_id : process.env.BAP_ID,
                bapUrl: requestContext.bap_uri ? requestContext.bap_id : process.env.BAP_URL,
            });
            //TODO:Delete Test
            if (!(order?.items?.length)) {
                return {
                    context,
                    error: { message: "Empty order received" }
                };
            }
            else if (this.areMultipleBppItemsSelected(order?.items)) {
                
                return {
                    context,
                    error: { message: "More than one BPP's item(s) selected/initialized" }
                };
            }
            
            // else if (this.areMultipleProviderItemsSelected(order?.items)) {
            //     return {
            //         context,
            //         error: { message: "More than one Provider's item(s) selected/initialized" }
            //     };
            // } 
            
            else if (await this.arePaymentsPending(
                order?.payment,
                orderRequest?.context?.transaction_id,
                order?.payment?.paid_amount
            )) {
                                                
                return {
                    context,
                    error: {
                        message: "BAP hasn't received payment yet",
                        status: "BAP_015",
                        name: "PAYMENT_PENDING"
                    }
                };
            }

            // let paymentStatus = await juspayService.getOrderStatus(orderRequest?.context?.transaction_id);
            
            return await bppConfirmService.confirmV1(
                requestContext.bpp_uri,
                context,
                order,
                createdBy,
                sourceType
            );
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * confirm multiple orders
     * @param {Array} orders 
     */
    async confirmMultipleOrder(requestArray, sourceType) {
        const confirmOrderResponse = await Promise.all(
            requestArray.map(async request => {
                try {
                    let item_ids_Array =[]
                    for (let i = 0; i < request?.message?.items.length; i++) {
                        item_ids_Array.push(request?.message?.items[i]?.id || "")
                    }
                    let response = await this.confirmOrder(request, "", sourceType);
                    response.item_ids = item_ids_Array;
                    return response
                }
                catch (err) {
                    throw err;
                }
            })
        );

        return confirmOrderResponse;
    }


}

export default ConfirmOrderService;
