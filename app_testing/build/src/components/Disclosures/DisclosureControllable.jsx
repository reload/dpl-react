"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExpandMore_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg"));
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
// It was not possible to use the Disclosure component thats already in the project
// because we don't have control over the open attribute
const DisclosureControllable = ({ id, title, children, fullWidth, showContent = false, removeHeadlinePadding, cyData, mainIconPath }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(showContent);
    const toggleOpen = (0, react_1.useCallback)(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    const disclosureId = `disclosure-${id}`;
    return (<div className={`disclosure text-body-large ${fullWidth ? "disclosure--full-width" : ""}`}>
      <div className={(0, clsx_1.default)("disclosure__headline text-body-large", removeHeadlinePadding && "disclosure__headline--no-padding")} data-cy={cyData} onClick={toggleOpen} onKeyDown={toggleOpen} role="button" tabIndex={0} aria-controls={disclosureId} aria-expanded={isOpen}>
        {mainIconPath && (<div className="disclosure__icon bg-identity-tint-120">
            <img className="invert" src={mainIconPath} alt=""/>
          </div>)}
        <span className="disclosure__text">{title}</span>

        <img className="disclosure__expand noselect" src={ExpandMore_svg_1.default} alt=""/>
      </div>
      {isOpen && <div id={disclosureId}>{children}</div>}
    </div>);
};
exports.default = DisclosureControllable;
