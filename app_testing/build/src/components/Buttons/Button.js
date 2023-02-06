"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const icon_arrow_ui_small_right_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/arrow-ui/icon-arrow-ui-small-right.svg"));
const icon_btn_external_link_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/buttons/icon-btn-external-link.svg"));
const clsx_1 = __importDefault(require("clsx"));
const Button = ({ label, buttonType, disabled, collapsible, size, variant, onClick, iconClassNames, id, classNames, dataCy }) => {
    const iconClassName = `btn-icon ${(0, clsx_1.default)({ "btn-collapsible": collapsible }, [
        iconClassNames
    ])}`;
    const Icon = react_1.default.useCallback(() => {
        if (variant === "outline") {
            return null;
        }
        if (buttonType === "default") {
            return (react_1.default.createElement("div", { className: "ml-16" },
                react_1.default.createElement(icon_arrow_ui_small_right_svg_1.default, null)));
        }
        if (buttonType === "external-link") {
            return react_1.default.createElement("img", { className: iconClassName, src: icon_btn_external_link_svg_1.default, alt: "" });
        }
        return null;
    }, [buttonType, iconClassName, variant]);
    return (react_1.default.createElement("button", { "data-cy": dataCy || "button", type: "button", className: `btn-primary btn-${variant} btn-${size} ${disabled ? "btn-outline" : ""} arrow__hover--right-small ${classNames ?? ""}`, disabled: disabled, onClick: onClick, id: id },
        `${label}${buttonType === "search" ? " (6)" : ""}`,
        react_1.default.createElement(Icon, null)));
};
exports.Button = Button;
