import BppSupportService from "./bppSupport.service.js";
import BAPValidator from "../../shared/utils/validations/bap_validations/validations.js";

const bppSupportService = new BppSupportService();

class SupportService {

  /**
   * support order
   * @param {Object} orderRequest
   * @param {Boolean} isMultiSellerRequest
   */
  async ONDCSupportOrder(orderRequest) {
    try {
      const { context: requestContext = {}, message: refObj = {} } = orderRequest || {};

      var validation_flag = new BAPValidator().validateSupport(orderRequest)

      if (!validation_flag) {
        return {
          message: {
            "ack": { "status": "NACK" },
            "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
          }
        }
      }

      const bppResponse = await bppSupportService.ONDCSupport(
        requestContext.bpp_uri,
        orderRequest
      );

      return bppResponse;
    } catch (err) {
      throw err;
    }
  }

  async ONDCSupportOrderEvent(orderRequest) {
    try {

      const { context: requestContext = {}, message: refObj = {} } = orderRequest || {};

      var validation_flag = new BAPValidator().validateSupport(orderRequest)

      if (!validation_flag) {
        return {
          message: {
            "ack": { "status": "NACK" },
            "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
          }
        }
      }

      const bppResponse = await bppSupportService.ONDCSupport(
        requestContext.bpp_uri,
        orderRequest
      );

      return bppResponse;
    } catch (err) {
      throw err;
    }
  }

}

export default SupportService;
