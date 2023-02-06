"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceBaseUrl = exports.serviceUrlKeys = void 0;
exports.serviceUrlKeys = {
    fbs: "fbsBaseUrl",
    publizon: "publizonBaseUrl",
    dplCms: "dplCmsBaseUrl",
    cover: "coverBaseUrl",
    materialList: "materialListBaseUrl",
    fbi: "fbiBaseUrl"
};
// ServiceBaseUrls "store". We use this to store the base urls for the different services.
let serviceBaseUrls = {};
const filterUrls = (urls, filterFunction) => Object.keys(urls)
    .filter(filterFunction)
    .reduce((obj, key) => {
    return { ...obj, ...{ [key]: urls[key] } };
}, {});
// Redux middleware that extracts the service base urls from the action
// and stores them in the serviceBaseUrls "store".
const extractServiceBaseUrls = () => (next) => (action) => {
    if (String(action.type) === "url/addUrlEntries") {
        const { payload: { entries } } = action;
        // Get all service base urls and put them in the serviceBaseUrls "store".
        serviceBaseUrls = filterUrls(entries, (key) => Object.values(exports.serviceUrlKeys).includes(key));
        // Get the rest of the urls.
        const otherUrls = filterUrls(entries, (key) => !Object.values(exports.serviceUrlKeys).includes(key));
        // Dispatch the urls without the base urls.
        return next({
            ...action,
            payload: { entries: otherUrls }
        });
    }
    return next(action);
};
const getServiceBaseUrl = (apiBaseUrlKey) => {
    if (!serviceBaseUrls[apiBaseUrlKey]) {
        throw new Error(`Service base url for ${apiBaseUrlKey} is not defined.`);
    }
    return serviceBaseUrls[apiBaseUrlKey];
};
exports.getServiceBaseUrl = getServiceBaseUrl;
exports.default = extractServiceBaseUrls;
