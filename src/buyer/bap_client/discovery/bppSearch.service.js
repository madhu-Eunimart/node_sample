import { kafkaClusters, produceKafkaEvent } from "../../../shared/eda/kafka.js";
import { topics } from "../../../shared/eda/consumerInit/initConsumer.js";
import { redisSubscribe, redisClient } from "../../../shared/database/redis.js";
import { AddSearchRequest } from "../../../shared/db/dbService.js";
import { setSourceInRedis } from "../../../shared/utils/helpers.js";
import { FEE_TYPE } from "../../../shared/utils/constants.js";
// import { FEE_TYPE } from "../../../shared/utils/constants.js";
import BapSearchService from '../../discovery/search.service.js';
import { envdata } from "../../config/config.js";
const BAPService = new BapSearchService();

class BppSearchService {
  /**
   *
   * @param {Object} context
   * @param {Object} req
   * @returns
   */
  async search(context = {}, req = {}, sourceType) {
    try {
      const { criteria = {}, payment = {} } = req || {};
      console.log(criteria)
      const searchRequest = {
        context: context,
        message: {
          intent: {
            ...(criteria?.search_string && {
              item: {
                descriptor: {
                  name: criteria.search_string,
                },
              },
            }),
            ...((criteria?.provider_id ||
              criteria?.category_id ||
              criteria?.provider_name) && {
              provider: {
                ...(criteria?.provider_id && {
                  id: criteria?.provider_id,
                }),
                ...(criteria?.category_id && {
                  category_id: criteria.category_id,
                }),
                ...(criteria?.provider_name && {
                  descriptor: {
                    name: criteria?.provider_name,
                  },
                }),
              },
            }),
            ...((criteria?.pickup_location || criteria?.delivery_location) && {
              fulfillment: {
                type: "Delivery",
                ...(criteria?.pickup_location && {
                  start: {
                    location: {
                      gps: criteria?.pickup_location,
                    },
                  },
                }),
                ...(criteria?.delivery_location && {
                  end: {
                    location: {
                      gps: criteria?.delivery_location,
                    },
                  },
                }),
              },
            }),
            ...((criteria?.category_id || criteria?.category_name) && {
              category: {
                ...(criteria?.category_id && {
                  id: criteria?.category_id,
                }),
                ...(criteria?.category_name && {
                  descriptor: {
                    name: criteria?.category_name,
                  },
                }),
              },
            }),
            payment: {
              "@ondc/org/buyer_app_finder_fee_type":
              payment?.buyer_app_finder_fee_type ||
              FEE_TYPE.PERCENT,
              "@ondc/org/buyer_app_finder_fee_amount":
                payment?.buyer_app_finder_fee_amount ||
                envdata?.BAP_FINDER_FEE_AMOUNT,
            },
          },
        },
      };
      if(criteria?.area_code){
      searchRequest.message.intent.fulfillment.end.location["address"]={area_code:criteria?.area_code}
      }
      let search_req_added = await AddSearchRequest({ "transaction_id": searchRequest?.context?.transaction_id, ...searchRequest, 'source': sourceType})
      // setSourceInRedis(sourceType, searchRequest?.context?.message_id)
      // console.log("search_req_added", search_req_added);
      // let topic = topics.CLIENT_API_BAP_SEARCH;

      // await produceKafkaEvent(kafkaClusters.BAP, topic, searchRequest);

      // let searchResponse = await redisSubscribe(
      //   searchRequest.context.message_id
      // );
        // console.log("---redis response",searchResponse)
      // return { context: context, message: searchResponse.message }; 
      console.log("searchRequest =========> INSIDE BAP Client search ",searchRequest);

      let searchResponse = await BAPService.ONDCSearchEvent(searchRequest)
      return searchResponse;
    } catch (err) {
      throw err;
    }
  }
}

export default BppSearchService;
