"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const store_1 = require("../store");
exports.default = (Component, suffix, reduxAction) => {
    return (props) => {
        const pattern = new RegExp(`.*${suffix}$`, "g");
        // Match all props that ends with suffix.
        const suffixEntries = Object.fromEntries(Object.entries(props).filter(([prop]) => {
            return String(prop).match(pattern);
        }));
        // and match all props that do NOT end with suffix.
        const nonSuffixEntries = Object.fromEntries(Object.entries(props).filter(([prop]) => {
            return !String(prop).match(pattern);
        }));
        // Put found props in redux store - if any.
        if (Object.keys(suffixEntries).length) {
            store_1.store.dispatch(reduxAction({
                entries: suffixEntries
            }));
        }
        // Since this is a High Order Functional Component
        // we do not know what props we are dealing with.
        // That is a part of the design.
        // eslint-disable-next-line react/jsx-props-no-spreading
        return react_1.default.createElement(Component, { ...nonSuffixEntries });
    };
};
