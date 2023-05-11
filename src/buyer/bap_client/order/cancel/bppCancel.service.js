import { produceKafkaEvent, kafkaClusters } from '../../../../shared/eda/kafka.js'
import { topics } from '../../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../../shared/database/redis.js";
import { setSourceInRedis } from '../../../../shared/utils/helpers.js';
import { addOrUpdateOrderWithTransactionId } from '../../../../shared/db/dbService.js';
import BapCancelService from '../../../order/cancel/cancelOrder.service.js';

let BapService = new BapCancelService()

class BppCancelService {

    /**
     * 
     * @param {Object} context 
     * @param {String} orderId 
     * @param {String} cancellationReasonId 
     * @returns 
     */
    async cancelOrder(context, orderId, cancellationReasonId = "001", sourceType, orderDetails) {
        try {

            const cancelRequest = {
                context: context,
                message: {
                    order_id: orderId,
                    cancellation_reason_id: cancellationReasonId
                }
            }
            orderDetails.cancelRequest = cancelRequest

            await addOrUpdateOrderWithTransactionId(context?.transaction_id, orderDetails, orderDetails?.provider?.id)


            // let topic = topics.CLIENT_API_BAP_CANCEL

            // setSourceInRedis(sourceType, cancelRequest?.context?.message_id)

            // await produceKafkaEvent(kafkaClusters.BAP, topic, cancelRequest)

            // let response = await redisSubscribe(cancelRequest.context.message_id)

            let response = await BapService.ONDCCancelOrderEvent(cancelRequest)

            // const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.CANCEL, cancelRequest);

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppCancelService;
