"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const cover_1 = require("../../cover/cover");
const SearchResultListItemCover = ({ id, description, url, tint }) => {
    return (react_1.default.createElement(cover_1.Cover, { animate: true, id: id, size: "small", description: String(description), url: url, tint: tint }));
};
exports.default = SearchResultListItemCover;
