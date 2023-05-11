import BppSearchService from "./bppSearch.service.js";
import BAPValidator from "../../shared/utils/validations/bap_validations/validations.js"
// import { cacheSearch } from "../../shared/db/bap_search_cache_service.js";
// import { redisClient } from "../../shared/database/redis.js";

const bppSearchService = new BppSearchService();

class SearchService {

    /**
    * search
    * @param {Object} searchRequest
    */
    async ONDCSearch(searchRequest = {}, res) {
        try {

            // logger.info(`[SearchService][search] Search product`, {params: searchRequest});

            const { context: requestContext = {}, message = {} } = searchRequest;
            const { item = {}, category = {}, fulfillment = [], payment = {} } = message?.intent;

            //TODO
            //Validations for Search with item for search string
            //Validations for Search with city
            //Validations for Search with category
            var mode = ""
            if (Object.keys(item).length > 0) {
                mode = "item"
            } else if (Object.keys(category).length > 0) {
                mode = "category"
            } else if (Object.keys(fulfillment).length > 0) {
                mode = "city"
            } else {
                return res.status(401)
                    .json({
                        message: {
                            "ack": { "status": "NACK" },
                            "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
                        }
                    })
            }

            var validation_flag = new BAPValidator().validateSearch(searchRequest, mode)

            if (!validation_flag) {
                return res.status(401)
                    .json({
                        message: {
                            "ack": { "status": "NACK" },
                            "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
                        }
                    })
            }



            return await bppSearchService.ONDCSearch(searchRequest);

        }
        catch (err) {
            throw err;
        }
    }

    async ONDCSearchEvent(searchRequest = {}) {
        try {

            // logger.info(`[SearchService][search] Search product`, {params: searchRequest});
            const { context: requestContext = {}, message = {} } = searchRequest;
            const { item = {}, category = {}, fulfillment = [], payment = {} } = message?.intent;

            //TODO
            //Validations for Search with item for search string
            //Validations for Search with city
            //Validations for Search with category
            var mode = ""
            if (Object.keys(item).length > 0) {
                mode = "item"
            } else if (Object.keys(category).length > 0) {
                mode = "category"
            } else if (Object.keys(fulfillment).length > 0) {
                mode = "city"
            } else {
                return {
                    message: {
                        "ack": { "status": "NACK" },
                        "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
                    }
                }
            }

            var validation_flag = new BAPValidator().validateSearch(searchRequest, mode)

            if (!validation_flag) {
                return {
                    message: {
                        "ack": { "status": "NACK" },
                        "error": { "type": "Gateway", "code": "10000", "message": "Bad or Invalid request error" }
                    }
                }
            }

            // let redisCacheSearchStatus = await redisClient.get('cache_search_status')
            // if(redisCacheSearchStatus == 'true'){
            //     console.log(redisCacheSearchStatus)
            //     cacheSearch(searchRequest)
            //     return { context: searchRequest.context, message: { ack: { status: "ACK" } }};
            // }

            return await bppSearchService.ONDCSearch(searchRequest);
        }
        catch (err) {
            throw err;
        }
    }

    async bppSearchValidator(searchRequest, searchResposne) {
        try {

            console.log("****************searchRequest*********************")
            console.log(JSON.stringify(searchRequest))
            console.log("**************************************************")

            let searchlocation = searchRequest?.message?.intent?.fulfillment?.end?.location?.gps
            console.log(searchlocation);
            let searchLat = searchlocation.split(",")[0];
            let searchLong = searchlocation.split(",")[1];
            let providers = searchResposne?.message?.catalog?.['bpp/providers']
            for (let i = 0; i < providers.length; i++) {
                var locations = providers[i]?.locations;
                var tags = providers[i]?.tags;
                let tag_array = []
                if (tags) {
                    tags.forEach(tag => {
                        if (tag.code == "serviceability") {
                            let tag_list = {}
                            for (let i = 0; i < tag.list.length; i++) {
                                tag_list[tag.list[i].code] = tag.list[i].value
                            }
                            tag_array.push(tag_list)
                        };
                    })
                }
                var responseItems = [];
                let items = providers[i]?.items
                if(items && items.length){
                    items.forEach(item => {
                        if (item?.location_id) {
                            let obj = locations.find(Location => Location.id === item?.location_id);
                            if (obj) {
                                for (let j = 0; j < tag_array.length; j++) {
                                    if (tag_array[j]['location'] == item?.location_id || tag_array[j]['location'] == '*') {
                                        if (tag_array[j].type == "12" && tag_array[j].unit == 'country' && tag_array[j].val == 'IND') {
                                            // flag = true;
                                            let obj1 = responseItems.find(responseItem => responseItem.id === item?.id);
                                            if (!obj1) { responseItems.push(item) }
                                        } else if (tag_array[j].type == "10") {
                                            if (obj.gps) {
                                                let providerLat = (obj.gps).split(",")[0];
                                                let providerLong = (obj.gps).split(",")[1];
                                                let d = this.calcCrow(
                                                    { lat: parseFloat(providerLat), lng: parseFloat(providerLong) },
                                                    { lat: parseFloat(searchLat), lng: parseFloat(searchLong) }
                                                );
                                                if (d <= tag_array[j].val) {
                                                    let obj1 = responseItems.find(responseItem => responseItem.id === item?.id);
                                                    if (!obj1) { responseItems.push(item) }
                                                    // flag = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                providers[i].items = responseItems
            }

            //-----------------------------------------Product Validation------------------------

            var search_string = searchRequest?.message?.intent?.item?.descriptor?.name
            var category_string = searchRequest?.message?.intent?.category?.descriptor?.name || searchRequest?.message?.intent?.category?.id
            var provider_string = searchRequest?.message?.intent?.provider?.id || searchRequest?.message?.intent?.provider?.descriptor?.name

            search_string = search_string ? search_string.toLowerCase() : search_string
            category_string = category_string ? category_string.toLowerCase() : category_string
            provider_string = provider_string ? provider_string.toLowerCase() : provider_string

            console.log("****************searchResposne********************")
            console.log(search_string)
            console.log(category_string)
            console.log(provider_string)
            console.log("**************************************************")

            if (search_string) {
                console.log("INSIDE search_string", search_string)
                for (let i = 0; i < providers.length; i++) {
                    var responseItems = [];
                    let items = providers[i]?.items
                    if(items && items.length){
                        items.forEach(item => {
                            if (item?.descriptor?.name.toLowerCase().includes(search_string)) {
                                responseItems.push(item)
                            }
                        });
                    }
                    providers[i].items = responseItems
                }
            }

            if (category_string) {
                console.log("INSIDE category_string", category_string)
                for (let i = 0; i < providers.length; i++) {
                    var responseItems = [];
                    let items = providers[i]?.items
                    if(items && items.length){
                        items.forEach(item => {
                            if (item?.category_id.toLowerCase().includes(category_string)) {
                                responseItems.push(item)
                            }
                        });
                    }
                    providers[i].items = responseItems
                }
            }

            if (provider_string) {
                console.log("INSIDE provider_string", provider_string)
                var responseProviders = []
                for (let i = 0; i < providers.length; i++) {
                    if (providers[i]?.descriptor?.name.toLowerCase().includes(provider_string)){
                        responseProviders.push(providers[i])
                    }
                }
                searchResposne.message.catalog['bpp/providers'] = responseProviders
            }

            //-----------------------------------------------------------------------------------

            console.log("****************searchResposne********************")
            console.log(JSON.stringify(searchResposne))
            console.log("**************************************************")

            return searchResposne;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    calcCrow(coords1, coords2) {
        var R = 6371; //km 
        var dLat = this.toRad(coords2.lat - coords1.lat);
        var dLon = this.toRad(coords2.lng - coords1.lng);
        var lat1 = this.toRad(coords1.lat);
        var lat2 = this.toRad(coords2.lat);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }

    toRad(Value) {
        return (Value * Math.PI) / 180;
    }
}

export default SearchService;
