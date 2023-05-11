import { PROTOCOL_CONTEXT } from "../../../shared/utils/buyer_enums.js";
import BppSupportService from "./bppSupport.service.js";
import ContextFactory from "../../../shared/factories/ContextFactory.js";
import { v4 as uuidv4} from 'uuid';

const bppSupportService = new BppSupportService();

class SupportService {
  /**
   * support order
   * @param {Object} orderRequest
   * @param {Boolean} isMultiSellerRequest
   */
  async supportOrder(orderRequest, sourceType, isMultiSellerRequest = false) {
    try {
      const { context: requestContext, message: message} = orderRequest || {};

      const contextFactory = new ContextFactory();
      const context = contextFactory.create({
        domain: requestContext.domain ? requestContext.domain : process.env.DOMAIN,
                country: requestContext.country ? requestContext.country : process.env.COUNTRY,
                city: requestContext.city ? requestContext.city : process.env.CITY,
                action: requestContext.action ? requestContext.action : PROTOCOL_CONTEXT.SUPPORT,
                core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                ttl: requestContext.ttl ? requestContext.ttl : null,
                message_id: requestContext.message_id ? requestContext.message_id : uuidv4(),
                timestamp: requestContext.timestamp ? requestContext.timestamp  : new Date().toISOString(),
                transactionId: requestContext.transaction_id,
                bppId: requestContext.bpp_id,
                bppUrl: requestContext.bpp_uri,
                bapId: requestContext.bap_id ? requestContext.bap_id : process.env.BAP_ID,
                bapUrl: requestContext.bap_uri ? requestContext.bap_id : process.env.BAP_URL,
      });

      const bppResponse = await bppSupportService.support(
        requestContext?.bpp_uri,
        context,
        message,
        sourceType
      );

      return bppResponse;
    } catch (err) {
      throw err;
    }
  }
}

export default SupportService;
