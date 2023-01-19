"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const guarded_app_1 = __importDefault(require("../../components/guarded-app"));
const config_1 = require("../../core/utils/config");
const general_1 = require("../../core/utils/helpers/general");
const text_1 = require("../../core/utils/text");
const url_1 = require("../../core/utils/url");
const search_result_1 = __importDefault(require("./search-result"));
const SearchResultEntry = ({ q, pageSizeDesktop, pageSizeMobile }) => {
    // If a q string has been defined as a data attribute use that
    // otherwise use the one from the url query parameter.
    const { q: searchQuery } = (0, general_1.getParams)({ q });
    // Get number of result items to be shown.
    // If the number of items has been defined with data attributes use those
    // otherwise get them from the configuration.
    const pageSize = (0, general_1.pageSizeGlobal)({
        desktop: pageSizeDesktop,
        mobile: pageSizeMobile
    });
    return (react_1.default.createElement("div", null, searchQuery && (react_1.default.createElement(guarded_app_1.default, { app: "search-result" },
        react_1.default.createElement(search_result_1.default, { q: searchQuery, pageSize: pageSize })))));
};
exports.default = (0, config_1.withConfig)((0, url_1.withUrls)((0, text_1.withText)(SearchResultEntry)));
