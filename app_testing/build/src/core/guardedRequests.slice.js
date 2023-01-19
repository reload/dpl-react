"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reRunRequest = exports.guardedRequest = exports.removeRequest = exports.addRequest = exports.hasRequestExpired = exports.AUTH_PARAM = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
// eslint-disable-next-line import/no-cycle
const material_list_1 = require("./material-list-api/material-list");
// TODO: Fix dependency cycle problem
// There is not an obvious solution but we need access to the persistor
// in the guardedRequest thunk.
// eslint-disable-next-line import/no-cycle
const store_1 = require("./store");
const date_1 = __importDefault(require("./utils/helpers/date"));
const url_1 = require("./utils/helpers/url");
const user_1 = require("./utils/helpers/user");
exports.AUTH_PARAM = "didAuthenticate";
const requestCallbacks = {
    addFavorite: ({ id }) => {
        return (0, material_list_1.addItem)("default", id);
    }
};
const getExpireTimestamp = () => (0, date_1.default)() + 60;
const hasRequestExpired = ({ expire }) => {
    // If no expiration timestamp is given. We will expire the request immediately.
    if (!expire) {
        return true;
    }
    return (0, date_1.default)() > expire;
};
exports.hasRequestExpired = hasRequestExpired;
const initialState = { request: null };
const guardedRequests = (0, toolkit_1.createSlice)({
    name: "guardedRequests",
    initialState,
    reducers: {
        addRequest(state, action) {
            const { payload: request } = action;
            if (!request?.expire) {
                request.expire = getExpireTimestamp();
            }
            state.request = request;
        },
        removeRequest(state) {
            state.request = null;
        }
    }
});
_a = guardedRequests.actions, exports.addRequest = _a.addRequest, exports.removeRequest = _a.removeRequest;
const getRequestCallback = (type) => requestCallbacks?.[type];
const requestCallbackExists = (type) => Boolean(getRequestCallback(type));
const getUrlsFromState = (state) => {
    const { url: { data } } = state;
    return (0, url_1.turnUrlStringsIntoObjects)(data);
};
exports.guardedRequest = (0, toolkit_1.createAsyncThunk)("guardedRequests/performRequest", async (requestItem, { dispatch, fulfillWithValue, getState }) => {
    const { type, args } = requestItem;
    // The callback is unknown and we cannot continue.
    if (!requestCallbackExists(type)) {
        return fulfillWithValue({ status: "ignored", message: "Nothing to do" });
    }
    // User is anonymous and the requests is known.
    if ((0, user_1.userIsAnonymous)()) {
        // So we'll store the request for later execution.
        dispatch((0, exports.addRequest)(requestItem));
        // Make sure that the request is persisted.
        store_1.persistor.flush().then(() => {
            // And redirect to external login.
            const { authUrl } = getUrlsFromState(getState());
            if (authUrl) {
                const returnUrl = (0, url_1.currentLocationWithParametersUrl)({
                    [exports.AUTH_PARAM]: "1"
                });
                (0, url_1.redirectToLoginAndBack)({ authUrl, returnUrl });
            }
        });
    }
    // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
    // eslint-disable-next-line no-console
    console.debug("PERFORMING REQUEST CALLBACK");
    // The user is authorized to perform callback. Let's do it!
    const requestCallback = getRequestCallback(type);
    return requestCallback(args);
});
exports.reRunRequest = (0, toolkit_1.createAsyncThunk)("guardedRequests/reRunRequest", async (requestItem, { fulfillWithValue }) => {
    const { type, args } = requestItem;
    // Run request callback.
    if (requestCallbackExists(type)) {
        const requestCallback = getRequestCallback(type);
        // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
        // eslint-disable-next-line no-console
        console.debug("RERUNNING REQUEST");
        return requestCallback(args);
    }
    return fulfillWithValue({ status: "success", message: "" });
});
exports.default = guardedRequests.reducer;
