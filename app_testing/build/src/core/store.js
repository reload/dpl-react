"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSelector = exports.persistor = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const redux_persist_1 = require("redux-persist");
const session_1 = __importDefault(require("redux-persist/lib/storage/session"));
const text_slice_1 = __importDefault(require("./text.slice"));
const user_slice_1 = __importDefault(require("./user.slice"));
const modal_slice_1 = __importDefault(require("./modal.slice"));
const url_slice_1 = __importDefault(require("./url.slice"));
const config_slice_1 = __importDefault(require("./config.slice"));
// TODO: Fix dependency cycle problem
// There is not an obvious solution but we need access to the persistor
// in the guardedRequest thunk.
// eslint-disable-next-line import/no-cycle
const guardedRequests_slice_1 = __importDefault(require("./guardedRequests.slice"));
const extractServiceBaseUrls_1 = __importDefault(require("./utils/reduxMiddleware/extractServiceBaseUrls"));
// TODO: We have planned to get rid of redux-persist.
// When the step has been made to remove it all the persist setup should go as well.
const persistConfig = {
    key: "dpl-react",
    storage: session_1.default,
    blacklist: ["text", "url", "modal", "config"]
};
exports.store = (0, toolkit_1.configureStore)({
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        extractServiceBaseUrls_1.default
    ],
    reducer: (0, redux_persist_1.persistReducer)(persistConfig, (0, toolkit_1.combineReducers)({
        user: user_slice_1.default,
        text: text_slice_1.default,
        modal: modal_slice_1.default,
        url: url_slice_1.default,
        config: config_slice_1.default,
        guardedRequests: guardedRequests_slice_1.default
    })),
    devTools: process.env.NODE_ENV === "development"
});
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
exports.useSelector = react_redux_1.useSelector;
