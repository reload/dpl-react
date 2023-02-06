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
const clsx_1 = __importDefault(require("clsx"));
const React = __importStar(require("react"));
const text_1 = require("../../../core/utils/text");
const SearchResultHeader = ({ hitcount, q }) => {
    const t = (0, text_1.useText)();
    const hasResults = Boolean(hitcount);
    const classes = (0, clsx_1.default)(["text-header-h2", "mb-16", "search-result-title"], {
        "text-loading": !hasResults
    });
    return (<h1 className={classes} data-cy="search-result-title">
      {hasResults && `${t("showingResultsForText")} “${q}” (${hitcount})`}
      {!hasResults && `${t("showingResultsForText")} “${q}”`}
    </h1>);
};
exports.default = SearchResultHeader;
