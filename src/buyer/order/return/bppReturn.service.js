import { PROTOCOL_CONTEXT } from "../../../shared/utils/buyer_enums.js";
import { BAPApiCall, bppProtocolOnReturn, protocolReturn } from "../../../shared/utils/protocolApis/index.js";
import PROTOCOL_API_URLS from "../../../shared/utils/protocolApis/routes.js";
import { addOrUpdateOrderWithTransactionId, getOrderById, getOrderByTransactionId } from "../../../shared/db/dbService.js";
import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
import { topics } from '../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../shared/database/redis.js";
import { Configuration } from "../../config/config.js";

class BppReturnService {

    /**
     * 
     * @param {Object} context 
     * @param {String} orderId 
     * @param {String} returnReasonId 
     * @returns 
     */
    async returnOrder(context, orderId, returnReasonId = "001") {
        try {

            const returnRequest = {
                context: context,
                message: {
                    order_id: orderId,
                    return_reason_id: returnReasonId
                }
            }

            let topic = process.env.KAFKA_TOPIC_PREFIX + '.' +topics.CLIENT_API_BAP_RETURN

            await produceKafkaEvent(topic, returnRequest)
                 
            let response = await redisSubscribe(returnRequest.context.message_id)       

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.RETURN, returnRequest);

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }


    /**
     * 
     * @param {Object} context 
     * @param {String} orderId 
     * @param {String} returnReasonId 
     * @returns 
     */
     async ONDCReturnOrder(uri, context = {}, orderRequest = {}) {
        try {

            let topic = topics.BAP_BPP_RETURN

            await produceKafkaEvent(kafkaClusters.BG, topic, {uri, orderRequest})
            
            produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, orderRequest)
            
            let response = await redisSubscribe(orderRequest.context.message_id)
      
            // const response = await protocolReturn(context.bpp_uri, orderRequest);

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCReturnOrderEvent({uri, orderRequest = {}}) {
        try {

            const response = await protocolReturn(uri, orderRequest);

            return response;
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * bpp on return order
    * @param {Object} context
    * @param {Object} order
    * @param {String} parentOrderId
    */
     async bppOnReturnResponse(uri, orderRequest) {
        try {

            const context = orderRequest.context;
            const message = orderRequest.message;
            context.bpp_uri = Configuration?.BPP_URL;
            context.bpp_id = Configuration?.BPP_ID;
            context.action = PROTOCOL_CONTEXT.ON_RETURN;
            context.timestamp = new Date().toISOString();
            
            
            // const { context: requestContext = {}, message: message = {} } = orderRequest || {};
            // requestContext.bpp_uri = Configuration?.BPP_URL;
            // requestContext.bpp_id = Configuration?.BPP_ID;
            // requestContext.action = PROTOCOL_CONTEXT.ON_RETURN;
            // requestContext.timestamp = new Date().toISOString();

            // const orderDetails = await getOrderByTransactionId(orderRequest.message.order_id, orderRequest?.message?.order?.provider?.id);
            const orderDetails={}
            const returnRequest = {
              context: context,
              message: {
                "order":
                {
                  "id": orderDetails?.id,  // need to check case
                  "state": "Returnled",
                  "tags":{
                    "return_reason_id": orderRequest.message.return_reason_id
                  }
                }
              },
            };

            if (typeof orderDetails !== "undefined"){
                orderDetails.state = "Returnled";
            }


            // await addOrUpdateOrderWithTransactionId(orderDetails?.transactionId, {
            //     ...orderDetails },
            //     orderDetails?.provider?.id
            //   );


            await bppProtocolOnReturn(uri, returnRequest);
        }
        catch (err) {
            throw err;
        }
    }

}

export default BppReturnService;
