//@ts-check
// import {createOrUpdateProductConsumer} from "../../../bap/bap_client/products/products.consumer.js"
// import {createOrUpdateProviderConsumer} from "../../../bap/bap_client/provider/provider.consumer.js"
// import {bapStatusConsumer, bapStatusAckConsumer, bapBppStatusConsumer, bapBppStatusAckConsumer} from "../../../bap/order/status/orderStatus.consumer.js"
// import {bapCancelConsumer, bapCancelAckConsumer, bapBppCancelConsumer, bapBppCancelAckConsumer} from "../../../bap/order/cancel/cancelOrder.consumer.js"
// import {bapTrackConsumer, bapTrackAckConsumer, bapBppTrackConsumer, bapBppTrackAckConsumer} from "../../../bap/fulfillment/track.consumer.js"
// import {bapSupportConsumer, bapSupportAckConsumer, bapBppSupportConsumer, bapBppSupportAckConsumer} from "../../../bap/support/support.consumer.js"
// import {bapRatingConsumer, bapRatingAckConsumer, bapBppRatingConsumer, bapBppRatingAckConsumer, bapRatingCategoriesConsumer, bapRatingCategoriesAckConsumer, bapBppRatingCategoriesAckConsumer, bapBppRatingCategoriesConsumer, bapFeedbackCategoriesConsumer, bapFeedbackCategoriesAckConsumer, bapFeedbackFormConsumer, bapFeedbackFormAckConsumer, bapBppFeedbackCategoriesConsumer, bapBppFeedbackCategoriesAckConsumer, bapBppFeedbackFormConsumer, bapBppFeedbackFormAckConsumer} from "../../../bap/rating/rating.consumer.js"
// import {bapIssueConsumer, bapIssueAckConsumer, bapBppIssueConsumer, bapBppIssueAckConsumer} from "../../../igm/bap/issue.consumer.js"
// import {bppIssueConsumer, bppIssueAckConsumer, bppBapIssueConsumer, bppBapIssueAckConsumer} from "../../../igm/bpp/issue.consumer.js"
// import {bppCancelOrderConsumer} from "../../../bpp/order/cancel/bppCancelOrder.consumer.js"
// import { cacheSearchStatusConsumer } from "../../../bap/cache_search/cacheSearch.consumer.js"



// import {shippingtolspCancel} from "../../../lsp/bap/order/cancel/cancelOrder.consumer.js"
// import {getTrackfromshippingtolsp} from "../../../lsp/bap/fulfillment/track.consumer.js"



// import { createIssueConsumer,createOnIssueConsumer,createIssueAckConsumer } from "../../../igm/consumers/issue.consumer.js"
// import {issueStatusConsumer, bapBppIssueStatusConsumer,bapBppIssueStatusAckConsumer, issueStatusAckConsumer } from "../../../igm/bap/issue.consumer.js"

// import { bppUpdateOrderConsumer,bppUpdateReturnConsumer } from '../../../bpp/order/update/updateOrder.consumer.js'

import { consumeKafkaEvent, kafkaClusters } from '../kafka.js'
// import { bppOrderStatusConsumer,bppReturnStatusConsumer } from "../../../bpp/order/status/bppOrderStatus.consumer.js"
import { redisClient } from "../../database/redis.js"

const topics  = {

    WEB3_LIVE_FEED: 'web3.live_feed',

    CREATE_ISSUE: 'public.issues.create',
    CREATE_ON_ISSUE: 'public.issues.on_create',
    CREATE_ISSUE_ACK: 'public.ondc_ack',
    
    SALES_ORDER_STATUS_UPDATE: 'public.ondc.orders.update_status',
    
    SALES_ORDER_CREATE: 'public.ondc.orders.create',
    BPP_SALES_ORDER_STATUS_RESPONSE: 'public.bpp.ondc.orders.status', 
    SALES_ORDER_UPDATE: 'public.ondc.orders.update',
    BPP_SALES_ORDER_CANCEL_RESPONSE: 'public.bpp.ondc.orders.cancel', 
    BPP_SALES_ORDER_RETURN_RESPONSE:'public.bpp.ondc.orders.return',
    BPP_SALES_RETURN_STATUS_RESPONSE:"public.bpp.ondc.orders.return_status",
    BPP_FULL_ORDER_CANCEL:'public.bpp.ondc.orders.full_order_cancel',

    PRODUCT_CREATE_UPDATE:'public.ondc-beckn.products.sync',
    PRODUCT_CREATE_UPDATE_ACK : 'public.ondc-beckn.products.sync_ack',
    PROVIDER_CREATE_UPDATE:'public.ondc-beckn.core.company.sync',
    PROVIDER_CREATE_UPDATE_ACK : 'public.ondc-beckn.core.company.sync_ack',
    
    CLIENT_API_BAP_SEARCH: "client_api_bap_search",
    CLIENT_API_BAP_SEARCH_ACK: "ondc_ack",
    CLIENT_API_BAP_SELECT: "client_api_bap_select",
    CLIENT_API_BAP_SELECT_ACK: "ondc_ack",
    CLIENT_API_BAP_INIT: "client_api_bap_init",
    CLIENT_API_BAP_INIT_ACK: "ondc_ack",
    CLIENT_API_BAP_CONFIRM: "client_api_bap_confirm",
    CLIENT_API_BAP_CONFIRM_ACK: "ondc_ack",
    CLIENT_API_BAP_STATUS: "client_api_bap_status",
    CLIENT_API_BAP_STATUS_ACK: "ondc_ack",
    CLIENT_API_BAP_CANCEL: "client_api_bap_cancel",
    CLIENT_API_BAP_CANCEL_ACK: "ondc_ack",
    CLIENT_API_BAP_RETURN: "client_api_bap_return",
    CLIENT_API_BAP_RETURN_ACK: "ondc_ack",
    
    CLIENT_API_BAP_TRACK: "client_api_bap_track",
    CLIENT_API_BAP_TRACK_ACK: "ondc_ack",
    CLIENT_API_BAP_SUPPORT: "client_api_bap_support",
    CLIENT_API_BAP_SUPPORT_ACK: "ondc_ack",
    CLIENT_API_BAP_RATING: "client_api_bap_rating",
    CLIENT_API_BAP_RATING_ACK: "ondc_ack",
    CLIENT_API_BAP_RATING_CATEGORIES:"client_api_bap_rating_categories",
    CLIENT_API_BAP_RATING_CATEGORIES_ACK:"ondc_ack",
    CLIENT_API_BAP_FEEDBACK_CATEGORIES:"client_api_bap_feedback_categories",
    CLIENT_API_BAP_FEEDBACK_CATEGORIES_ACK:"ondc_ack",
    CLIENT_API_BAP_FEEDBACK_FORM:"client_api_bap_feedback_form",
    CLIENT_API_BAP_FEEDBACK_FORM_ACK:"ondc_ack",
    CLIENT_API_BAP_ISSUE: "client_api_bap_issue",
    CLIENT_API_BAP_ISSUE_ACK: "ondc_ack",

    CLIENT_API_LSP_BAP_SEARCH: "client_api_lsp_bap_search",
    CLIENT_API_LSP_BAP_SEARCH_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_INIT: "client_api_lsp_bap_init",
    CLIENT_API_LSP_BAP_INIT_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_CONFIRM: "client_api_lsp_bap_confirm",
    CLIENT_API_LSP_BAP_CONFIRM_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_STATUS: "client_api_lsp_bap_status",
    CLIENT_API_LSP_BAP_STATUS_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_TRACK: "client_api_lsp_bap_track",
    CLIENT_API_LSP_BAP_TRACK_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_CANCEL: "client_api_lsp_bap_cancel",
    CLIENT_API_LSP_BAP_CANCEL_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_UPDATE: "client_api_lsp_bap_update",
    CLIENT_API_LSP_BAP_UPDATE_ACK: "ondc_ack",
    CLIENT_API_LSP_BAP_SUPPORT: "client_api_lsp_bap_support",
    CLIENT_API_LSP_BAP_SUPPORT_ACK: "ondc_ack",



    BAP_BPP_SEARCH: "bap_bpp_search",
    BAP_BPP_SEARCH_ACK: "ondc_ack",
    BAP_BPP_SELECT: "bap_bpp_select",
    BAP_BPP_SELECT_ACK: "ondc_ack",
    BAP_BPP_INIT: "bap_bpp_init",
    BAP_BPP_INIT_ACK: "ondc_ack",
    BAP_BPP_CONFIRM: "bap_bpp_confirm",
    BAP_BPP_CONFIRM_ACK: "ondc_ack",
    BAP_BPP_STATUS: "bap_bpp_status",
    BAP_BPP_STATUS_ACK: "ondc_ack",
    BAP_BPP_CANCEL: "bap_bpp_cancel",
    BAP_BPP_CANCEL_ACK: "ondc_ack",
    BAP_BPP_RETURN: "bap_bpp_return",
    BAP_BPP_RETURN_ACK: "ondc_ack",
    
    BAP_BPP_TRACK: "bap_bpp_track",
    BAP_BPP_TRACK_ACK: "ondc_ack",
    BAP_BPP_SUPPORT: "bap_bpp_support",
    BAP_BPP_SUPPORT_ACK: "ondc_ack",
    BAP_BPP_RATING: "bap_bpp_rating",
    BAP_BPP_RATING_ACK: "ondc_ack",
    BAP_BPP_RATING_CATEGORIES: "bap_bpp_rating_categories",
    BAP_BPP_RATING_CATEGORIES_ACK: "ondc_ack",
    BAP_BPP_FEEDBACK_CATEGORIES:"bap_bpp_feedback_categories",
    BAP_BPP_FEEDBACK_CATEGORIES_ACK:"ondc_ack",
    BAP_BPP_FEEDBACK_FORM:"bap_bpp_feedback_form",
    BAP_BPP_FEEDBACK_FORM_ACK:"ondc_ack",
    BAP_BPP_ISSUE: "bap_bpp_issue",
    BAP_BPP_ISSUE_ACK: "ondc_ack",
    
    
    CLIENT_API_IGM_ISSUE_STATUS: "client_api_igm_issue_status",
    CLIENT_API_IGM_ISSUE_STATUS_ACK: "ondc_ack",

    BAP_BPP_ISSUE_STATUS_CONSUMER: "bap_bpp_issue_status_consumer",
    BAP_BPP_ISSUE_STATUS_CONSUMER_ACK: "ondc_ack",

    BPP_BAP_ISSUE: "bpp_bap_issue",
    BPP_BAP_ISSUE_ACK:"ondc_ack",
    
    CLIENT_API_BPP_ISSUE:"client_api_bpp_issue",    
    CLIENT_API_BPP_ISSUE_ACK:"ondc_ack",
 


    LSP_BAP_BPP_SEARCH: "lsp_bap_bpp_search",
    LSP_BAP_BPP_SEARCH_ACK: "ondc_ack",
    LSP_BAP_BPP_INIT: "lsp_bap_bpp_init",
    LSP_BAP_BPP_INIT_ACK: "ondc_ack",
    LSP_BAP_BPP_CONFIRM: "lsp_bap_bpp_confirm",
    LSP_BAP_BPP_CONFIRM_ACK: "ondc_ack",
    LSP_BAP_BPP_STATUS: "lsp_bap_bpp_status",
    LSP_BAP_BPP_STATUS_ACK: "ondc_ack",
    LSP_BAP_BPP_TRACK: "lsp_bap_bpp_track",
    LSP_BAP_BPP_TRACK_ACK: "ondc_ack",
    LSP_BAP_BPP_CANCEL: "lsp_bap_bpp_cancel",
    LSP_BAP_BPP_CANCEL_ACK: "ondc_ack",
    LSP_BAP_BPP_UPDATE: "lsp_bap_bpp_update",
    LSP_BAP_BPP_UPDATE_ACK: "ondc_ack",
    LSP_BAP_BPP_SUPPORT: "lsp_bap_bpp_support",
    LSP_BAP_BPP_SUPPORT_ACK: "ondc_ack",

    UPDATE_SHIPPING_ONSTATUS: "public.ondc.shipping_orders.on_status",
    UPDATE_SHIPPING_ONCANCEL: "public.ondc.shipping_orders.on_cancel",
    UPDATE_SHIPPING_ONTRACK: "public.ondc.shipping_orders.on_track",
    CANCEL_LSP_FROM_SHIPPING_ORDER : "public.ondc.shipping_orders.cancel",
    GET_LSP_TRACK_FROM_SHIPPING_ORDER : "public.ondc.shipping_orders.track",

    ONDC_ACK:"ondc_ack",

    ONDC_UPDATE_CACHE_SEARCH_STATUS:  "public.ondc.update_cache_search_status"
}


const techAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}

//currently bpp cluster is not in use 
// const bppAckConsumer = async (consumerConfig) => {
    
//     let consumer = await consumeKafkaEvent(consumerConfig)

//     // let ackResponse

//     await consumer.run({
//         autoCommitInterval: 5000,
//         eachMessage: async ({ topic, partition, message }) => {

//             let response = JSON.parse(message.value.toString());

//             // console.log({
//             //     partition,
//             //     topic: topic,
//             //     offset: message.offset,
//             //     value: message.value.toString(),
//             // })

//             if (response.context?.message_id) {
//                 await redisClient.set(response.context?.message_id, JSON.stringify(response));
//             }
//         }
//     }
//     )
// }
const bapAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}
const lspAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}
const igmAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}
const bgAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}




const InitConsumer = async () => {
    
    //common consumer clusters
    // techAckConsumer({cluster:kafkaClusters.Tech, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})
    // bppAckConsumer({cluster:kafkaClusters.Tech, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})
    // bapAckConsumer({cluster:kafkaClusters.BAP, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})
    // lspAckConsumer({cluster:kafkaClusters.LSP, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})
    // igmAckConsumer({cluster:kafkaClusters.IGM, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})
    // bgAckConsumer({cluster:kafkaClusters.BG, topic: topics.ONDC_ACK, groupId: topics.ONDC_ACK})


    // cacheSearchStatusConsumer({cluster:kafkaClusters.Tech, topic: topics.ONDC_UPDATE_CACHE_SEARCH_STATUS, groupId: topics.ONDC_UPDATE_CACHE_SEARCH_STATUS})

    // createOrUpdateProductConsumer({cluster:kafkaClusters.Tech, topic: topics.PRODUCT_CREATE_UPDATE, groupId: topics.PRODUCT_CREATE_UPDATE})
    // createOrUpdateProviderConsumer({cluster:kafkaClusters.Tech, topic: topics.PROVIDER_CREATE_UPDATE, groupId: topics.PROVIDER_CREATE_UPDATE})
    
    // bpp_consumers
    // bppUpdateOrderConsumer({cluster:kafkaClusters.Tech, topic: topics.BPP_SALES_ORDER_CANCEL_RESPONSE, groupId: topics.BPP_SALES_ORDER_CANCEL_RESPONSE})
    // bppUpdateReturnConsumer({cluster:kafkaClusters.Tech, topic: topics.BPP_SALES_ORDER_RETURN_RESPONSE, groupId: topics.BPP_SALES_ORDER_RETURN_RESPONSE})
    // bppOrderStatusConsumer({cluster:kafkaClusters.Tech, topic: topics.BPP_SALES_ORDER_STATUS_RESPONSE, groupId: topics.BPP_SALES_ORDER_STATUS_RESPONSE})
    // bppReturnStatusConsumer({cluster:kafkaClusters.Tech, topic: topics.BPP_SALES_RETURN_STATUS_RESPONSE, groupId: topics.BPP_SALES_RETURN_STATUS_RESPONSE})
    // bppCancelOrderConsumer({cluster:kafkaClusters.Tech, topic: topics.BPP_FULL_ORDER_CANCEL, groupId: topics.BPP_FULL_ORDER_CANCEL})

    // bapSearchConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_SEARCH, groupId: topics.CLIENT_API_BAP_SEARCH})
    // bapSelectConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_SELECT, groupId: topics.CLIENT_API_BAP_SELECT})
    // bapInitConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_INIT, groupId: topics.CLIENT_API_BAP_INIT})
    // bapConfirmConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_CONFIRM, groupId: topics.CLIENT_API_BAP_CONFIRM})
    // bapStatusConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_STATUS, groupId: topics.CLIENT_API_BAP_STATUS})
    // bapCancelConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_CANCEL, groupId: topics.CLIENT_API_BAP_CANCEL})
    // bapTrackConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_TRACK, groupId: topics.CLIENT_API_BAP_TRACK})
    // bapSupportConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_SUPPORT, groupId: topics.CLIENT_API_BAP_SUPPORT})
    // bapRatingConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_RATING, groupId: topics.CLIENT_API_BAP_RATING})
    // bapRatingCategoriesConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_RATING_CATEGORIES, groupId: topics.CLIENT_API_BAP_RATING_CATEGORIES})
    // bapFeedbackCategoriesConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_FEEDBACK_CATEGORIES, groupId: topics.CLIENT_API_BAP_FEEDBACK_CATEGORIES})
    // bapFeedbackFormConsumer({cluster:kafkaClusters.BAP, topic: topics.CLIENT_API_BAP_FEEDBACK_FORM, groupId: topics.CLIENT_API_BAP_FEEDBACK_FORM})
    
    // lspBapSearchConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_SEARCH, groupId: topics.CLIENT_API_LSP_BAP_SEARCH})
    // lspBapInitConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_INIT, groupId: topics.CLIENT_API_LSP_BAP_INIT})
    // lspBapConfirmConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_CONFIRM, groupId: topics.CLIENT_API_LSP_BAP_CONFIRM})
    // lspBapStatusConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_STATUS, groupId: topics.CLIENT_API_LSP_BAP_STATUS})
    // lspBapTrackConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_TRACK, groupId: topics.CLIENT_API_LSP_BAP_TRACK})
    // lspBapCancelConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_CANCEL, groupId: topics.CLIENT_API_LSP_BAP_CANCEL})
    // lspBapUpdateConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_UPDATE, groupId: topics.CLIENT_API_LSP_BAP_UPDATE})
    // lspBapSupportConsumer({cluster:kafkaClusters.LSP, topic: topics.CLIENT_API_LSP_BAP_SUPPORT, groupId: topics.CLIENT_API_LSP_BAP_SUPPORT})

    //lspconsumers
    // shippingtolspCancel({cluster:kafkaClusters.Tech, topic: topics.CANCEL_LSP_FROM_SHIPPING_ORDER, groupId: topics.CANCEL_LSP_FROM_SHIPPING_ORDER})
    // getTrackfromshippingtolsp({cluster:kafkaClusters.Tech, topic: topics.GET_LSP_TRACK_FROM_SHIPPING_ORDER, groupId: topics.GET_LSP_TRACK_FROM_SHIPPING_ORDER})

    // bapBppSearchConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_SEARCH, groupId: topics.BAP_BPP_SEARCH})
    // bapBppSelectConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_SELECT, groupId: topics.BAP_BPP_SELECT})
    // bapBppInitConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_INIT, groupId: topics.BAP_BPP_INIT})
    // bapBppConfirmConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_CONFIRM, groupId: topics.BAP_BPP_CONFIRM})
    // bapBppStatusConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_STATUS, groupId: topics.BAP_BPP_STATUS})
    // bapBppCancelConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_CANCEL, groupId: topics.BAP_BPP_CANCEL})
    // bapBppTrackConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_TRACK, groupId: topics.BAP_BPP_TRACK})
    // bapBppSupportConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_SUPPORT, groupId: topics.BAP_BPP_SUPPORT})
    // bapBppRatingConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_RATING, groupId: topics.BAP_BPP_RATING})
    // bapBppRatingCategoriesConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_RATING_CATEGORIES, groupId: topics.BAP_BPP_RATING_CATEGORIES})
    // bapBppFeedbackCategoriesConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_FEEDBACK_CATEGORIES, groupId: topics.BAP_BPP_FEEDBACK_CATEGORIES})
    // bapBppFeedbackFormConsumer({cluster:kafkaClusters.BG, topic: topics.BAP_BPP_FEEDBACK_FORM, groupId: topics.BAP_BPP_FEEDBACK_FORM})

    
    // lspBapBppSearchConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_SEARCH, groupId: topics.LSP_BAP_BPP_SEARCH})
    // lspBapBppInitConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_INIT, groupId: topics.LSP_BAP_BPP_INIT})
    // lspBapBppConfirmConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_CONFIRM, groupId: topics.LSP_BAP_BPP_CONFIRM})
    // lspBapBppStatusConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_STATUS, groupId: topics.LSP_BAP_BPP_STATUS})
    // lspBapBppTrackConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_TRACK, groupId: topics.LSP_BAP_BPP_TRACK})
    // lspBapBppCancelConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_CANCEL, groupId: topics.LSP_BAP_BPP_CANCEL})
    // lspBapBppUpdateConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_UPDATE, groupId: topics.LSP_BAP_BPP_UPDATE})
    // lspBapBppSupportConsumer({cluster:kafkaClusters.BG, topic: topics.LSP_BAP_BPP_SUPPORT, groupId: topics.LSP_BAP_BPP_SUPPORT})
    
    //-----------------------------------IGM------------------------------------------------------------------
    
    // createIssueConsumer({cluster:kafkaClusters.IGM, topic: topics.CREATE_ISSUE, groupId: topics.CREATE_ISSUE})
    // createOnIssueConsumer({cluster:kafkaClusters.IGM, topic: topics.CREATE_ON_ISSUE, groupId: topics.CREATE_ON_ISSUE})
    // bapIssueConsumer({cluster:kafkaClusters.IGM, topic: topics.CLIENT_API_BAP_ISSUE, groupId: topics.CLIENT_API_BAP_ISSUE})
    // bppBapIssueConsumer({cluster:kafkaClusters.IGM,topic:topics.BPP_BAP_ISSUE, groupId:topics.BPP_BAP_ISSUE})
    // bppIssueConsumer({cluster:kafkaClusters.IGM,topic:topics.CLIENT_API_BPP_ISSUE,groupId:topics.CLIENT_API_BPP_ISSUE} )
    // issueStatusConsumer({cluster:kafkaClusters.IGM,topic:topics.CLIENT_API_IGM_ISSUE_STATUS,groupId:topics.CLIENT_API_IGM_ISSUE_STATUS})
    // bapBppIssueStatusConsumer({cluster:kafkaClusters.IGM,topic:topics.BAP_BPP_ISSUE_STATUS_CONSUMER,groupId:topics.BAP_BPP_ISSUE_STATUS_CONSUMER})
    // bapBppIssueConsumer({cluster:kafkaClusters.IGM, topic: topics.BAP_BPP_ISSUE, groupId: topics.BAP_BPP_ISSUE})
}

export { InitConsumer, topics };
