import { BapSearchProviderCache, BapSearchItemCache } from './bap_search_cache.js'
import { CITY_CODE } from '../utils/cityCode.js';
import { PROTOCOL_CONTEXT } from '../utils/constants.js';

const cacheSearchProviderAndItem = async (data) => {

    try {
        let bpp_providers = data?.message?.catalog["bpp/providers"];
        if (!bpp_providers) {
            console.log('bpp_providers not found!')
            return
        }

        for (let bpp_provider of bpp_providers) {

            let items = bpp_provider.items
            if (!items) {
                console.log('bpp_item not found!')
                continue
            }

            let provider = {
                context: data?.context,
                "bpp/fulfillments": data?.message?.catalog['bpp/fulfillments'],
                "bpp/descriptor": data?.message?.catalog['bpp/descriptor'],
                id: bpp_provider?.id,
                descriptor: bpp_provider?.descriptor,
                ttl: bpp_provider?.ttl,
                tags: bpp_provider?.tags,
                fulfillments: bpp_provider?.fulfillments,
                time: bpp_provider?.time,
                locations: bpp_provider?.locations
            }

            for (let bpp_item of bpp_provider.items) {

                let item = {
                    id: bpp_item?.id,
                    descriptor: bpp_item?.descriptor,
                    quantity: bpp_item?.quantity,
                    price: bpp_item?.price,
                    category_id: bpp_item?.category_id,
                    fulfillment_id: bpp_item?.fulfillment_id,
                    "@ondc/org/returnable": bpp_item["@ondc/org/returnable"],
                    "@ondc/org/cancellable": bpp_item["@ondc/org/cancellable"],
                    "@ondc/org/return_window": bpp_item["@ondc/org/return_window"],
                    "@ondc/org/seller_pickup_return": bpp_item["@ondc/org/seller_pickup_return"],
                    "@ondc/org/time_to_ship": bpp_item["@ondc/org/time_to_ship"],
                    "@ondc/org/available_on_cod": bpp_item["@ondc/org/available_on_cod"],
                    "@ondc/org/contact_details_consumer_care": bpp_item["@ondc/org/contact_details_consumer_care"],
                    "@ondc/org/statutory_reqs_prepackaged_food": bpp_item["@ondc/org/statutory_reqs_prepackaged_food"],
                    location_id: bpp_item?.location_id,
                    tags: bpp_item?.tags,
                    provider_id: bpp_provider?.id,
                    bpp_id: data?.context?.bpp_id,
                    city: data?.context?.city
                }
                await BapSearchItemCache.create(item)
            }
            await BapSearchProviderCache.create(provider)
        }
    } catch (error) {
        console.log('cacheSearchProviderAndItem:', error)
    }
}

const cacheSearch = async (searchRequest) => {

    var search_string = searchRequest?.message?.intent?.item?.descriptor?.name
    var category_string = searchRequest?.message?.intent?.category?.descriptor?.name || searchRequest?.message?.intent?.category?.id
    var provider_string = searchRequest?.message?.intent?.provider?.id || searchRequest?.message?.intent?.provider?.descriptor?.name

    let query = {
        ...(provider_string && { "descriptor.name": new RegExp(provider_string, "i") }),
        'context.city': searchRequest?.context?.city
    }

    let providers = await BapSearchProviderCache.find(query).lean()

    let cityMapping = CITY_CODE.find(city => {
        if (city.Code === searchRequest.context.city) {
            return city
        }
    })
    var location = searchRequest?.message?.intent?.fulfillment?.end?.location?.gps || cityMapping?.lat_long

    let serviceableProviders = providerServiceabilityCheck(providers, location)

    let result = []

    for (let provider of serviceableProviders) {

        let locs = []
        for (let loc of provider.locations) {
            locs.push(loc.id)
        }

        const query = {
            ...(search_string && { "descriptor.name": new RegExp(search_string, "i") }),
            ...(category_string && { category_id: new RegExp(category_string, "i") }),
            ...(provider.locations && { location_id: { "$in": locs } }),
            provider_id: provider?.id,
            bpp_id: provider?.context?.bpp_id,
            city: provider?.context?.city
        }

        console.log(query)

        let items = await BapSearchItemCache.find(query, { _id: 0, __v: 0, provider_id: 0, bpp_id: 0 }).lean()
        if (items.length == 0) {
            continue
        }

        let response = {
            context: provider?.context,
            message: {
                catalog: {
                    "bpp/fulfillments": provider["bpp/fulfillments"],
                    "bpp/descriptor": provider["bpp/descriptor"],
                    "bpp/providers": [{
                        id: provider?.id,
                        descriptor: provider?.descriptor,
                        ttl: provider?.ttl,
                        tags: provider?.tags,
                        fulfillments: provider?.fulfillments,
                        time: provider?.time,
                        locations: provider?.locations,
                        items: items
                    }]
                }
            }
        }

        process.send({
            type: 'SSE',
            message: {
                messageId: searchRequest?.context?.message_id,
                action: PROTOCOL_CONTEXT.ON_SEARCH,
                response: JSON.stringify(response),
            }
        })

        result.push(response)
    }

    return result
}

const providerServiceabilityCheck = (providers, location) => {
    try {
        let searchLat = location.split(",")[0];
        let searchLong = location.split(",")[1];

        let providersServiceable = [];

        for (let i = 0; i < providers.length; i++) {
            var locations = providers[i]?.locations;
            var tags = providers[i]?.tags;
            var serviceableLocations = [];
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
            if (locations) {
                locations.forEach((location) => {
                    for (let j = 0; j < tag_array.length; j++) {
                        if (tag_array[j]['location'] == location.id || tag_array[j]['location'] == '*') {
                            if (tag_array[j].type == "12" && tag_array[j].unit == 'country' && tag_array[j].val == 'IND') {
                                let obj = serviceableLocations.find(Location => Location.id === location.id);
                                if (!obj) { serviceableLocations.push(location); }
                            } else if (tag_array[j].type == "10") {
                                if (location.gps) {
                                    let providerLat = (location.gps).split(",")[0];
                                    let providerLong = (location.gps).split(",")[1];
                                    let d = calcCrow(
                                        { lat: parseFloat(providerLat), lng: parseFloat(providerLong) },
                                        { lat: parseFloat(searchLat), lng: parseFloat(searchLong) }
                                    );
                                    if (d <= tag_array[j].val) {
                                        delete location?.circle;
                                        let obj = serviceableLocations.find(Location => Location.id === location.id);
                                        if (!obj) { serviceableLocations.push(location); }
                                    }
                                }
                            }
                        }
                    }
                });
            }
            if (serviceableLocations.length > 0) {
                providers[i]["locations"] = serviceableLocations;
                providersServiceable.push(providers[i])
            }
        }
        return providersServiceable;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const calcCrow = (coords1, coords2) => {
    var R = 6371; //km 
    var dLat = toRad(coords2.lat - coords1.lat);
    var dLon = toRad(coords2.lng - coords1.lng);
    var lat1 = toRad(coords1.lat);
    var lat2 = toRad(coords2.lat);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return d;
}

const toRad = (Value) => {
    return (Value * Math.PI) / 180;
}

const clearSearchCache = async () => {
    await BapSearchProviderCache.deleteMany({});
    await BapSearchItemCache.deleteMany({});
} 

export { cacheSearchProviderAndItem, cacheSearch, clearSearchCache };