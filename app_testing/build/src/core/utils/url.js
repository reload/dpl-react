"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withUrls = exports.useUrls = void 0;
const react_1 = require("react");
const store_1 = require("../store");
const url_slice_1 = require("../url.slice");
const url_1 = require("./helpers/url");
const withSuffix_1 = __importDefault(require("./withSuffix"));
const useUrls = () => {
    const { data } = (0, store_1.useSelector)((state) => state.url);
    return (0, react_1.useMemo)(() => (0, url_1.turnUrlStringsIntoObjects)(data), [data]);
};
exports.useUrls = useUrls;
const withUrls = (Component) => {
    return (0, withSuffix_1.default)(Component, "Url", url_slice_1.addUrlEntries);
};
exports.withUrls = withUrls;
exports.default = {};
