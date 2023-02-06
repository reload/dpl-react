"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const icon_cross_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-cross.svg"));
const ButtonTag = ({ onClick, selected, children, size, removable = false, dataCy }) => {
    const className = (0, clsx_1.default)("tag", selected && "tag--fill", size && `tag--${size}`, "cursor-pointer");
    return (react_1.default.createElement("button", { type: "button", "aria-pressed": selected ?? undefined, className: className, onClick: onClick, "data-cy": dataCy },
        children,
        removable && (react_1.default.createElement("img", { className: "tag-icon", src: icon_cross_svg_1.default, alt: "close icon" }))));
};
exports.default = ButtonTag;
