"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentLocationWithParametersUrl = exports.isUrlValid = exports.redirectToLoginAndBack = exports.removeQueryParametersFromUrl = exports.replaceCurrentLocation = exports.turnUrlStringsIntoObjects = exports.constructSearchUrlWithFilter = exports.constructSearchUrl = exports.constructMaterialUrl = exports.processUrlPlaceholders = exports.constructUrlWithPlaceholder = exports.redirectTo = exports.setQueryParametersInUrl = exports.getUrlQueryParam = exports.appendQueryParametersToUrl = exports.getCurrentLocation = void 0;
const getCurrentLocation = () => String(window.location);
exports.getCurrentLocation = getCurrentLocation;
const appendQueryParametersToUrl = (url, parameters) => {
    // We need to clone url in order not to manipulate the incoming object.
    const processedUrl = new URL(url);
    Object.keys(parameters).forEach((key) => {
        processedUrl.searchParams.set(key, encodeURI(parameters[key]));
    });
    return processedUrl;
};
exports.appendQueryParametersToUrl = appendQueryParametersToUrl;
const getUrlQueryParam = (param) => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(param)
        ? decodeURI(String(queryParams.get(param)))
        : null;
};
exports.getUrlQueryParam = getUrlQueryParam;
const setQueryParametersInUrl = (parameters) => {
    const processedUrl = new URL((0, exports.getCurrentLocation)());
    Object.keys(parameters).forEach((key) => {
        processedUrl.searchParams.set(key, parameters[key]);
    });
    window.history.replaceState(null, "", processedUrl);
};
exports.setQueryParametersInUrl = setQueryParametersInUrl;
const redirectTo = (url) => {
    window.location.assign(url);
};
exports.redirectTo = redirectTo;
const constructUrlWithPlaceholder = (url, placeholderName, replacement) => {
    const regex = new RegExp(`${placeholderName}`, "g");
    const placeholders = url.match(regex);
    if (!placeholders) {
        return url;
    }
    return url.replace(regex, replacement);
};
exports.constructUrlWithPlaceholder = constructUrlWithPlaceholder;
const processUrlPlaceholders = (url, placeholders) => {
    let processedUrl = url;
    placeholders.forEach((placeholder) => {
        const [name, replacement] = placeholder;
        processedUrl = (0, exports.constructUrlWithPlaceholder)(processedUrl, name, replacement);
    });
    return processedUrl;
};
exports.processUrlPlaceholders = processUrlPlaceholders;
const constructMaterialUrl = (url, workId, type) => {
    const materialUrl = url;
    // Replace placeholders with values.
    materialUrl.pathname = (0, exports.processUrlPlaceholders)(url.pathname, [
        [":workid", workId]
    ]);
    // Append type if specified.
    if (type) {
        return (0, exports.appendQueryParametersToUrl)(materialUrl, { type });
    }
    return materialUrl;
};
exports.constructMaterialUrl = constructMaterialUrl;
const constructSearchUrl = (searchUrl, q) => (0, exports.appendQueryParametersToUrl)(searchUrl, {
    q
});
exports.constructSearchUrl = constructSearchUrl;
const constructSearchUrlWithFilter = (args) => {
    const { searchUrl, selectedItemString, filter } = args;
    return (0, exports.appendQueryParametersToUrl)(searchUrl, {
        q: selectedItemString,
        ...filter
    });
};
exports.constructSearchUrlWithFilter = constructSearchUrlWithFilter;
const turnUrlStringsIntoObjects = (urls) => {
    return Object.keys(urls).reduce((acc, key) => {
        return {
            ...acc,
            [key]: new URL(urls[key], (0, exports.getCurrentLocation)())
        };
    }, {});
};
exports.turnUrlStringsIntoObjects = turnUrlStringsIntoObjects;
const replaceCurrentLocation = (replacementUrl) => {
    window.history.replaceState(null, "", replacementUrl);
};
exports.replaceCurrentLocation = replaceCurrentLocation;
const removeQueryParametersFromUrl = (url, parameter) => {
    url.searchParams.delete(parameter);
    return url;
};
exports.removeQueryParametersFromUrl = removeQueryParametersFromUrl;
function redirectToLoginAndBack({ authUrl, returnUrl, trackingFunction }) {
    const { pathname, search, hash } = returnUrl;
    const localPathToReturnTo = `${pathname}${search}${hash}`;
    const redirectUrl = (0, exports.appendQueryParametersToUrl)(authUrl, {
        "current-path": localPathToReturnTo
    });
    if (trackingFunction) {
        trackingFunction().then(() => (0, exports.redirectTo)(redirectUrl));
    }
    (0, exports.redirectTo)(redirectUrl);
}
exports.redirectToLoginAndBack = redirectToLoginAndBack;
// Checks whether a valid URL can be made out of a given string.
const isUrlValid = (text) => {
    try {
        const url = new URL(text);
        return url.protocol === "http:" || url.protocol === "https:";
    }
    catch (err) {
        return false;
    }
};
exports.isUrlValid = isUrlValid;
const currentLocationWithParametersUrl = (params) => (0, exports.appendQueryParametersToUrl)(new URL((0, exports.getCurrentLocation)()), params);
exports.currentLocationWithParametersUrl = currentLocationWithParametersUrl;
