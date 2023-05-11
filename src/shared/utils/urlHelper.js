/**
 * 
 * @param {String} baseUrl 
 * @returns 
 */
export const getBaseUri = (baseUrl) => {
    return baseUrl ? baseUrl.endsWith("/") ? baseUrl : baseUrl + "/" : "";
}

export const combineURLs = (baseURL, relativeURL) => {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
};
