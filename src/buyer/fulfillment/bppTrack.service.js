import { protocolTrack } from "../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../shared/eda/kafka.js'
import { topics } from '../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../shared/database/redis.js";

class BppTrackService {
    
    /**
     * track order
     * @param {Object} context 
     * @param {Object} trackRequest 
     * @returns 
     */
     async ONDCTrack(uri, context = {}, orderRequest = {}) {
        try {

            // let topic = topics.BAP_BPP_TRACK

            // await produceKafkaEvent(kafkaClusters.BG, topic, {uri, orderRequest})
           
            // produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, orderRequest)

            // let response = await redisSubscribe(orderRequest.context.message_id)
      
            // const response = await protocolTrack(uri, orderRequest);
            
            let response = await this.ONDCTrackEvent({uri,orderRequest})
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCTrackEvent({uri, orderRequest = {}}) {
        try {
            const response = await protocolTrack(uri, orderRequest);
            
            return response;
        }
        catch (err) {
            throw err;
        }
    }

}

export default BppTrackService;
