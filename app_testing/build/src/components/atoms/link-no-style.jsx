"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkNoStyle = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = require("./link");
const LinkNoStyle = ({ url, children, isNewTab = false, className, trackClick, dataCy = "link-no-style" }) => {
    return (<link_1.Link href={url} isNewTab={isNewTab} className={`hide-linkstyle ${className || ""}`} trackClick={trackClick} dataCy={dataCy}>
      {children}
    </link_1.Link>);
};
exports.LinkNoStyle = LinkNoStyle;
exports.default = exports.LinkNoStyle;
