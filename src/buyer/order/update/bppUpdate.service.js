//@ts-check
import _ from "lodash";
// import { upsertBapOrder } from "../../../shared/db/dbService.js";
import ContextFactory from "../../../shared/factories/ContextFactory.js";
import { PROTOCOL_CONTEXT, return_status } from "../../../shared/utils/constants.js";
import { BAPApiCall, bppProtocolOnUpdate, protocolUpdate } from "../../../shared/utils/protocolApis/index.js";
import PROTOCOL_API_URLS from "../../../shared/utils/protocolApis/routes.js";
import { v4 as uuidv4 } from 'uuid';
import { Configuration } from "../../config/config.js";
class BppUpdateService {

    /**
     *     
     * @param {String} uri 
     * @param {Object} context 
     * @param {String} update_target 
     * @param {Object} order 
     * @returns 
     */
    async update(uri, context, update_target, order) {
        try {

            const updateRequest = {
                context: context,
                message: {
                    update_target: update_target,
                    order: order
                }
            }

            const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.UPDATE, updateRequest);
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * 
     * @param {String} uri 
     * @param {Object} orderRequest 
     * @returns 
     */
    async ONDCUpdate(uri, orderRequest) {
        try {

            const response = await protocolUpdate(uri, orderRequest);
            return { context: response.context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    async settlementUpdate(response, orderDetails, is_refund = false) {
        try {
            let { context: requestContext = {}, message: message = {} } = response || {};

            if (_.isEmpty(response)) {
                requestContext = orderDetails?.context || {};
            }


            const contextFactory = new ContextFactory();
            const context = contextFactory.create(
                {
                    domain: requestContext.domain ? requestContext.domain : Configuration?.DOMAIN,
                    country: requestContext.country ? requestContext.country : Configuration?.COUNTRY,
                    city: requestContext.city ? requestContext.city : Configuration?.CITY,
                    action: PROTOCOL_CONTEXT.UPDATE,
                    core_version: requestContext.core_version ? requestContext.core_version : PROTOCOL_CONTEXT.CORE_VERSION,
                    ttl: requestContext.ttl ? requestContext.ttl : null,
                    message_id: uuidv4(),
                    timestamp: new Date().toISOString(),
                    transactionId: requestContext.transaction_id,
                    bppId: requestContext.bpp_id,
                    bppUrl: requestContext.bpp_uri,
                    bapId: requestContext.bap_id ? requestContext.bap_id : Configuration?.BAP_ID,
                    bapUrl: requestContext.bap_uri ? requestContext.bap_id : Configuration.BAP_URL,
                }
            );


            let items = message?.order?.items || orderDetails.items;

            const updateRequest = {
                context: context,
                message: {
                    update_target: "billing",
                    order: {
                        "id": message?.order?.id || orderDetails.id,
                        provider: {
                            id: orderDetails?.provider?.id,
                        },
                        "items": items
                    }
                }
            }

            if (is_refund) {
                let settlement_details = [], refund_amount;

                refund_amount = (parseFloat(orderDetails.quote.price.value) - parseFloat(response.message.order.quote.price.value)).toFixed(2)

                let settlement_item = {
                    "settlement_counterparty": "buyer",
                    "settlement_phase": "refund",
                    "settlement_type": "upi",
                    "settlement_amount": refund_amount.toString(),
                    "settlement_timestamp": context?.timestamp
                }

                settlement_details.push(settlement_item)

                updateRequest.message.order["payment"] = { '@ondc/org/settlement_details': settlement_details };
                orderDetails.payment['@ondc/org/settlement_details'].push(settlement_item)

            } else {

                orderDetails.payment['@ondc/org/settlement_details'].map(settlement => {

                    if (settlement.settlement_phase == 'sale-amount') {
                        settlement.settlement_timestamp = response.settlement_timestamp;
                        settlement.settlement_reference = response.settlement_reference;
                        settlement.settlement_status = 'PAID';
                    }

                });

                updateRequest.message.order["payment"] = orderDetails.payment;
            }

            let query = {
                transactionId: orderDetails?.transactionId,
                id: orderDetails?.id
            }

            const bap_response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.UPDATE, updateRequest);

            // await upsertBapOrder(query, orderDetails)
            return bap_response;
        }
        catch (err) {
            throw err;
        }
    }

}

export default BppUpdateService;
