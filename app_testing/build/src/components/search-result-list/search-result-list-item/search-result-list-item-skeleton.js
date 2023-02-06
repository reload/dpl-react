"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchResultListItemSkeleton = () => {
    return (react_1.default.createElement("article", { className: "search-result-item ssc" },
        react_1.default.createElement("div", { className: "ssc-square" }, "\u00A0"),
        react_1.default.createElement("div", { className: "ssc-wrapper w-80" },
            react_1.default.createElement("div", { className: "ssc-head-line w-60 mb" }),
            react_1.default.createElement("div", { className: "ssc-line w-60 mbs" }, "\u00A0"),
            react_1.default.createElement("div", { className: "ssc-line w-60 mbs" }, "\u00A0"))));
};
exports.default = SearchResultListItemSkeleton;
