"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = __importDefault(require("react"));
const url_1 = require("../../core/utils/helpers/url");
const Link = ({ href, children, isNewTab, className, id, trackClick, dataCy }) => {
    const redirect = (redirectToNewTab) => {
        if (redirectToNewTab) {
            window.open(href.href, "_blank");
        }
        (0, url_1.redirectTo)(href);
    };
    if (!trackClick) {
        return (react_1.default.createElement("a", { id: id, "data-cy": id, href: String(href), target: isNewTab ? "_blank" : "", rel: "noreferrer", className: className }, children));
    }
    return (react_1.default.createElement("span", { id: id, "data-cy": dataCy || id, role: "button", tabIndex: 0, onClick: () => {
            trackClick().then(() => {
                redirect(isNewTab || false);
            });
        }, onKeyUp: (e) => {
            if (e.key === "Enter") {
                trackClick().then(() => {
                    redirect(isNewTab || false);
                });
            }
        }, className: className }, children));
};
exports.Link = Link;
exports.default = exports.Link;
