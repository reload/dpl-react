"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const general_1 = require("../../core/utils/helpers/general");
const search_result_list_item_1 = __importDefault(require("./search-result-list-item/search-result-list-item"));
const search_result_list_item_skeleton_1 = __importDefault(require("./search-result-list-item/search-result-list-item-skeleton"));
const SearchResultList = ({ resultItems }) => {
    const worksAreLoaded = (0, general_1.dataIsNotEmpty)(resultItems);
    return (react_1.default.createElement("ul", { className: "search-result-page__list my-32", "data-cy": "search-result-list" },
        !worksAreLoaded &&
            [...Array(5)].map(() => (react_1.default.createElement("li", null,
                react_1.default.createElement(search_result_list_item_skeleton_1.default, null)))),
        worksAreLoaded &&
            resultItems.map((item, i) => (react_1.default.createElement("li", { key: item.workId },
                react_1.default.createElement(search_result_list_item_1.default, { item: item, coverTint: (0, general_1.getCoverTint)(i), resultNumber: i + 1 }))))));
};
exports.default = SearchResultList;
