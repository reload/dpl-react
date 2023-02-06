"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = require("../atoms/link");
const HorizontalTermLine = ({ title, subTitle, linkList, dataCy = "horizontal-term-line" }) => {
    return (react_1.default.createElement("div", { "data-cy": dataCy, className: "text-small-caption horizontal-term-line" },
        react_1.default.createElement("p", { className: "text-label-bold" },
            title || "",
            " ",
            subTitle && (react_1.default.createElement("span", { className: "text-small-caption" }, ` ${subTitle}`))),
        linkList.map((item) => {
            const { term, url } = item;
            return (react_1.default.createElement("span", { key: term },
                react_1.default.createElement(link_1.Link, { href: url, className: "link-tag" }, term)));
        })));
};
exports.default = HorizontalTermLine;
