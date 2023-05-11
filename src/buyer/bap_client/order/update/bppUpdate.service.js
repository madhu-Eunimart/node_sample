import { addOrUpdateOrderWithTransactionId, getOrderByTransactionId, getProductById } from "../../../../shared/db/dbService.js";
import { setSourceInRedis } from "../../../../shared/utils/helpers.js";
import { BAPApiCall } from "../../../../shared/utils/protocolApis/index.js";
import PROTOCOL_API_URLS from "../../../../shared/utils/protocolApis/routes.js";

class BppUpdateService {

    /**
     * 
     * @param {Object} context 
     * @param {String} orderId 
     * @param {String} cancellationReasonId 
     * @returns 
     */
    async update(uri, context, update_target, order, sourceType) {
        try {
            const updateRequest = {
                context: context,
                message: {
                    update_target: update_target,
                    order: {
                        "id": order?.id,
                        provider: {
                            id: order?.provider?.id,
                        },
                        "items": {}
                    }
                }
            }
            let bap_order = await getOrderByTransactionId(context?.transaction_id, order?.provider?.id)
            updateRequest.message.order['state'] = bap_order?.state;

            let items = [];
            // let settlement_details = [];
            for (let item of order?.items) {

                let single_item = {
                    "id": item?.id,
                    "quantity": item?.quantity,
                    "tags": {
                        "update_type": item?.tags?.update_type,
                    }
                }
                if (item?.tags?.update_type == 'cancel') {
                    single_item.tags['reason_code'] = item?.tags?.reason_code;
                };
                if (item?.tags?.update_type == 'return') {
                    single_item.tags['ttl_approval'] = "PT24H" //obj['@ondc/org/return_window']
                    single_item.tags['reason_code'] = item?.tags?.reason_code;
                    //need to check the return window and send less than that.. time comparisions required
                };
                items.push(single_item)

                // settlement_details.push(settlement_item)
            };
            updateRequest.message.order.items = items;

            setSourceInRedis(sourceType, updateRequest?.context?.message_id)

            const response = await BAPApiCall(context.bap_uri, PROTOCOL_API_URLS.UPDATE, updateRequest);
            // if (response.message.ack.status == 'ACK') {
            //     for (let item of items) {
            //         bap_order.items.map(order_item => {
            //             if (order_item.quantity.count != item?.quantity) {
            //                 const new_order_item = JSON.parse(JSON.stringify(prev_order_item));
            //                 new_order_item.quantity.count = request_item.quantity.count;
            //                 new_order_item.tags=item.tags
            //             }
            //         });
            //     }
            // }
            await addOrUpdateOrderWithTransactionId(context?.transaction_id, bap_order, order?.provider?.id)

            return { context: context, message: response.message, ...(response.error && { error: response.error }) };
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppUpdateService;
