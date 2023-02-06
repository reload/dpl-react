"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const token_1 = require("../../token");
const extractServiceBaseUrls_1 = require("../../utils/reduxMiddleware/extractServiceBaseUrls");
/**
 * Build URLSearchParams instance with support for arrays of values.
 *
 * By default, URLSearchParams will join arrays of values with a comma. This is
 * not desirable for our use case. Instead, we want arrays of values to be
 * represented as multiple entries with the same key.
 */
function buildParams(data) {
    let params;
    if (typeof data === "string" || data === undefined) {
        params = new URLSearchParams(data);
    }
    else {
        params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((inner) => {
                    params.append(key, inner.toString());
                });
            }
            else {
                params.append(key, value.toString());
            }
        });
    }
    return params;
}
const fetcher = async ({ url, method, headers, params, data }) => {
    const token = (0, token_1.getToken)(token_1.TOKEN_USER_KEY) ?? (0, token_1.getToken)(token_1.TOKEN_LIBRARY_KEY);
    const baseURL = (0, extractServiceBaseUrls_1.getServiceBaseUrl)(extractServiceBaseUrls_1.serviceUrlKeys.dplCms);
    const authHeaders = token
        ? { Authorization: `Bearer ${token}` }
        : {};
    const body = data ? JSON.stringify(data) : null;
    const response = await fetch(`${baseURL}${url}${params ? `?${buildParams(params)}` : ""}`, {
        method,
        headers: {
            ...headers,
            ...authHeaders
        },
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
    // way for us to identify empty responses, so instead we swallow
    // syntax errors during decoding.
    return null;
};
exports.fetcher = fetcher;
exports.default = exports.fetcher;
