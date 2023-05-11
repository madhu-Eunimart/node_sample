import { BAPApiCall, bppProtocolOnCancel, protocolCancel } from "../../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
import { topics } from '../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../shared/database/redis.js";

class BppCancelService {

    /**
     * 
     * @param {Object} context 
     * @param {String} orderId 
     * @param {String} cancellationReasonId 
     * @returns 
     */
    async cancelOrder(context, orderId, cancellationReasonId = "001") {
        try {

            const cancelRequest = {
                context: context,
                message: {
                    order_id: orderId,
                    cancellation_reason_id: cancellationReasonId
                }
            }

            let topic = process.env.KAFKA_TOPIC_PREFIX + '.' +topics.CLIENT_API_BAP_CANCEL

            await produceKafkaEvent(topic, cancelRequest)
                 
            let response = await redisSubscribe(cancelRequest.context.message_id)       

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.CANCEL, cancelRequest);

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
     * @param {String} cancellationReasonId 
     * @returns 
     */
     async ONDCCancelOrder(uri, context = {}, orderRequest = {}) {
        try {

            // let topic = topics.BAP_BPP_CANCEL

            // await produceKafkaEvent(kafkaClusters.BG, topic, {uri, orderRequest})
            
            // produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, orderRequest)

            // let response = await redisSubscribe(orderRequest.context.message_id)
            
            // const response = await protocolCancel(context.bpp_uri, orderRequest);

            let response = await this.ONDCCancelOrderEvent({uri,orderRequest})
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCCancelOrderEvent({uri, orderRequest = {}}) {
        try {

            const response = await protocolCancel(uri, orderRequest);

            return response;
        }
        catch (err) {
            throw err;
        }
    }

}

export default BppCancelService;
