"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const token_1 = require("../../token");
const extractServiceBaseUrls_1 = require("../../utils/reduxMiddleware/extractServiceBaseUrls");
const fetcher = async ({ url, method, params, data }) => {
    const additionalHeaders = data?.headers === "object" ? data?.headers : {};
    const baseURL = (0, extractServiceBaseUrls_1.getServiceBaseUrl)(extractServiceBaseUrls_1.serviceUrlKeys.materialList);
    const userToken = (0, token_1.getToken)(token_1.TOKEN_USER_KEY);
    const authHeaders = userToken
        ? { Authorization: `Bearer ${userToken}` }
        : {};
    const headers = {
        ...authHeaders,
        ...additionalHeaders
    };
    const body = data ? JSON.stringify(data) : null;
    const response = await fetch(`${baseURL}${url}${new URLSearchParams(params)}`, {
        method,
        headers,
        body
    });
    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    try {
        return (await response.json());
    }
    catch (e) {
        if (!(e instanceof SyntaxError)) {
            throw e;
        }
    }
    // Do nothing. Some of our responses are intentionally empty and thus
    // cannot be converted to JSON. Fetch API and TypeScript has no clean
    // way for us to identify empty responses so instead we swallow
    // syntax errors during decoding.
    return null;
};
exports.fetcher = fetcher;
exports.default = exports.fetcher;
