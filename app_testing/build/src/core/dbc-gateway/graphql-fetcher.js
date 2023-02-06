"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetcher = void 0;
const token_1 = require("../token");
const extractServiceBaseUrls_1 = require("../utils/reduxMiddleware/extractServiceBaseUrls");
const fetcher = (query, variables) => {
    return async () => {
        // The whole concept of agency id, profile and and bearer token needs to be refined.
        // First version is with a library token.
        const token = (0, token_1.getToken)(token_1.TOKEN_USER_KEY) || (0, token_1.getToken)(token_1.TOKEN_LIBRARY_KEY);
        const headers = {
            "Content-Type": "application/json"
        };
        const authHeaders = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        const res = await fetch((0, extractServiceBaseUrls_1.getServiceBaseUrl)(extractServiceBaseUrls_1.serviceUrlKeys.fbi), {
            method: "POST",
            ...{
                headers: {
                    ...headers,
                    ...authHeaders
                }
            },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();
        if (json.errors) {
            const { message } = json.errors[0];
            throw new Error(message);
        }
        return json.data;
    };
};
exports.fetcher = fetcher;
exports.default = {};
