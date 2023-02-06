"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withConfig = exports.useConfig = void 0;
const store_1 = require("../store");
const config_slice_1 = require("../config.slice");
const withSuffix_1 = __importDefault(require("./withSuffix"));
function config() {
    return [];
}
const useConfig = () => {
    const { data } = (0, store_1.useSelector)((state) => state.config);
    return (key, options) => {
        if (typeof data[key] !== "string") {
            throw new Error(`Config entry "${key}" is not defined.`);
        }
        if (options?.transformer === "jsonParse") {
            return JSON.parse(data[key]);
        }
        if (options?.transformer === "stringToArray") {
            return data[key].split(",");
        }
        return data?.[key];
    };
};
exports.useConfig = useConfig;
const withConfig = (Component) => {
    return (0, withSuffix_1.default)(Component, "Config", config_slice_1.addConfigEntries);
};
exports.withConfig = withConfig;
exports.default = {};
