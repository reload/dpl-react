"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const text_1 = require("../../core/utils/text");
function ResultPager({ setPageHandler, itemsShown, hitcount }) {
    const t = (0, text_1.useText)();
    return (react_1.default.createElement("div", { className: "result-pager" },
        react_1.default.createElement("p", { className: "text-small-caption result-pager__title" }, t("resultPagerStatusText", {
            placeholders: { "@itemsShown": itemsShown, "@hitcount": hitcount }
        })),
        itemsShown !== hitcount && (react_1.default.createElement("button", { type: "button", className: "btn-primary btn-outline btn-medium arrow__hover--right-small", onClick: setPageHandler }, t("showMoreText").toUpperCase()))));
}
exports.default = ResultPager;
