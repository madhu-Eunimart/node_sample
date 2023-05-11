import HttpRequest from "./HttpRequest.js";
import { redisClient } from "../database/redis.js";
import { PROTOCOL_CONTEXT } from './constants.js';
import { GetSearchRequest, GetBapUserCartItem, getOrderByTransactionId } from '../db/dbService.js';
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff';


export const setSourceInRedis = async(sourceType, messageId) => {
    if (sourceType && messageId) {
        let key = 'source:' + messageId
        redisClient.set(key, sourceType)
    }
}

export const callSourceWebhook = async(action, data) => {
    if (data?.context?.message_id) {
        let key = 'source:' +  data?.context?.message_id
        let sourceType = await redisClient.get(key)

        if (!sourceType) {
            sourceType = await getSourceTypeFromDB(action, data)
        }

        if (sourceType == 'ondc.chatbot') {
            callOndcChatbotWebhook(data)
        }
    }
}


export const callOndcChatbotWebhook = async (data) => {

    console.log('callOndcChatbotWebhook');

    const apiCall = new HttpRequest(
        process.env.ONDC_CHATBOT_WEBHOOK_URL,
        "",
        "POST",
        {
            ...data
        },
        {
            "Accept": "application/json"
        }
    );

    try {
        const result = await apiCall.send();
        if (result){
            console.log('callOndcChatbotWebhook Response :', result.data)
        }
    } catch (error) {
        console.log('callOndcChatbotWebhook Error :', error)
    }
}


export const getSourceTypeFromDB = async (action, data) => {
    
    console.log('getSourceTypeFromDB');

    let transactionId = data?.context?.transaction_id

    if (action == PROTOCOL_CONTEXT.ON_SEARCH) {
        let searchRequest = await GetSearchRequest({transaction_id : transactionId})
        return searchRequest?.source
    }

    if (action == PROTOCOL_CONTEXT.ON_SELECT || action == PROTOCOL_CONTEXT.ON_INIT) {
        let cart = await GetBapUserCartItem({transactionId : transactionId})
        return cart?.source
    }

    let order = await getOrderByTransactionId(transactionId)
    return order?.source

}


export const objectKeyDifference = async (a,b) =>{
    
    console.log("Differed keys between 2 objects")
    
    return Object.keys(JSON.parse(JSON.stringify(diff(a,b))))
}