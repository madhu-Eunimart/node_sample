import { BAPApiCall, bppProtocolOnStatus, protocolOrderStatus } from "../../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
import { topics } from '../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../shared/database/redis.js";

class BppOrderStatusService {
    
    /**
     * bpp order status
     * @param {Object} context 
     * @param {Object} message 
     * @returns 
     */
    async getOrderStatus(uri, context, message = {}) {
        try {

            const orderStatusRequest = {
                context: context,
                message: message
            }

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.STATUS, orderStatusRequest);


            // let topic = process.env.KAFKA_TOPIC_PREFIX + '.' + topics.CLIENT_API_BAP_STATUS

            // await produceKafkaEvent(topic, orderStatusRequest)

            // let response = await redisSubscribe(orderStatusRequest.context.message_id)

            let response = await this.getONDCOrderStatusEvent({uri, orderStatusRequest});

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * bpp order status
     * @param {Object} context 
     * @param {Object} message 
     * @returns 
     */
     async getONDCOrderStatus(uri, orderRequest) {
        try {
            
            // let topic = topics.BAP_BPP_STATUS

            // await produceKafkaEvent(kafkaClusters.BG, topic, {uri, orderRequest})
           
            // produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, orderRequest)


            // let response = await redisSubscribe(orderRequest.context.message_id)      

            // const response = await protocolOrderStatus(uri, orderRequest);
            let response = await this.getONDCOrderStatusEvent({uri, orderRequest});
            return { context: response.context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async getONDCOrderStatusEvent({uri, orderRequest}) {
        try {
            
            const response = await protocolOrderStatus(uri, orderRequest);

            return response;
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppOrderStatusService;
