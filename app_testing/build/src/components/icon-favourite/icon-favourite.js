"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconFavourite = void 0;
const react_1 = __importDefault(require("react"));
const IconFavourite = ({ fill }) => {
    // This svg is a copy from public/icons/basic/icon-heart.svg.
    // If you find out it no longer matches the original file, please update it
    // It is made as inline svg to be able to change fill value from props
    return (react_1.default.createElement("svg", { height: "24", width: "24", className: "icon-favourite", viewBox: "0 0 24 24", fill: fill ? "#000" : "none", xmlns: "http://www.w3.org/2000/svg" },
        react_1.default.createElement("path", { d: "M11.5 20L10.2675 18.921C5.89 15.1035 3 12.5858 3 9.49591C3 6.9782 5.057 5 7.675 5C9.154 5 10.5735 5.66213 11.5 6.70845C12.4265 5.66213 13.846 5 15.325 5C17.943 5 20 6.9782 20 9.49591C20 12.5858 17.11 15.1035 12.7325 18.9292L11.5 20Z", stroke: "black", strokeWidth: "2" })));
};
exports.IconFavourite = IconFavourite;
