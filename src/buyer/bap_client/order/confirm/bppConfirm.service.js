//@ts-check
import { RETAIL_ORDER_STATE, PAYMENT_COLLECTED_BY, PAYMENT_TYPES, PROTOCOL_PAYMENT, TL_METHOD } from "../../../../shared/utils/constants.js";
// import { addOrUpdateOrderWithTransactionId, getCartByTransactionId, getPayoutById, updatePayoutDetails } from '../../../../shared/db/dbService.js';
// import { setSourceInRedis } from "../../../../shared/utils/helpers.js";
import BapConfirmService from '../../../order/confirm/confirmOrder.service.js';
import moment from "moment";
const BAPService = new BapConfirmService();


class BppConfirmService {

    /**
     * bpp confirm order
     * @param {Object} confirmRequest 
     * @returns 
     */
    async confirm(uri, confirmRequest = {}) {
        try {

            /*
            let topic = topics.CLIENT_API_BAP_CONFIRM
            await produceKafkaEvent(kafkaClusters.BAP, topic, confirmRequest)
            let confirmResponse = await redisSubscribe(confirmRequest.context.message_id)
            return { context: confirmRequest.context, message: confirmResponse.message };
            */

            let confirmResponse = await BAPService.ONDCConfirmOrderEvent(confirmRequest)

            // if (confirmResponse.message.ack.status == 'NACK') { // cancelling the order of NACK
            //     addOrUpdateOrderWithTransactionId(confirmRequest.context?.transaction_id, { state: RETAIL_ORDER_STATE.CANCELLED }, confirmRequest.order?.provider?.id)
            // }

            return confirmResponse;

        }
        catch (err) {
            throw err;
        }
    }

    /**
     * bpp confirm order
     * @param {Object} context 
     * @param {Object} order 
     * @returns 
     */
    async confirmV1(uri, context, order = {}, createdBy, sourceType) {
        try {
            // let cartItem = await getCartByTransactionId(context?.transaction_id, order?.provider?.id)
            // if (context?.transaction_id != cartItem?.transactionId) {
            //     context.transaction_id = cartItem?.transactionId
            // }
            // if (!cartItem) {
            //     return { status: false, message: "Empty cart. Please Add Items to your cart" };
            // }
            // let payoutQuey = {
            //     buyerAppOrderId: cartItem?.order_id
            // }
            // let payoutDetails = await getPayoutById(payoutQuey)
            // let payment_id = payoutDetails?.paymentTransactionId || payoutDetails?.transaction?.id || context?.transaction_id
            // const provider = cartItem?.order?.provider || {}; // need to add provider id
            const provider={}
            const order_id="dfdg67576jhvhv"
            // // delete order?.billing_info?.created_at;
            // // delete order?.billing_info?.updated_at;

            // // for(let i = 0; i < order?.quote?.breakup.length; i++) {
            // //     delete order?.quote?.breakup[i]?.item;
            // // }        

            const confirmRequest = {
                context: context,
                message: {
                    order: {
                        id: order_id,
                        state: "Created",
                        billing: order.billing_info,
                        items: order?.items.map(item => {
                            return {
                                id: item.id,
                                quantity: item.quantity,
                                fulfillment_id: item.fulfillment_id,
                            };
                        }) || [],
                        provider: provider,
                        // fulfillments: fulfillments,
                        // addOns: [],
                        // offers: [],
                        payment: {
                            status: order?.payment?.type === PAYMENT_TYPES["ON-ORDER"] ?
                                PROTOCOL_PAYMENT.PAID :
                                PROTOCOL_PAYMENT["NOT-PAID"],
                            type: order?.payment?.type,
                            "@ondc/org/settlement_details": order?.payment["@ondc/org/settlement_details"],
                            "@ondc/org/buyer_app_finder_fee_amount": order?.payment["@ondc/org/buyer_app_finder_fee_amount"],
                            "@ondc/org/buyer_app_finder_fee_type": order?.payment["@ondc/org/buyer_app_finder_fee_type"],
                            // "@ondc/org/withholding_amount": order?.payment["@@ondc/org/withholding_amount"] || "0.0",
                            // "@ondc/org/return_window": order?.payment["@ondc/org/return_window"] || "0",
                            // "@ondc/org/settlement_basis": order?.payment["@ondc/org/settlement_basis"] || "Collection",
                            // "@ondc/org/settlement_window": order?.payment["@ondc/org/settlement_window"] || "P2D",

                        },
                        quote: {
                            ...order?.quote
                        },
                        created_at: context.timestamp,
                        updated_at: context.timestamp
                    },
                }
            }

            // if (confirmRequest.message.order.payment.type != PAYMENT_TYPES['POST-FULFILLMENT']) {
            //     // confirmRequest.message.order.payment.uri = order?.payment?.uri || `https://ondc.transaction.com/payment`,
            //     // confirmRequest.message.order.payment.tl_method = TL_METHOD[order?.payment?.tl_method] || TL_METHOD.GET,
            //     confirmRequest.message.order.payment.params = {
            //         amount: order?.quote?.price?.value || "0",
            //         currency: "INR",
            //         transaction_id: payment_id
            //     },
            //         confirmRequest.message.order.payment.collected_by = order?.payment?.collected_by || "BAP"
            // }

            // let acceptance_payload = {
            //     code: "accept",
            //     value: "Y"
            // }
            // if (confirmRequest.message.order['tags'].length) {
            //     confirmRequest.message.order.tags.forEach(tag => {
            //         if (tag.code != "bpp_seller_gst") {
            //             let obj = tag.list.find(cart_item => cart_item.code === "accept");
            //             if (!obj) {
            //                 tag.list.push(acceptance_payload)
            //             }
            //         }
            //     })
            // }

            // let orderCreatePayload = {
            //     confirm: confirmRequest,
            //     id: confirmRequest.message.order.id,
            //     context: context || {},
            //     provider: provider || {},
            //     items: order?.items || [],
            //     billing: order?.billing_info,
            //     fulfillments: order?.fulfillments,
            //     quote: order?.quote,
            //     payment: confirmRequest?.message?.order?.payment,
            //     state: "Created",
            //     transactionId: context?.transaction_id,
            //     paymentStatus: confirmRequest?.message?.order?.payment?.status,
            //     bppDescriptor: cartItem?.order?.items?.[0]?.bppDescriptor,
            //     bppProvider: cartItem?.order?.items?.[0]?.provider,
            //     bapOrderId: confirmRequest?.message?.order?.id,
            //     CreatedBy: cartItem?.CreatedBy,
            //     delivery_type: "Off-network",
            //     order_category: cartItem?.order?.items?.[0]?.category_id,
            //     source: sourceType,
            //     bapDescriptor: {
            //         "name": "Siva StoreFront",
            //         "short_desc": "Siva StoreFront",
            //         "long_desc": "Siva is a universal open-source platform for Ecommerce shopping.",
            //         "images": [
            //             "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
            //         ],
            //         "symbol": "https://siva3.io/web/image/website/1/logo/Siva%20%7C%20Commerce%203.0?unique=0754639"
            //     }

            // }
            // let init_req_fulfillments = cartItem?.init_req?.message?.order?.fulfillments || []
            // for (let i = 0; i < orderCreatePayload?.fulfillments.length; i++) {
            //     orderCreatePayload['delivery_city'] = init_req_fulfillments[i].end.location.address.city;
            //     orderCreatePayload['delivery_pincode'] = init_req_fulfillments[i].end.location.address.area_code;
            //     orderCreatePayload.fulfillments[i].customer = {
            //         person: {
            //             name: init_req_fulfillments[i]?.end?.location?.address?.name || ""
            //         },
            //         contact: {
            //             phone: init_req_fulfillments[i]?.end?.contact?.phone || "",
            //             email: init_req_fulfillments[i]?.end?.contact?.email || "",
            //         }
            //     }
            // }

            // orderCreatePayload.items.forEach(order_item => {
            //     (cartItem?.order?.items).forEach(cart_item => {
            //         if (order_item?.id == cart_item?.id) {
            //             order_item["category"] = cart_item?.category_id
            //             order_item["descriptor"] = cart_item?.descriptor || {}
            //             order_item["@ondc/org/cancellable"] = cart_item?.["@ondc/org/cancellable"]
            //             order_item["@ondc/org/statutory_reqs_packaged_commodities"] = cart_item?.["@ondc/org/statutory_reqs_packaged_commodities"]
            //             order_item["@ondc/org/returnable"] = cart_item?.["@ondc/org/returnable"]
            //             order_item["@ondc/org/return_window"] = cart_item?.["@ondc/org/return_window"]
            //             order_item["@ondc/org/seller_pickup_return"] = cart_item?.["@ondc/org/seller_pickup_return"]
            //             order_item["@ondc/org/time_to_ship"] = cart_item?.["@ondc/org/time_to_ship"]
            //             order_item["@ondc/org/available_on_cod"] = cart_item?.["@ondc/org/available_on_cod"]
            //             order_item["@ondc/org/contact_details_consumer_care"] = cart_item?.["@ondc/org/contact_details_consumer_care"]
            //             order_item["@ondc/org/statutory_reqs_prepackaged_food"] = cart_item?.["@ondc/org/statutory_reqs_prepackaged_food"]
            //             order_item["@ondc/org/mandatory_reqs_veggies_fruits"] = cart_item?.["@ondc/org/mandatory_reqs_veggies_fruits"]
            //             order_item["price"] = cart_item?.price
            //             order_item['locations'] = cart_item?.locations || {}
            //         }
            //     });
            // });
            // var orderCreatedDateTime = confirmRequest.message.order.created_at

            // let updatePayoutPayload = {
            //     orderCreatedDateTime: orderCreatedDateTime,
            //     createddate: moment(orderCreatedDateTime).tz("Asia/Calcutta").format('DD-MM-YYYY'),
            //     createdtime: moment(orderCreatedDateTime).tz("Asia/Calcutta").format('hh:mm:ss')
            // }

            // updatePayoutDetails({ order_id: confirmRequest.message.order.id }, updatePayoutPayload)

            // addOrUpdateOrderWithTransactionId(context?.transaction_id, orderCreatePayload, provider?.id)

            // setSourceInRedis(sourceType, confirmRequest?.context?.message_id)

            // let fulfillments = order.fulfillments || []
            // for (let j = 0; j < fulfillments.length; j++) {
            //     fulfillments[j].end['person'] = fulfillments[j]?.customer?.person || { "name": fulfillments[j]?.end?.location?.address?.name };
            //     fulfillments[j].end.contact = cartItem?.order?.fulfillments[j]?.end?.contact
            //     delete fulfillments?.[j]?.customer
            // }
            // confirmRequest.message.order.fulfillments = fulfillments
            return await this.confirm(uri, confirmRequest); //confirmRequest
        }
        catch (err) {
            throw err;
        }
    }
}

export default BppConfirmService;
