import { UpsertBapUserCartItem } from "../../../../shared/db/dbService.js";
import { setSourceInRedis } from "../../../../shared/utils/helpers.js";


import BapSelectService from '../../../order/select/selectOrder.service.js';
const BAPService = new BapSelectService();

class BppSelectService {
  /**
   * bpp select order
   * @param {Object} context
   * @param {Object} order
   * @returns
   */
  async select(uri, context, orderRequest = {}, sourceType) {
    try {
      const { order = {}, fulfillments = [] } = orderRequest || {};

      const provider = order?.provider;
      const CreatedBy = orderRequest?.CreatedBy;
      let provider_locations = []
      provider.locations.map((location) => {
        let obj = provider_locations.find(Location => Location.id === location.id);
        if (!obj) {
          provider_locations.push({ id: location.id });
        }
      });

      const selectRequest = {
        context: context,
        message: {
          order: {
            items:
              order.items.map((cartItem) => {
                return {
                  id: cartItem?.id?.toString(),
                  location_id: cartItem?.location_ids?.[0] || cartItem?.location_id || "",
                  quantity: { count: cartItem?.quantity },
                };
              }) || [],
            provider: {
              id: provider?.id,
              locations: provider_locations
            },
            fulfillments:
              fulfillments && fulfillments.length ? [...fulfillments] : []
          },
        },
      };
      let itemId = order?.items?.[0]?.id
      order.provider = selectRequest?.message?.order?.provider
      let cart = {
        order: order,
        context: context,
        select: selectRequest,
        transactionId: context?.transaction_id,
        source: sourceType
      }

      let filterQuery = {
        CreatedBy: CreatedBy,
        itemId: itemId,
        providerId: selectRequest?.message?.order?.provider?.id
      }
      await UpsertBapUserCartItem(filterQuery, cart);
      setSourceInRedis(sourceType, selectRequest?.context?.message_id)

      console.log("Filter Query ===>>> ", filterQuery)
      console.log("====>>> Cart upserted successfully <<<====");

      /*let topic = topics.CLIENT_API_BAP_SELECT

      await produceKafkaEvent(kafkaClusters.BAP, topic, selectRequest)

      let selectResponse = await redisSubscribe(selectRequest.context.message_id)
      return { context: context, message: selectResponse.message };
      */

      let selectResponse = await BAPService.ONDCSelectOrderEvent(selectRequest)
      return selectResponse;

    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default BppSelectService;
