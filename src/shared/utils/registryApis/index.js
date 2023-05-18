import { SUBSCRIBER_TYPE } from "../seller_enums.js";
import HttpRequest from "../HttpRequest.js";
import { REGISTRY_SERVICE_API_URLS } from "./routes.js";
import { formatRegistryRequest } from './../cryptic.js';
import { getSubscriberType } from "./registryUtil.js";
import { Configuration } from "../../../buyer/config/config.js";
/**
 * lookup bpp by Id
 * @param {Object} subscriberDetails 
 *  
 */
const lookupBppById = async ({
    subscriber_id,
    type,
    domain = Configuration?.DOMAIN,
    country = Configuration?.COUNTRY
}) => {
    let request = { subscriber_id, type, domain, country };
    let registryBaseUrl = REGISTRY_SERVICE_API_URLS.LOOKUP;

    if (process.env.ENV_TYPE !== "STAGING") {
        request = await formatRegistryRequest({
            subscriber_id, type, domain, country
        });
        registryBaseUrl = REGISTRY_SERVICE_API_URLS.VLOOKUP;
    }
    const apiCall = new HttpRequest(
        // Configuration?.PROTOCOL_BASE_URL,
        Configuration?.REGISTRY_BASE_URL,
        registryBaseUrl,
        "POST",
        { ...request }
    );

    const result = await apiCall.send();
    return result.data;
};

/**
 * lookupRsp
 * @param {Object} request 
 *  
 */

const lookupRsp = async (request) => {
    let registryBaseUrl = REGISTRY_SERVICE_API_URLS.LOOKUP;

    const apiCall = new HttpRequest(
        Configuration?.REGISTRY_BASE_URL,
        registryBaseUrl,
        "POST",
        request
    );

    const result = await apiCall.send();
    return result.data;
}

/**
 * lookup gateways
 * @param {Object} subscriberDetails 
 *  
 */
const lookupGateways = async (subscriber_id = Configuration?.BG_ID) => {
    let registryBaseUrl = REGISTRY_SERVICE_API_URLS.LOOKUP;
    let request = {
        subscriber_id: subscriber_id,
        type: getSubscriberType(SUBSCRIBER_TYPE.BG),
        domain: Configuration?.DOMAIN,
        country: Configuration?.COUNTRY
    };

    console.log("process.env.ENV_TYPE", process.env.ENV_TYPE);
    // if (process.env.ENV_TYPE !== "STAGING") {
    //     request = await formatRegistryRequest({
    //         subscriber_id: subscriber_id,
    //         type: getSubscriberType(SUBSCRIBER_TYPE.BG),
    //         country: Configuration?.COUNTRY,
    //         domain: Configuration?.DOMAIN,
    //     });
    //     registryBaseUrl = REGISTRY_SERVICE_API_URLS.VLOOKUP;
    // }

    console.log(Configuration?.REGISTRY_BASE_URL + registryBaseUrl);

    console.log("request", request);
    const apiCall = new HttpRequest(
        Configuration?.REGISTRY_BASE_URL,
        registryBaseUrl,
        "POST",
        {
            ...request
        }
    );

    const result = await apiCall.send();
    console.log(JSON.stringify(result.data));
    return result.data;
};

export { lookupBppById, lookupGateways, lookupRsp };
