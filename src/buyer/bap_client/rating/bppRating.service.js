import { protocolGetRatingCategories, protocolGetFeedbackCategories,protocolGetFeedbackForm } from "../../../shared/utils/protocolApis/index.js";
import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
import { topics } from '../../../shared/eda/consumerInit/initConsumer.js'
import { redisSubscribe } from "../../../shared/database/redis.js";
import BapRatingService from '../../rating/rating.service.js'

let BapService = new BapRatingService()


class BppRatingService {

    /**
     * getratingcategories
     * @param {Object} context 
     * @param {String} refObj 
     * @returns 
     */
     async getBppRatingCategoriesService(uri, context = {}) {
        try {

            const getRatingCategoriesRequest = {
                context: context
            }
            // console.log("kafka client called")
            // let topic = topics.CLIENT_API_BAP_RATING_CATEGORIES

            // await produceKafkaEvent(kafkaClusters.BAP, topic, getRatingCategoriesRequest)
           
            // let response = await redisSubscribe(getRatingCategoriesRequest.context.message_id) 

            let response = await BapService.ONDCRatingCategoriesEvent(getRatingCategoriesRequest)

            // const response = await protocolGetRatingCategories(uri, getRatingCategoriesRequest);
            // console.log("kafka client called and before return")
            return response//{ context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
    
    /**
     * getratingcategories
     * @param {Object} context 
     * @param {String} refObj 
     * @returns 
     */
     async getBppFeedbackCategoriesService(uri, context = {}) {
        try {

            const getFeedbackCategoriesRequest = {
                context: context
            }

            // let topic = topics.CLIENT_API_BAP_FEEDBACK_CATEGORIES
                        
            // await produceKafkaEvent(kafkaClusters.BAP, topic, getFeedbackCategoriesRequest)
           
            // let response = await redisSubscribe(getFeedbackCategoriesRequest.context.message_id)
            // const response = await protocolGetFeedbackCategories(uri, getFeedbackCategoriesRequest);
            
            let response =await BapService.ONDCFeedbackCategoriesEvent(getFeedbackCategoriesRequest)
            return response//{ context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }

    /**
     * getratingcategories
     * @param {Object} context 
     * @param {Object} message 
     * @returns 
     */
     async getBppFeedbackFormService(uri, context = {}, message = {}) {
        try {

            const getFeedbackFormRequest = {
                context: context,
                message: {
                    rating_value:message.rating_value,
                    rating_category:message.rating_category
                }
            }
            // let topic = topics.CLIENT_API_BAP_FEEDBACK_FORM
                        
            // await produceKafkaEvent(kafkaClusters.BAP, topic, getFeedbackFormRequest)
           
            // let response = await redisSubscribe(getFeedbackFormRequest.context.message_id)
                        
            // const response = await protocolGetFeedbackForm(uri, getFeedbackFormRequest);
          
            
            let response = await BapService.ONDCFeedbackFormEvent(getFeedbackFormRequest)
            return response//{ context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
    
    

    /**
     * rating
     * @param {Object} context 
     * @param {Object} message 
     * @returns 
     */
    async BapRating(uri, context = {}, message) {
        try {
            const ratingRequest = {
                context: context,
                message: {
                    rating_category: message.rating_category,
                    id: message.id,
                    value: message.value,
                    feedback_form: message.feedback_form,
                    feedback_id: message.feedback_id
                }
            }
            // let topic = topics.CLIENT_API_BAP_RATING
            // // console.log("rating req--->",ratingRequest)
            // await produceKafkaEvent(kafkaClusters.BAP, topic, ratingRequest)
           
            // let response = await redisSubscribe(ratingRequest.context.message_id) 

            // const response = await protocolRating(uri, ratingRequest);
            
            let response = await BapService.ONDCRatingOrderEvent(ratingRequest)
            return { context: context, message: response.message };
        }
        catch (err) {
            throw err;
        }
    }
    

}

export default BppRatingService;
