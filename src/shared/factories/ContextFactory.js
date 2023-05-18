import { v4 as uuidv4 } from 'uuid';
import { rsp_actions } from '../utils/constants.js';
import { PROTOCOL_CONTEXT, PROTOCOL_VERSION } from '../utils/constants.js';
import {State_STD_Codes} from "../utils/stateSTDCodes.js";
import { Configuration } from '../../buyer/config/config.js';


class ContextFactory {
    

    constructor(arg = {}) {
        let {
            domain = Configuration?.DOMAIN,
           //TODO: map city to city code. eg. Haydrabad
            country = Configuration?.COUNTRY,
            bapId = Configuration.BAP_ID,
            bapUrl = Configuration.BAP_URL,
            bppId = Configuration?.BPP_ID,
            bppUrl = Configuration?.BPP_URL,
            ttl = "P1M",
            city,
            state
        } = arg || {};

        this.domain = domain;
        this.country = country;
        this.bapId = bapId;
        this.bapUrl = bapUrl;
        this.ttl = ttl,
        this.bppId = bppId
        this.bppUrl = bppUrl
        this.timestamp = new Date()
    };

    getCity(city,state,cityCode){

        //map state and city to city code
        if (city){
            if (city.startsWith("std:")){
                return city
            }
        }
        
        if(cityCode){
            return cityCode
        }else{
            cityCode = Configuration?.CITY
            let cityMapping = State_STD_Codes.find(x => {
                if( x.city === city){
                    return x
                }
            })

            if(cityMapping){
                if(cityMapping.code){
                    cityCode = cityMapping.code
                }
            }else{
                cityMapping = State_STD_Codes.find(x => {
                    if( x.city === state){
                        return x
                    }
                })
                if(cityMapping?.code){
                    cityCode = cityMapping.code
                }
            }
            return cityCode
        }


    }

    create(contextObject = {}) {
        const {
            generatedTransactionId = uuidv4(), //FIXME: if ! found in args then create new
            messageId = uuidv4(),
            action = PROTOCOL_CONTEXT.SEARCH,
            bppId,
            bppUrl,
            city,state,cityCode

        } = contextObject || {};
        

        var ttl = contextObject?.ttl || null

        // if contextObject.
        
        if (ttl == null){
        
            switch (action) {
                case PROTOCOL_CONTEXT.CANCEL:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.RETURN:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.CONFIRM:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.INIT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SEARCH:
                    ttl = "PT30S"
                    break;                                
                case PROTOCOL_CONTEXT.TRACK:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SUPPORT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.STATUS:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SELECT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.UPDATE:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.RATING:
                    ttl = "PT30S"
                    break;                              
                case PROTOCOL_CONTEXT.ISSUE:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SUPPORT:
                    ttl = "PT30S"
                    break;
                default:
                    ttl = Configuration?.TTL
            }
        }   
        return {
            domain: contextObject.domain ? contextObject?.domain : this.domain,
            country: contextObject.country ? contextObject?.country : this.country,
            city: this.getCity(city,state,cityCode) ,
            action: action,
            core_version: PROTOCOL_VERSION.v_1_1_0,
            bap_id: contextObject.bap_id ? contextObject?.bap_id :this.bapId,
            bap_uri: contextObject.bap_uri ? contextObject?.bap_uri : this.bapUrl,
            transaction_id:contextObject.transactionId ? contextObject.transactionId :  generatedTransactionId,
            ttl: ttl,
            message_id: messageId,
            timestamp: this.timestamp,

            ...(bppId && { bpp_id: bppId}),
            ...(bppUrl && { bpp_uri: bppUrl})
        };

    }

    IGMcreate(contextObject = {}) {
        const {
            generatedTransactionId = uuidv4(), //FIXME: if ! found in args then create new
            messageId = uuidv4(),
            action = PROTOCOL_CONTEXT.SEARCH,
            bppId,
            bppUrl,
            city,state,cityCode

        } = contextObject || {};
        

        var ttl = contextObject?.ttl || null

        // if contextObject.
        
        if (ttl == null){
        
            switch (action) {
                case PROTOCOL_CONTEXT.CANCEL:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.RETURN:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.CONFIRM:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.INIT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SEARCH:
                    ttl = "PT30S"
                    break;                                
                case PROTOCOL_CONTEXT.TRACK:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SUPPORT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.STATUS:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.SELECT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.UPDATE:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.RATING:
                    ttl = "PT30S"
                    break;                              
                case PROTOCOL_CONTEXT.ISSUE:
                    ttl = "PT2H"
                    break;
                case PROTOCOL_CONTEXT.SUPPORT:
                    ttl = "PT30S"
                    break;
                case PROTOCOL_CONTEXT.ISSUE_STATUS:
                    ttl = "PT30S"
                    break;
                default:
                    ttl = Configuration?.TTL
            }
        }   
        return {
            domain: contextObject.domain ? contextObject?.domain : this.domain,
            country: contextObject.country ? contextObject?.country : this.country,
            city: this.getCity(city,state,cityCode) ,
            action: action,
            core_version: PROTOCOL_VERSION.igm_v_1_0_0,
            bap_id: contextObject.bap_id ? contextObject?.bap_id :this.bapId,
            bap_uri: contextObject.bap_uri ? contextObject?.bap_uri : this.bapUrl,
            transaction_id:contextObject.transactionId ? contextObject.transactionId :  generatedTransactionId,
            ttl: ttl,
            message_id: messageId,
            timestamp: this.timestamp,

            ...(bppId && { bpp_id: bppId}),
            ...(bppUrl && { bpp_uri: bppUrl})
        };

    }

    createBpp(contextObject = {}) {
        const {
            generatedTransactionId = uuidv4(), //FIXME: if ! found in args then create new
            messageId = uuidv4(),
            action = PROTOCOL_CONTEXT.SEARCH,
            bppId,
            bppUrl,
            city,state,cityCode

        } = contextObject || {};
        

        return {
            domain: contextObject.domain ? contextObject?.domain : this.domain,
            country: contextObject.country ? contextObject?.country : this.country,
            city: this.getCity(city,state,cityCode) ,
            action: action,
            core_version: PROTOCOL_VERSION.v_1_0_0,
            bap_id: contextObject.bap_id ? contextObject?.bap_id :this.bppId,
            bap_uri: contextObject.bap_uri ? contextObject?.bap_uri : this.bppUrl,
            transaction_id:contextObject.transactionId ? contextObject.transactionId :  generatedTransactionId,
            ttl: this.ttl,
            message_id: messageId,
            timestamp: this.timestamp,
            
            ...(bppId && { bpp_id: bppId}),
            ...(bppUrl && { bpp_uri: bppUrl})
        };

    }

    RSPcreate(contextObject = {}) {
        const {
            generatedTransactionId = uuidv4(), //FIXME: if ! found in args then create new
            messageId = uuidv4(),
            action = PROTOCOL_CONTEXT.SEARCH,
            bppId,
            bppUrl,

        } = contextObject || {};


        var ttl = contextObject?.ttl || null

        // if contextObject.

        if (ttl == null) {

            switch (action) {
                case rsp_actions.COLLECTOR_RECON:
                    ttl = "P3D"
                    break;
                case rsp_actions.SETTLE:
                    ttl = "P2D"
                    break;
                case rsp_actions.RECEIVER_RECON:
                    ttl = "P2D"
                    break;
                case rsp_actions.RECON_STATUS:
                    ttl = "P2D"
                    break;
                case rsp_actions.ON_COLLECTOR_RECON:
                    ttl = "P3D"
                    break;
                case rsp_actions.ON_RECEIVER_RECON:
                    ttl = "P2D"
                    break;
                case rsp_actions.ON_RECON_STATUS:
                    ttl = "P2D"
                    break;
                case rsp_actions.ON_SETTLE:
                    ttl = "P2D"
                    break;
                default:
                    ttl = Configuration?.TTL
            }
        }
        return {
            domain: contextObject.domain || this.domain,
            country: contextObject.country || this.country,
            city:Configuration?.CITY|| "*",
            action: action,
            core_version: PROTOCOL_VERSION.v_1_0_0,
            bap_id: contextObject.bapId || this.bapId,
            bap_uri: contextObject.bapUrl || this.bapUrl,
            transaction_id: contextObject.transactionId || generatedTransactionId,
            ttl: ttl,
            // key:contextObject.key||null,
            message_id: messageId,
            timestamp: this.timestamp,

            ...(bppId && { bpp_id: bppId }),
            ...(bppUrl && { bpp_uri: bppUrl })
        };

    }
}

export default ContextFactory;
