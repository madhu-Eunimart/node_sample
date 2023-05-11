import { protocolSupport } from "../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../shared/eda/kafka.js'
import { topics } from '../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../shared/database/redis.js";

class BppSupportService {
     /**
     * support
     * @param {Object} context 
     * @param {String} refObj 
     * @returns 
     */
    async ONDCSupport(uri, supportRequest) {
        try {     

            // let topic = topics.BAP_BPP_SUPPORT

            // await produceKafkaEvent(kafkaClusters.BG, topic, {uri, supportRequest})
           
            // produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, supportRequest)

            // let response = await redisSubscribe(supportRequest.context.message_id)
        
            // const response = await protocolSupport(uri, supportRequest);
       
            let response = await this.ONDCSupportEvent({uri,supportRequest})
            return { context: response.context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCSupportEvent({uri, supportRequest}) {
        try {       
            const response = await protocolSupport(uri, supportRequest);
            
            return response;
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppSupportService;
