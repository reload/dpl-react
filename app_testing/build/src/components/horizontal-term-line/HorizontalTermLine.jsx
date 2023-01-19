"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = require("../atoms/link");
const HorizontalTermLine = ({ title, subTitle, linkList, dataCy = "horizontal-term-line" }) => {
    return (<div data-cy={dataCy} className="text-small-caption horizontal-term-line">
      <p className="text-label-bold">
        {title || ""}{" "}
        {subTitle && (<span className="text-small-caption">{` ${subTitle}`}</span>)}
      </p>

      {linkList.map((item) => {
            const { term, url } = item;
            return (<span key={term}>
            <link_1.Link href={url} className="link-tag">
              {term}
            </link_1.Link>
          </span>);
        })}
    </div>);
};
exports.default = HorizontalTermLine;
