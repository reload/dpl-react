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
    return (<ul className="search-result-page__list my-32" data-cy="search-result-list">
      {/*
            Show skeleton search result items if no data is available yet.
            We'll show 5 items which should cover most screens.
          */}
      {!worksAreLoaded &&
            [...Array(5)].map(() => (<li>
            <search_result_list_item_skeleton_1.default />
          </li>))}
      {worksAreLoaded &&
            resultItems.map((item, i) => (<li key={item.workId}>
            <search_result_list_item_1.default item={item} coverTint={(0, general_1.getCoverTint)(i)} resultNumber={i + 1}/>
          </li>))}
    </ul>);
};
exports.default = SearchResultList;
