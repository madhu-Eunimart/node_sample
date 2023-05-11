import BppTrackService from "./bppTrack.service.js";
import BAPValidator from "../../shared/utils/validations/bap_validations/validations.js";

const bppTrackService = new BppTrackService();

class TrackService {

    /**
    * track order
    * @param {Object} orderRequest
    * @param {Boolean} isMultiSellerRequest
    */
    async ONDCTrackOrder(orderRequest, isMultiSellerRequest = false) {
        try {
            const { context: requestContext = {}, message: order = {} } = orderRequest || {};

            var validation_flag = new BAPValidator().validateTrack(orderRequest)

            if(!validation_flag){
                return { message : { 
                        "ack": { "status": "NACK" },  
                        "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
                    }
            }

            const bppResponse = await bppTrackService.ONDCTrack(
                requestContext.bpp_uri,
                requestContext,
                orderRequest
            );

            return bppResponse;
        }
        catch (err) {
            throw err;
        }
    }

    async ONDCTrackOrderEvent(orderRequest) {
        try {
            const { context: requestContext = {}, message: order = {} } = orderRequest || {};

            var validation_flag = new BAPValidator().validateTrack(orderRequest)

            if(!validation_flag){
                return { message : { 
                    "ack": { "status": "NACK" },  
                    "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" } } 
                }
            }

            const bppResponse = await bppTrackService.ONDCTrack(
                requestContext.bpp_uri,
                requestContext,
                orderRequest
            );

            return bppResponse;
        }
        catch (err) {
            throw err;
        }
    }
}

export default TrackService;
