import { protocolInit } from "../../../shared/utils/protocolApis/index.js";

class BppInitService {

  /**
   *
   * @param {Object} context
   * @param {Object} req
   * @returns
   */
  async ONDCInit(uri, initRequest) {
    try {
      /*
      let topic = topics.BAP_BPP_INIT
      await produceKafkaEvent(kafkaClusters.BG, topic, {uri, initRequest})
      produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, initRequest)
      let response = await redisSubscribe(initRequest.context.message_id)
      return { context: response.context, message: response.message };
      */

      const response = await this.ONDCInitEvent({uri, initRequest});
      return response;

    } catch (err) {
      console.log("err", err);
      throw err;
    }
  }

  async ONDCInitEvent({ uri, initRequest }) {
    try {

      const response = await protocolInit(uri, initRequest);

      return response;
    } catch (err) {
      throw err;
    }
  }
}

export default BppInitService;
