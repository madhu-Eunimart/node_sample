import { addOrUpdateOrderWithTransactionId, getOrderByTransactionId } from '../../../shared/db/dbService.js';
import { RETAIL_ORDER_STATE } from '../../../shared/utils/constants.js';
import { BAPApiCall, bppProtocolOnConfirm, protocolConfirm } from '../../../shared/utils/protocolApis/index.js';

class BppConfirmService {
    /**
     * 
     * @param {Object} context 
     * @param {Object} req 
     * @returns 
     */
    async ONDCConfirm(uri, confirmRequest) {
        try {
            /*
            let topic = topics.BAP_BPP_CONFIRM
            await produceKafkaEvent(kafkaClusters.BG, topic, { uri, confirmRequest })
            produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, confirmRequest)
            let response = await redisSubscribe(confirmRequest.context.message_id)
            return { context: confirmRequest.context, message: response.message };
            */

            const response = await this.ONDCConfirmEvent({ uri, confirmRequest });

            if (response.message.ack.status == 'ACK') {
                addOrUpdateOrderWithTransactionId(confirmRequest.context?.transaction_id, { received_on_confirm: false, retry_count:1 }, confirmRequest.order?.provider?.id)
                return response;
            }
            else {
                addOrUpdateOrderWithTransactionId(confirmRequest.context?.transaction_id, { state: RETAIL_ORDER_STATE.CANCELLED }, confirmRequest.order?.provider?.id)
                return response;
            }
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCConfirmEvent({ uri, confirmRequest }) {
        try {
            const response = await protocolConfirm(uri, confirmRequest);
            return response;
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppConfirmService;
