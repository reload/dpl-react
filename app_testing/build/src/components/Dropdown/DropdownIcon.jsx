"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const icon_triangle_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-triangle.svg"));
const ExpandMore_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg"));
const DropdownIcon = ({ arrowIcon }) => {
    if (arrowIcon === "triangles") {
        return (<span>
        <img className="dropdown__arrow" src={icon_triangle_svg_1.default} alt=""/>
        <img className="dropdown__arrow dropdown__arrow--bottom" src={icon_triangle_svg_1.default} alt=""/>
      </span>);
    }
    if (arrowIcon === "chevron") {
        return <img className="dropdown__arrow" src={ExpandMore_svg_1.default} alt=""/>;
    }
    return null;
};
exports.default = DropdownIcon;
