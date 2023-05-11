import BapTrackService from '../../fulfillment/track.service.js';

const BapService = new BapTrackService()

class BppTrackService {
    
    /**
     * track order
     * @param {Object} context 
     * @param {Object} trackRequest 
     * @returns 
     */
    async track(uri, context = {}, message = {}, sourceType) {
        try {

            const trackRequest = {
                context: context,
                message: message
            }

            // let topic = topics.CLIENT_API_BAP_TRACK

            // setSourceInRedis(sourceType, trackRequest?.context?.message_id)

            // await produceKafkaEvent(kafkaClusters.BAP, topic, trackRequest)
           
            // let response = await redisSubscribe(trackRequest.context.message_id) 

            let response = await BapService.ONDCTrackOrderEvent(trackRequest)
                        
            // const response = await protocolTrack(uri, trackRequest);
            
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

}

export default BppTrackService;
