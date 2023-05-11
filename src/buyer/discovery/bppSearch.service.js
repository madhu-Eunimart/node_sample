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

          console.log("searchRequest =========> INSIDE BAP search ",searchRequest);
          const response = await this.ONDCSearchEvent(searchRequest);
          return response;
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
