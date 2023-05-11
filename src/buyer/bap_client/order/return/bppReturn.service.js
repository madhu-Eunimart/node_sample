import { produceKafkaEvent, kafkaClusters } from '../../../../shared/eda/kafka.js'
import { topics } from '../../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../../shared/database/redis.js";

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

            let topic = topics.CLIENT_API_BAP_RETURN
            await produceKafkaEvent(kafkaClusters.BAP, topic, returnRequest)
                 
            let response = await redisSubscribe(returnRequest.context.message_id)       

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.RETURN, returnRequest);
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppReturnService;
