import { protocolSelect } from "../../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
import { topics } from '../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../shared/database/redis.js";

class BppSelectService {


  /**
   * bpp select order
   * @param {Object} context
   * @param {Object} order
   * @returns
   */
  async ONDCSelect(uri, selectRequest = {}) {
    try {

      /*let topic = topics.BAP_BPP_SELECT
      await produceKafkaEvent(kafkaClusters.BG, topic, { uri, selectRequest })
      produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, selectRequest)
      let response = await redisSubscribe(selectRequest.context.message_id)
      return { context: selectRequest.context, message: response.message };
      */

      const response = await this.ONDCSelectEvent({ uri, selectRequest });
      return response;


    } catch (err) {
      throw err;
    }
  }

  async ONDCSelectEvent({ uri, selectRequest = {} }) {
    try {
      const response = await protocolSelect(uri, selectRequest);
      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default BppSelectService;
