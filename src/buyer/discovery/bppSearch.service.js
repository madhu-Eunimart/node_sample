import { protocolSearch, bppProtocolOnSearch, BAPApiCall } from "../../shared/utils/protocolApis/index.js";
import { kafkaClusters, produceKafkaEvent } from '../../shared/eda/kafka.js'
import { topics } from '../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../shared/database/redis.js";


class BppSearchService {

    /**
     * 
     * @param {Object} context 
     * @param {Object} req 
     * @returns 
     */
     async ONDCSearch(searchRequest) {
      try {
          // const { criteria = {}, payment = {} } = req || {};

            let topic = topics.BAP_BPP_SEARCH

            await produceKafkaEvent(kafkaClusters.BG,topic, searchRequest)
           
            let response = await redisSubscribe(searchRequest.context.message_id)

        //   const response = await protocolSearch(searchRequest);
         return { context: response.context, message: response.message };
      }
      catch (err) {
          throw err;
      }
  }

    async ONDCSearchEvent(searchRequest) {
    try {
        
        const response = await protocolSearch(searchRequest);

        return response;
    }
    catch (err) {
        throw err;
    }
    }

}

export default BppSearchService;
