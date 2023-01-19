"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const guardedRequests_slice_1 = require("../core/guardedRequests.slice");
const date_1 = __importDefault(require("../core/utils/helpers/date"));
const url_1 = require("../core/utils/helpers/url");
const user_1 = require("../core/utils/helpers/user");
// This component makes sure to withhold app rendering
// until the persisted request has been executed.
const GuardedApp = ({ app, children }) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { request: persistedRequest } = (0, react_redux_1.useSelector)((state) => state.guardedRequests);
    const isApplicationBlocked = persistedRequest && !(0, user_1.userIsAnonymous)();
    const didAuthenticate = (0, url_1.getUrlQueryParam)(guardedRequests_slice_1.AUTH_PARAM);
    // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
    // eslint-disable-next-line no-console
    console.debug("PERSISTED REQUEST:", persistedRequest);
    (0, react_1.useEffect)(() => {
        if (!persistedRequest) {
            return;
        }
        // We'll leave this debugging here temporarily also in the testing phase for troubleshooting.
        // eslint-disable-next-line no-console
        console.debug("HAS REQUEST EXPIRED?", (0, guardedRequests_slice_1.hasRequestExpired)(persistedRequest));
        // eslint-disable-next-line no-console
        console.debug("CURRENT TIMESTAMP", (0, date_1.default)());
        // eslint-disable-next-line no-console
        console.debug("EXPIRE TIMESTAMP", persistedRequest.expire);
        // If request has expired remove it.
        if ((0, guardedRequests_slice_1.hasRequestExpired)(persistedRequest)) {
            dispatch((0, guardedRequests_slice_1.removeRequest)());
        }
    }, [dispatch, persistedRequest]);
    (0, react_1.useEffect)(() => {
        if (!isApplicationBlocked) {
            return;
        }
        const { app: persistedRequestApp } = persistedRequest;
        // If we do not have the auth url parameter
        // or the request does not belong to this app do nothing.
        if (!didAuthenticate || app !== persistedRequestApp) {
            return;
        }
        // TODO: For some reason the type is not right in the redux type system.
        // It needs to be solved but I do not have the proper solution right now.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch((0, guardedRequests_slice_1.reRunRequest)(persistedRequest));
        const currentUrlWithoutAuthParam = (0, url_1.removeQueryParametersFromUrl)(new URL((0, url_1.getCurrentLocation)()), guardedRequests_slice_1.AUTH_PARAM);
        // Remove auth parameter from url so we don't accidentally
        // repeat the functionality related to it.
        (0, url_1.replaceCurrentLocation)(currentUrlWithoutAuthParam);
        dispatch((0, guardedRequests_slice_1.removeRequest)());
    }, [app, didAuthenticate, dispatch, isApplicationBlocked, persistedRequest]);
    if (isApplicationBlocked) {
        return <div />;
    }
    // This is a special case. We need to return a JSX element
    // and children is not a JSX element.
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};
exports.default = GuardedApp;
