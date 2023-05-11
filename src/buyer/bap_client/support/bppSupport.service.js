import BapSupportService from '../../support/support.service.js';
let BapService = new BapSupportService()

class BppSupportService {
    /**
     * support
     * @param {Object} context 
     * @param {String} refObj 
     * @returns 
     */
    async support(uri, context = {}, refObj, sourceType) {
        try {

            const supportRequest = {
                context: context,
                message: {
                    // ref_id: refObj?.ref_id
                    ref_id: context?.transaction_id
                }
            }

            // let topic = topics.CLIENT_API_BAP_SUPPORT

            // setSourceInRedis(sourceType, supportRequest?.context?.message_id)

            // await produceKafkaEvent(kafkaClusters.BAP, topic, supportRequest)
           
            // let response = await redisSubscribe(supportRequest.context.message_id) 
  
            // const response = await protocolSupport(uri, supportRequest);

            let response = await BapService.ONDCSupportOrderEvent(supportRequest)

            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppSupportService;
