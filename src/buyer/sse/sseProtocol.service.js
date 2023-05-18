import { PROTOCOL_CONTEXT } from '../../shared/utils/constants.js';
import { BAPApiCall, CallWebhook } from '../../shared/utils/protocolApis/index.js';
import BPPValidator from "../../shared/utils/validations/bpp_validations/validations.js";
import Validator from 'jsonschema';
var validator = new Validator.Validator();
import { cancellation_reason } from '../../shared/db/cancellation_reason.js'
// import { UpsertBapUserCartItem, DeleteBapUserCartItem, addOrUpdateOrderWithTransactionId, getCartByTransactionId, UpsertOnBapIssue, UpsertOnBppIssue, getOrderById, getOrderByTransactionId, GetSearchRequest, getBapOrder, upsertBapOrder, UpdateBapIssueData, AddOnActionResults } from '../../shared/db/dbService.js';

import SearchService from '../discovery/search.service.js';
import { IsoToDateConverter } from '../../shared/utils/isoDateConversion.js';
import BppUpdateService from '../order/update/bppUpdate.service.js';
import moment from 'moment-timezone';
import { returns_reason } from '../../shared/db/return_reason.js';
import { Emitter } from '../../emitter/emitter.js';
import { Configuration } from '../config/config.js';
const bppUpdateService = new BppUpdateService()
const searchService = new SearchService()
const bPPValidator = new BPPValidator()
class SseProtocol {

    /**
    * on cancel
    * @param {Object} response 
    */
    async onCancel(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // let query = {
            //     transactionId: response?.context?.transaction_id,
            //     id: response?.message?.order?.id
            // }

            // let orderDetails = await getBapOrder(query)

            // if (orderDetails.quote.price) {
            //     orderDetails.quote.price.value = '0'
            // }

            // if (orderDetails.quote.breakup) {
            //     orderDetails.quote.breakup = []
            // }

            // if (orderDetails?.state != 'Cancelled' && response?.message?.order?.state == "Cancelled") {
            //     orderDetails.state = 'Cancelled';
            //     for (let fulfillment of orderDetails.fulfillments) {
            //         fulfillment.state.descriptor['code'] = "Cancelled";
            //         orderDetails.items.map(item => {
            //             item.cancelled_at = response?.context.timestamp;
            //             orderDetails.cancelled_at = response?.context.timestamp;
            //             cancellation_reason.every(cancel_reason => {

            //                 if (response?.message?.order?.tags?.cancellation_reason_id == cancel_reason?.code) {
            //                     item.cancellation_reason = cancel_reason?.code;
            //                     item.cancellation_remark = cancel_reason?.reason;

            //                     if (!orderDetails.cancelRequest) {
            //                         orderDetails.cancelled_by = 'Seller';
            //                         item.cancelled_by = 'Seller';
            //                     } else {
            //                         orderDetails.cancelled_by = 'Buyer';
            //                         item.cancelled_by = 'Buyer';
            //                     }

            //                     orderDetails.cancellation_reason = cancel_reason?.code;
            //                     orderDetails.cancellation_remark = cancel_reason?.reason;

            //                     return false;
            //                 }
            //                 return true;

            //             });
            //         });
            //     };
            // };


            // await upsertBapOrder(query, orderDetails)

            // await addOrUpdateOrderWithTransactionId(response?.context?.transaction_id, {
            //     ...orderDetails
            // }, orderDetails?.provider?.id);
            //TODO store/update in db

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_CANCEL,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);


            // process.send({
            //     type: 'SSE',
            // message: {
            //     messageId: messageId,
            //     action: PROTOCOL_CONTEXT.ON_CANCEL,
            //     response: JSON.stringify(response),
            // }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_CANCEL,
                response: JSON.stringify(response),
            }
            Emitter(messageId, data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * on confirm
     * @param {Object} response 
     */
    async onConfirm(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }
            // let { validation_flag, error_list } = await bPPValidator.validateOnConfirm(response);

            // if (!validation_flag) {
            //     return {
            //         message: {
            //             "ack": { "status": "NACK" },
            //             "error": { "type": "Buyer App", "code": "20000", "message": "Invalid catalog item", "description": JSON.stringify(error_list) }
            //         }
            //     }
            // }

            // let GetOrderData = await getOrderByTransactionId(response?.context?.transaction_id, response?.message?.order?.provider?.id)
            // if (GetOrderData.id != response.message.order.id) {
            //     let message = {
            //         "ack": { "status": "NACK" },
            //         "error": { "type": "Buyer App", "code": "27501", "message": "Terms unacceptable" }
            //     }
            //     response.error = message.error

            //     let onActionResponse = {
            //         transaction_id: response.context.transaction_id,
            //         response: response,
            //         message_id: response.context.message_id,
            //         validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            //     }

            //     await AddOnActionResults(onActionResponse);


            //     // process.send({
            //     //     type: 'SSE',
            //     //     message: {
            //     //         messageId: messageId,
            //     //         action: PROTOCOL_CONTEXT.ON_INIT,
            //     //         response: JSON.stringify(response),
            //     //     }
            //     // })
            //     let data = {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_CONFIRM,
            //         response: JSON.stringify(response),
            //     }
            //     Emitter(messageId, data)
            //     return { message: message }

            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_CONFIRM,
            //     response,
            // );


            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_CONFIRM,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_CONFIRM,
                response: JSON.stringify(response),
            }
            Emitter(messageId, data)

            // if (response.context.bpp_id == Configuration?.BPP_ID) {
                // sendSSEResponse(
                //     "bppEunimartOrderConfirmSivaOndc",
                //     PROTOCOL_CONTEXT.ON_CONFIRM,
                //     response,
                //     true
                // );

                // process.send({
                //     type: 'SSE',
                //     message: {
                //         messageId: 'bppEunimartOrderConfirmSivaOndc',
                //         action: PROTOCOL_CONTEXT.ON_CONFIRM,
                //         response: JSON.stringify(response),
                //         killProcess: true
                //     }
                // })
            //     let data = {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_CONFIRM,
            //         response: JSON.stringify(response),
            //     }
            //     Emitter(messageId, data)
            // }

            // try {


            //     let cart_data = await getCartByTransactionId(response?.context?.transaction_id, response?.message?.order?.provider?.id)
            //     let onConfirmResponseOrderData = response?.message?.order

            //     // console.log("Order data--------->", JSON.stringify(GetOrderData));
            //     // console.log("cart data--------->", JSON.stringify(cart_data));



            //     // let on_confirm_price = response?.message?.order?.quote?.price
            //     // let init_price = cart_data?.order?.quote?.price

            //     // let on_confirm_breakup = response?.message?.order?.quote?.breakup
            //     // let init_breakup  = cart_data?.order?.quote?.breakup

            //     // if (on_confirm_price != init_price) {
            //     //     for (let quote_confirm_brk_up of on_confirm_breakup) {
            //     //         for(let quote_init_brk_up of init_breakup){
            //     //             if( quote_confirm_brk_up['@ondc/org/item_id']!= quote_init_brk_up['@ondc/org/item_id'] 
            //     //             || quote_confirm_brk_up['@ondc/org/item_quantity']!=quote_init_brk_up['@ondc/org/item_quantity'] 
            //     //             || quote_confirm_brk_up['@ondc/org/title_type'] != quote_init_brk_up['@ondc/org/title_type']
            //     //             || quote_confirm_brk_up['item']['price'] != quote_init_brk_up['item']['price']
            //     //             || quote_confirm_brk_up['price']!= quote_init_brk_up['price']
            //     //             || quote_confirm_brk_up['title'] != quote_init_brk_up['title']){

            //     //                 let message = {
            //     //                     "ack": { "status": "NACK" },
            //     //                     "error": { "type": "Seller App", "code": "30000", "message": "Invalid request error" }
            //     //                 }

            //     //                 response.error=message;

            //     //                 process.send({
            //     //                     type: 'SSE',
            //     //                     message: {
            //     //                         messageId: messageId,
            //     //                         action: PROTOCOL_CONTEXT.ON_CONFIRM,
            //     //                         response: JSON.stringify(response),
            //     //                     }
            //     //                 })
            //     //                 return {
            //     //                     message:message
            //     //                 } 
            //     //             }
            //     //         }    
            //     //     }
            //     // }

            //     let fulfillmentArray = GetOrderData?.fulfillments || []
            //     for (let i = 0; i < fulfillmentArray.length; i++) {
            //         fulfillmentArray[i].provider_id = onConfirmResponseOrderData?.provider?.id || ""
            //         fulfillmentArray[i].state = onConfirmResponseOrderData?.fulfillments?.[i]?.state || fulfillmentArray[i].state || { "descriptor": { "name": "", "code": "" } }
            //         fulfillmentArray[i].tracking = onConfirmResponseOrderData?.fulfillments?.[i]?.tracking || false
            //         fulfillmentArray[i].agent = onConfirmResponseOrderData?.fulfillments?.[i]?.agent || { name: "", }
            //         fulfillmentArray[i].start = onConfirmResponseOrderData?.fulfillments?.[i]?.start || {}
            //         fulfillmentArray[i].end = onConfirmResponseOrderData?.fulfillments?.[i]?.end
            //         fulfillmentArray[i]["rateable"] = onConfirmResponseOrderData?.fulfillments?.[i]?.rateable,
            //             fulfillmentArray[i]['@ondc/org/provider_name'] = onConfirmResponseOrderData?.fulfillments?.[i]?.['@ondc/org/provider_name']
            //     }



            //     let itemsArray = GetOrderData?.items || []
            //     let breakupArray = cart_data?.onselect?.message?.order?.quote?.breakup
            //     for (let i = 0; i < itemsArray.length; i++) {
            //         let itemId = itemsArray[i]?.id || ""
            //         for (let j = 0; j < breakupArray.length; j++) {
            //             if (itemId == breakupArray[j]?.["@ondc/org/item_id"] && breakupArray[j]?.["@ondc/org/title_type"] == "item") {
            //                 if (breakupArray[j]?.item?.quantity) {
            //                     itemsArray[i].quantity.available = breakupArray[j]?.item?.quantity?.available
            //                     itemsArray[i].quantity.maximum = breakupArray[j]?.item?.quantity?.maximum
            //                 }
            //             }
            //         }
            //     }

            //     let updateOrderPayload = {
            //         state: response?.message?.order?.state,
            //         id: response?.message?.order?.id,
            //         onConfirm: response,
            //         fulfillments: fulfillmentArray,
            //         items: itemsArray,
            //         payment: response?.message?.order?.payment,
            //         provider: response?.message?.order?.provider,
            //         created_at: response?.message?.order?.created_at,
            //         updated_at: response?.message?.order?.updated_at,
            //         received_on_confirm: true
            //     }

            //     let filterQuery = {
            //         transactionId: response?.context?.transaction_id,
            //         ...(onConfirmResponseOrderData?.provider?.id && { providerId: onConfirmResponseOrderData?.provider?.id })
            //     }

            //     await DeleteBapUserCartItem(filterQuery)
            //     await addOrUpdateOrderWithTransactionId(response?.context?.transaction_id, updateOrderPayload, onConfirmResponseOrderData?.provider?.id)

            // } catch (e) {
            //     console.log("inside on_Confirm", e);
            // }
            //TODO store in db

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on init
    * @param {Object} response 
    */
    async onInit(response) {
        try {

            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }
            // let { validation_flag, error_list } = await bPPValidator.validateOnInit(response);

            // if (!validation_flag) {
            //     return {
            //         message: {
            //             "ack": { "status": "NACK" },
            //             "error": { "type": "Buyer App", "code": "20000", "message": "Invalid catalog item", "description": JSON.stringify(error_list) }
            //         }
            //     }
            // }

            // let cart = await getCartByTransactionId(response?.context?.transaction_id, response?.message?.order?.provider?.id)

            // let on_init_provider_id = response?.message?.order?.provider?.id
            // let select_provider_id = cart?.order?.provider?.id

            // let on_init_location = response?.message?.order?.provider_location?.id
            // let select_location = cart?.order?.provider?.locations?.[0]?.id

            // if (on_init_provider_id?.toString().toLowerCase() != select_provider_id?.toString().toLowerCase() || on_init_location?.toString().toLowerCase() != select_location?.toString().toLowerCase() || !response?.message?.order?.payment['@ondc/org/settlement_details']) {
            //     let message = {
            //         "ack": { "status": "NACK" },
            //         "error": { "type": "Buyer App", "code": "27501", "message": "Terms unacceptable" }
            //     }
            //     response.error = message.error

            //     let onActionResponse = {
            //         transaction_id: response.context.transaction_id,
            //         response: response,
            //         message_id: response.context.message_id,
            //         validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            //     }

            //     await AddOnActionResults(onActionResponse);

            //     // process.send({
            //     //     type: 'SSE',
            //     //     message: {
            //     //         messageId: messageId,
            //     //         action: PROTOCOL_CONTEXT.ON_INIT,
            //     //         response: JSON.stringify(response),
            //     //     }
            //     // })
            //     let data = {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_INIT,
            //         response: JSON.stringify(response),
            //     }
            //     Emitter(messageId,data)
            //     return { message: message }

            // }
            // let settlement_details = response?.message?.order?.payment['@ondc/org/settlement_details']
            // let collected_by = response?.message?.order?.payment['collected_by']
            // await Promise.all(settlement_details.map(async detail => {
            //     if ((collected_by == 'BAP' && detail['settlement_counterparty'] != 'buyer-app') || (collected_by == 'BPP' && detail['settlement_counterparty'] != 'seller-app')) {
            //         let message = {
            //             "ack": { "status": "NACK" },
            //             "error": { "type": "Buyer App", "code": "27501", "message": "Terms unacceptable" }
            //         }
            //         response.error = message.error

            //         let onActionResponse = {
            //             transaction_id: response.context.transaction_id,
            //             response: response,
            //             message_id: response.context.message_id,
            //             validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            //         }

            //         await AddOnActionResults(onActionResponse);

            //         // process.send({
            //         //     type: 'SSE',
            //         //     message: {
            //         //         messageId: messageId,
            //         //         action: PROTOCOL_CONTEXT.ON_INIT,
            //         //         response: JSON.stringify(response),
            //         //     }
            //         // })
            //         let data = {
            //             messageId: messageId,
            //             action: PROTOCOL_CONTEXT.ON_CANCEL,
            //             response: JSON.stringify(response),
            //         }
            //         Emitter(messageId,data)
            //         return { message: message }
            //     }

            // }));


            // if (cart) {
            //     Object.assign(cart['order'], {
            //         billing: response?.message?.order?.billing,
            //         payment: response?.message?.order?.payment,
            //     });
            //     cart.oninit = {
            //         context: response?.context,
            //         message: response?.message
            //     }

            //     let filterQuery = {
            //         transactionId: response?.context?.transaction_id,
            //         ...(on_init_provider_id && { providerId: on_init_provider_id })
            //     }
            //     await UpsertBapUserCartItem(filterQuery, cart)
            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_INIT,
            //     response,
            // );


            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_INIT,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_CANCEL,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on search
    * @param {Object} response 
    */
    async onSearch(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("search", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }

            // let searchRequest = await GetSearchRequest({ transaction_id: response?.context?.transaction_id })

            // let providers;
            // let flag = false

            // providers = response?.message?.catalog["bpp/providers"]
            // if (providers && providers.length) {
            //     flag = true
            // }

            // let { validation_flag, error_list } = await bPPValidator.validateOnSearch(response);

            // if (!validation_flag) {
            //     return {
            //         message: {
            //             "ack": { "status": "NACK" },
            //             "error": { "type": "Buyer App", "code": "20000", "message": "Invalid catalog item", "description": JSON.stringify(error_list) }
            //         }
            //     }
            // }

            // var validatorResponse = await validator.validate(providers, ProviderValidationSchema);
            // if (validatorResponse["errors"].length == 0) {
            //     flag = true
            // }

            // if (flag == true) {
            // let searchResponse = await searchService.bppSearchValidator(searchRequest, response)

            //     let flag = true;



            //     let onActionResponse = {
            //         transaction_id: searchResponse.context.transaction_id,
            //         response: searchResponse,
            //         message_id: searchResponse.context.message_id,
            //         validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            //     }

            //     await AddOnActionResults(onActionResponse);
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_SEARCH,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            //     // const sseSend = process.send({
            //     //     type: 'SSE',
            //     //     message: {
            //     //         messageId: messageId,
            //     //         action: PROTOCOL_CONTEXT.ON_SEARCH,
            //     //         response: JSON.stringify(searchResponse),
            //     //     }
            //     // });

            //     console.log("sseSEND Status", sseSend);

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
            // } else {
            // }
            // return {
            //     message: {
            //         "ack": { "status": "NACK" },
            //         "error": { "type": "Buyer App", "code": "20000", "message": "Invalid catalog item" }
            //     }
            // }
        }
        catch (err) {
            throw err;
        }
    }


    /**
    * on quote
    * @param {Object} response 
    */
    async onQuote(response) {
        try {
            const { messageId } = response;

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_SELECT,
            //     response,
            // );

            //removed 
            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.ON_SELECT,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on status
    * @param {Object} response 
    */
    async onStatus(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }

            // let query = {
            //     transactionId: response?.context?.transaction_id,
            //     id: response?.message?.order?.id
            // }

            // let orderDetails = await getBapOrder(query)
            // if (orderDetails.quote.price.value != response.message.order.quote.price.value) {
            //     await bppUpdateService.settlementUpdate(response, orderDetails, true);
            // }

            // orderDetails.fulfillments.forEach(element => {
            //     response?.message?.order.fulfillments.forEach(ful => {
            //         if (element.id == ful.id) {
            //             orderDetails.items.map(item => {
            //                 if (item.fulfillment_id == element.id) {
            //                     if (element.state.descriptor.code != 'Order-picked-up' && ful.state.descriptor.code == 'Order-picked-up') {
            //                         item.shipped_at = response?.context.timestamp
            //                     } else if (element.state.descriptor.code != 'Packed' && ful.state.descriptor.code == "Packed") {
            //                         item.ready_to_ship_date = response?.context.timestamp
            //                     } else if (element.state.descriptor.code != 'Order-delivered' && ful.state.descriptor.code == "Order-delivered") {
            //                         item.delivered_at = response?.context.timestamp
            //                     } else if (element.state.descriptor.code != 'Cancelled' && ful.state.descriptor.code == "Cancelled") {
            //                         item.cancelled_at = response?.context.timestamp
            //                     }
            //                 }
            //             });
            //         }
            //     });
            // });

            // orderDetails.fulfillments = response?.message?.order.fulfillments

            // // if (orderDetails?.documents) {
            // // if (response?.message?.order?.documents){
            // //     response.message.order.documents = [...orderDetails?.documents, ...response?.message?.order?.documents]
            // // } else {
            // // response.message.order.documents = orderDetails?.documents
            // // }
            // // }

            // if (response?.message?.order?.quote) {
            //     orderDetails.quote = response.message.order.quote
            // }

            // if (response?.message?.order?.state) {
            //     orderDetails.state = response?.message?.order?.state
            // }

            // if (response?.message?.order?.documents) {
            //     orderDetails.documents = response?.message?.order?.documents
            // }


            // if (response?.message?.order?.items) {
            //     let prev_order_items = orderDetails?.items;
            //     let new_order_items = [];
            //     (response?.message?.order?.items).forEach(request_item => {
            //         let prev_order_item = prev_order_items.find(order_item => order_item.id === request_item.id);
            //         if (prev_order_item) {

            //             const new_order_item = JSON.parse(JSON.stringify(prev_order_item));
            //             new_order_item.quantity.count = request_item.quantity.count;
            //             new_order_item.tags = request_item.tags;
            //             new_order_item.fulfillment_id = request_item.fulfillment_id;
            //             new_order_items.push(new_order_item)
            //         }
            //     });
            //     orderDetails.items = new_order_items
            //     // orderDetails.items = response?.message?.order?.items
            // }


            // await upsertBapOrder(query, orderDetails)

            // await addOrUpdateOrderWithTransactionId(response?.context?.transaction_id, { state: response?.message?.order?.state, documents: response?.message?.order?.documents, ...orderDetails }, response?.message?.order?.provider?.id)

            //TODO store/update in db

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_STATUS,
            //     response,
            // );


            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_STATUS,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_STATUS,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on support
    * @param {Object} response 
    */
    async onSupport(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }

            // // sendSSEResponse(
            // //     messageId,
            // //     PROTOCOL_CONTEXT.ON_SUPPORT,
            // //     response,
            // // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_SUPPORT,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_SUPPORT,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on support
    * @param {Object} response 
    */
    async onRating(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("on_rating", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }
            // // console.log("onresponse",response)
            // // sendSSEResponse(
            // //     messageId,
            // //     PROTOCOL_CONTEXT.ON_RATING,
            // //     response,
            // // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.ON_RATING,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on bap issue
    * @param {Object} response 
    */
    async onBapIssue(response) {
        try {
            // if(response?.message?.issue_resolution_details?.issue?.expected_resolution_time)
            // response.message.issue_resolution_details.issue.expected_resolution_time.duration=await IsoToDateConverter(response?.message?.issue_resolution_details?.issue?.expected_resolution_time?.duration)
            // response.message.issue.updated_at = response?.context?.timestamp
            // let bap_data = await UpdateBapIssueData(response)
            // console.log("onupsert bap comments -----> ", bap_data?.comments)
            // console.log("onupsert bap stat hist -----> ", bap_data?.issue_status_history)
            // let issue_data = response?.message?.issue_resolution_details?.issue
            // delete issue_data.order
            // let bpp_data = await UpsertOnBppIssue(response)
            // console.log("onupsert bpp comments -----> ", bpp_data?.comments)
            // console.log("onupsert bpp stat hist -----> ", bpp_data?.issue_status_history)
            const messageId = response?.context?.message_id;
            // CallWebhook("on_issue", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }
            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_ISSUE,
            //     response,
            // );
            // console.log("Message id beffore sse call", messageId)

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.ON_ISSUE,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on bpp issue
    * @param {Object} response 
    */
    async onBppIssue(response) {
        try {
            // if(response?.message?.issue_resolution_details?.issue?.expected_resolution_time)
            // response.message.issue_resolution_details.issue.expected_resolution_time.duration=await IsoToDateConverter(response?.message?.issue_resolution_details?.issue?.expected_resolution_time?.duration)
            // let bap_data = await UpsertOnBapIssue(response)
            // console.log("onupsert bap comments -----> ", bap_data?.comments)
            // console.log("onupsert bap stat hist -----> ", bap_data?.issue_status_history)
            // let bpp_data = await UpsertOnBppIssue(response)
            // console.log("onupsert bpp comments -----> ", bpp_data?.comments)
            // console.log("onupsert bpp stat hist -----> ", bpp_data?.issue_status_history)
            const messageId = response?.context?.message_id;
            // CallWebhook("on_issue", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
            //     // console.log(JSON.stringify(response));
            // }
            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_ISSUE,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.ON_ISSUE,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on support
    * @param {Object} response 
    */
    async onIssueStatus(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("on_status", response)
            // if (response.context?.bpp_id != undefined) {
                // console.log(JSON.stringify(response));
            // }
            // response.message.issue.updated_at = response?.context?.timestamp
            // if(response.message.issue.issue_actions?.respondent_)
            // console.log("before update bap", response)
            // let bap_data = await UpdateBapIssueData(response)
            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_STATUS,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.ON_ISSUE_STATUS,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }


    /**
    * on track
    * @param {Object} response 
    */
    async onTrack(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.ON_TRACK,
            //     response,
            // );


            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_TRACK,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_CANCEL,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on update
    * @param {Object} response
    */
    async onUpdate(response) {
        try {
            // var $this = this;

            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // let query = {
            //     transactionId: response?.context?.transaction_id,
            //     id: response?.message?.order?.id
            // }

            // let orderDetails = await getBapOrder(query);
            // if (orderDetails.quote.price.value != response.message.order.quote.price.value) {
            //     await bppUpdateService.settlementUpdate(response, orderDetails, true);
            // }

            // if (response?.message?.order?.items) {

            //     let prev_order_items = orderDetails?.items;
            //     let new_order_items = [];
            //     (response?.message?.order?.items).forEach(request_item => {

            //         let prev_order_item = prev_order_items.find(order_item => order_item.id === request_item.id);

            //         if (prev_order_item) {

            //             const new_order_item = JSON.parse(JSON.stringify(prev_order_item));
            //             new_order_item.quantity.count = request_item.quantity.count;
            //             new_order_item.tags = request_item?.tags
            //             if (request_item?.tags?.status == 'Cancelled') {
            //                 new_order_item.cancelled_at = response?.context.timestamp;
            //                 new_order_item.cancelled_by = "Buyer";
            //                 // need to map cancellation_reason
            //                 cancellation_reason.every(cancel_reason => {

            //                     if (new_order_item?.tags?.reason_code == cancel_reason?.code) {
            //                         new_order_item.cancellation_reason = cancel_reason?.code;
            //                         new_order_item.cancellation_remark = cancel_reason?.reason;
            //                         return false;
            //                     }
            //                     return true;

            //                 });
            //             } else if (request_item?.tags?.status == 'Return_Initiated') {
            //                 returns_reason.every(return_reason => {

            //                     if (new_order_item?.tags?.reason_code == return_reason?.code) {
            //                         new_order_item.cancellation_reason = return_reason?.code;
            //                         new_order_item.cancellation_remark = return_reason?.reason;
            //                         return false;
            //                     }
            //                     return true;

            //                 });

            //             }

            //             new_order_item.fulfillment_id = request_item.fulfillment_id;
            //             new_order_items.push(new_order_item)

            //         }
            //     });
            //     orderDetails.items = new_order_items
            // }

            // if (response?.message?.order?.state) {
            //     orderDetails.state = response?.message?.order?.state
            // }
            // if (response?.message?.order?.quote) {
            //     orderDetails.quote = response?.message?.order?.quote
            // }
            // if (response?.message?.order?.fulfillments) {
            //     orderDetails.fulfillments = response?.message?.order?.fulfillments
            // }

            // await upsertBapOrder(query, orderDetails)

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_UPDATE,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_UPDATE,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }



    /**
    * on search
    * @param {Object} response 
    */
    async onSelect(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("order_process", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // let { validation_flag, error_list } = await bPPValidator.validateOnSelect(response);

            // if (!validation_flag) {
            //     return {
            //         message: {
            //             "ack": { "status": "NACK" },
            //             "error": { "type": "Buyer App", "code": "20000", "message": "Invalid catalog item", "description": JSON.stringify(error_list) }
            //         }
            //     }
            // }


            // let cart = await getCartByTransactionId(response?.context?.transaction_id, response?.message?.order?.provider?.id)

            // let on_select_provider_id = response?.message?.order?.provider?.id
            // let select_provider_id = cart?.order?.provider?.id

            // if (on_select_provider_id != select_provider_id) {
            //     let message = {
            //         "ack": { "status": "NACK" },
            //         "error": { "type": "Seller App", "code": "30000", "message": "Invalid request error" }
            //     }
            //     response.error = message.error

            //     let onActionResponse = {
            //         transaction_id: response.context.transaction_id,
            //         response: response,
            //         message_id: response.context.message_id,
            //         validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            //     }

            //     await AddOnActionResults(onActionResponse);

            //     // process.send({
            //     //     type: 'SSE',
            //     //     message: {
            //     //         messageId: messageId,
            //     //         action: PROTOCOL_CONTEXT.ON_SELECT,
            //     //         response: JSON.stringify(response),
            //     //     }
            //     // })
            //     let data = {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_SELECT,
            //         response: JSON.stringify(response),
            //     }
            //     Emitter(messageId,data)
            //     return {
            //         message: message
            //     }
            // }
            // let quote = JSON.stringify(response?.message?.order?.quote || {})
            // cart.order['quote'] = JSON.parse(quote)
            // cart['onselect'] = response
            // cart.order['fulfillments'] = response?.message?.order?.fulfillments

            // cart.order.items.map(item => {
            //     response.message.order.items.map(res_item => {
            //         if (item.id == res_item.id) {
            //             item.fulfillment_id = res_item.fulfillment_id;
            //         }
            //     })
            // })

            // let filterQuery = {
            //     transactionId: response?.context?.transaction_id,
            //     ...(on_select_provider_id && { providerId: on_select_provider_id })
            // }
            // await UpsertBapUserCartItem(filterQuery, cart)

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            // process.send({
            //     type: 'SSE',
            //     message: {
            //         messageId: messageId,
            //         action: PROTOCOL_CONTEXT.ON_SELECT,
            //         response: JSON.stringify(response),
            //     }
            // })
            let data = {
                messageId: messageId,
                action: PROTOCOL_CONTEXT.ON_SELECT,
                response: JSON.stringify(response),
            }
            Emitter(messageId,data)
            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            console.log("Error", err);
            throw err;
        }
    }

    /**
    * on rating categories
    * @param {Object} response 
    */
    async ratingCategories(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("rating_categories", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.RATING_CATEGORIES,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.RATING_CATEGORIES,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on rating categories
    * @param {Object} response 
    */
    async feedbackCategories(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("feedback_categories", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.FEEDBACK_CATEGORIES,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.FEEDBACK_CATEGORIES,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }

    /**
    * on rating categories
    * @param {Object} response 
    */
    async feedbackForm(response) {
        try {
            const messageId = response?.context?.message_id;
            // CallWebhook("feedback_form", response)
            // if (response.context?.bpp_id != undefined && response.context.bpp_id == Configuration?.BPP_ID) {
                // console.log(JSON.stringify(response));
            // }

            // sendSSEResponse(
            //     messageId,
            //     PROTOCOL_CONTEXT.FEEDBACK_FORM,
            //     response,
            // );

            // let onActionResponse = {
            //     transaction_id: response.context.transaction_id,
            //     response: response,
            //     message_id: response.context.message_id,
            //     validTime: moment().tz("Asia/Calcutta").add('3', 'h')
            // }

            // await AddOnActionResults(onActionResponse);

            process.send({
                type: 'SSE',
                message: {
                    messageId: messageId,
                    action: PROTOCOL_CONTEXT.FEEDBACK_FORM,
                    response: JSON.stringify(response),
                }
            })

            return {
                message: {
                    ack: {
                        status: "ACK"
                    }
                }
            };
        }
        catch (err) {
            throw err;
        }
    }


};

export default SseProtocol;