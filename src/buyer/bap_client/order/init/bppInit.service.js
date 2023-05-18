import {
  PAYMENT_COLLECTED_BY,
  PAYMENT_TYPES,
  PAYMENT_COLLECTED_BY_STATUS,
} from "../../../../shared/utils/constants.js";
import { v4 as uuidv4 } from 'uuid';
// import {
//   addOrUpdateOrderWithTransactionId,
//   getCartByTransactionId, UpsertBapUserCartItem,
// } from "../../../../shared/db/dbService.js";
// import { setSourceInRedis } from "../../../../shared/utils/helpers.js";
import { envdata } from "../../../config/config.js";

import BapInitService from '../../../order/init/initOrder.service.js';
const BAPService = new BapInitService();


class BppInitService {
  /**
   * bpp init order
   * @param {Object} context
   * @param {Object} order
   * @param {String} parentOrderId
   */
  async init(uri, context, order = {}, companyId = 1, authToken = "", sourceType) {
    var is_collector
    try {
      const provider = order?.provider;
      // var orderCartDetails = await getCartByTransactionId(context.transaction_id, provider?.id);
      // var cart_provider = orderCartDetails?.select?.message?.order?.provider || provider
      var cart_provider = provider
      // console.log("Provider Details : ", JSON.stringify(provider))
      // console.log("Cart Details : ", JSON.stringify(orderCartDetails))
      // console.log("Cart Provider : ", JSON.stringify(cart_provider))

      var uri = envdata?.EUNIMART_CORE_HOST;
      var baseURL = envdata?.USER_COMPANY_DETAILS_BASE_PATH + companyId.toString();
      try {
        const apiCall = new HttpRequest(uri,
          baseURL,
          "GET",
          {},
          {
            "Authorization": authToken,
            "Accept": "application/json"
          }
        );
        const company_result = await apiCall.send();
        is_collector = company_result?.data?.data?.ondc_details?.is_collector || true

      } catch (error) {
        is_collector = true
      }

      var collected_by = PAYMENT_COLLECTED_BY.EMPTY
      var collected_by_status = PAYMENT_COLLECTED_BY_STATUS.EMPTY

      if (is_collector == true) {
        collected_by = PAYMENT_COLLECTED_BY.BAP
        collected_by_status = PAYMENT_COLLECTED_BY_STATUS.ASSERT
      }


      if (order.billing.address.country == "") {
        order.billing.address.country = "India"
      }
      // if (order.delivery.location.address.country == "") {
      //   order.delivery.location.address.country = "India"
      // }

      for (let i = 0; i < order?.fulfillments.length; i++) {
        if (order?.fulfillments?.[i]?.["end"]?.["location"]?.["address"]?.["country"] == "") {
          order.fulfillments[i].end.location.address.country = "India"
        }
        order.fulfillments[i]["provider_id"] = cart_provider?.id || context.bpp_id || ""
        order.fulfillments[i]["type"] = "Delivery"
      }

      // orderCartDetails.order.fulfillments = JSON.parse(JSON.stringify(order?.fulfillments || {}))

      order.billing.address.name = order?.billing?.address?.name || order.billing.name || ""
      order.billing.address.locality = order?.billing?.address?.locality || order?.fulfillments[0].end?.location?.address?.locality || ""
      delete order?.billing?.gps;

      const initRequest = {
        context: context,
        message: {
          order: {
            provider: cart_provider,
            items: order?.items || [],
            // add_ons: [],
            // offers: [],
            billing: {
              ...order.billing,
              created_at: context.timestamp,
              updated_at: context.timestamp,
            },
            fulfillments: order?.fulfillments
          },
        },
      };
      for (let i = 0; i < initRequest?.message?.order?.fulfillments.length; i++) {
        delete order?.fulfillments?.[i]?.end?.contact?.email
        delete order?.fulfillments?.[i]?.tracking
        delete order?.fulfillments?.[i]?.provider_id
        delete order?.fulfillments?.[i]?.["@ondc/org/TAT"];
        delete order?.fulfillments?.[i]?.["@ondc/org/category"];
        delete order?.fulfillments?.[i]?.["@ondc/org/provider_name"];
        delete order?.fulfillments?.[i]?.["state"];
      }

      let filterQuery = {
        transactionId: context?.transaction_id,
        providerId: cart_provider?.id
      }

      // Object.assign(orderCartDetails, {
      //   init_req: initRequest,
      //   order_id: uuidv4(),
      //   source: sourceType,
      // })


      // await UpsertBapUserCartItem(filterQuery, orderCartDetails);
      // setSourceInRedis(sourceType, initRequest?.context?.message_id)

      console.log("Filter Query ===>>> ", filterQuery)
      console.log("====>>> Cart upserted successfully <<<====");




      /*
      let topic = topics.CLIENT_API_BAP_INIT
      await produceKafkaEvent(kafkaClusters.BAP, topic, initRequest)
      let response = await redisSubscribe(context.message_id)
      return { context: response.context, message: response.message };
      */

      let initResponse = await BAPService.ONDCInitOrderEvent(initRequest)
      return initResponse;

    } catch (err) {
      throw err;
    }
  }
}

export default BppInitService;
