"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SearchResultListItemSkeleton = () => {
    return (<article className="search-result-item ssc">
      <div className="ssc-square">&nbsp;</div>
      <div className="ssc-wrapper w-80">
        <div className="ssc-head-line w-60 mb"/>
        <div className="ssc-line w-60 mbs">&nbsp;</div>
        <div className="ssc-line w-60 mbs">&nbsp;</div>
      </div>
    </article>);
};
exports.default = SearchResultListItemSkeleton;
