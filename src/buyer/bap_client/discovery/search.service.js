import ContextFactory from "../../../shared/factories/ContextFactory.js";
import BppSearchService from "./bppSearch.service.js";
import HttpRequest from "../../../shared/utils/HttpRequest.js";

const bppSearchService = new BppSearchService();

class SearchService {

    /**
    * search
    * @param {Object} searchRequest
    */
    async search(searchRequest = {}, companyId = 1, authToken = "", sourceType) {
        try {

            const { context: requestContext = {}, message = {} } = searchRequest;
            const { criteria = {}, payment = {} } = message;

            var uri = process.env.EUNIMART_CORE_HOST;
            var baseURL = process.env.USER_COMPANY_DETAILS_BASE_PATH + companyId.toString();
            
            if (payment == null || payment == {}){  
                try{
                const apiCall = new HttpRequest(uri,
                    baseURL,
                    "GET",
                    {},
                    {
                        "Authorization": authToken,
                        "Accept": "application/json"
                    }
                );
                const company_result = await apiCall.send();
                payment.buyer_app_finder_fee_type = company_result?.data?.data?.ondc_details?.buyer_app_finder_fee_type
                payment.buyer_app_finder_fee_amount = company_result?.data?.data?.ondc_details?.buyer_app_finder_fee_amount
                }
                catch(e){
                    payment.buyer_app_finder_fee_type = process.env.BAP_FINDER_FEE_TYPE
                    payment.buyer_app_finder_fee_amount = process.env.BAP_FINDER_FEE_AMOUNT
                }
            
            }
            const contextFactory = new ContextFactory();
            const protocolContext = contextFactory.create({
                transactionId: requestContext?.transaction_id,
                bppId: requestContext?.bpp_id,
                bppUrl: requestContext?.bpp_uri,
                city: requestContext.city,
                state: requestContext.state,
                cityCode: requestContext.cityCode,
            });

            //TODO:Delete Test
            protocolContext.bap_uri = "https://c1bc-106-0-38-226.in.ngrok.io/api/v1/ondc/clientApis/bap/eunimart_bap/"
            
            return await bppSearchService.search(
                protocolContext,
                { criteria, payment },
                sourceType
            );

        }
        catch (err) {
            throw err;
        }
    }

}

export default SearchService;
