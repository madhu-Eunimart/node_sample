import { produceKafkaEvent, kafkaClusters } from '../../../../shared/eda/kafka.js'
import { topics } from '../../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../../shared/database/redis.js";
import { setSourceInRedis } from '../../../../shared/utils/helpers.js';
import BapStatusService from '../../../order/status/orderStatus.service.js'

let BapService = new BapStatusService()
class BppOrderStatusService {
    
    /**
     * bpp order status
     * @param {Object} context 
     * @param {Object} message 
     * @returns 
     */
    async getOrderStatus(uri, context, message = {}, sourceType) {
        try {

            const orderStatusRequest = {
                context: context,
                message: message
            }

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.STATUS, orderStatusRequest);


            // let topic = topics.CLIENT_API_BAP_STATUS

            // setSourceInRedis(sourceType, orderStatusRequest?.context?.message_id)

            // await produceKafkaEvent(kafkaClusters.BAP, topic, orderStatusRequest)

            // let response = await redisSubscribe(orderStatusRequest.context.message_id)
            let response = await BapService.ONDCOrderStatusEvent(orderStatusRequest)

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppOrderStatusService;
