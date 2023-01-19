"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cover = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const cover_service_1 = require("../../core/cover-service-api/cover-service");
const link_no_style_1 = require("../atoms/link-no-style");
const Cover = ({ url, description, size, animate, tint, id, idType }) => {
    let dataSize = size;
    if (dataSize === "xsmall") {
        dataSize = "small";
    }
    else if (dataSize === "xlarge") {
        dataSize = "large";
    }
    const { data } = (0, cover_service_1.useGetCoverCollection)({
        type: idType || "pid",
        identifiers: [id],
        sizes: [dataSize]
    });
    const tintClasses = {
        default: "bg-identity-tint-120",
        "120": "bg-identity-tint-120",
        "80": "bg-identity-tint-80",
        "60": "bg-identity-tint-60",
        "40": "bg-identity-tint-40",
        "20": "bg-identity-tint-20"
    };
    const classes = {
        wrapper: (0, clsx_1.default)(`cover cover--${size}`, tintClasses[tint || "default"], {
            cover__animate: animate
        })
    };
    const coverUrl = data?.[0]?.imageUrls?.[`${dataSize}`]?.url;
    const image = coverUrl && react_1.default.createElement("img", { src: coverUrl, alt: description || "" });
    return (react_1.default.createElement("div", { className: "cover-container" }, url && description ? (react_1.default.createElement(link_no_style_1.LinkNoStyle, { url: url, className: classes.wrapper }, image)) : (react_1.default.createElement("span", { className: classes.wrapper }, image))));
};
exports.Cover = Cover;
