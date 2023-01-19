"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ButtonTag_1 = __importDefault(require("../Buttons/ButtonTag"));
const FacetLineSelected = ({ filters, filterHandler }) => {
    return (react_1.default.createElement("ul", { className: "facet-line-selected-terms" }, Object.entries(filters).map(([facet, value]) => {
        return (react_1.default.createElement(react_1.default.Fragment, null, Object.entries(value).map(([label, term]) => {
            return (react_1.default.createElement("li", { className: "facet-line-selected-terms__item" },
                react_1.default.createElement(ButtonTag_1.default, { selected: true, removable: true, onClick: () => filterHandler({
                        filterItem: {
                            facet,
                            term
                        },
                        action: "remove"
                    }), dataCy: `facet-line-selected-term-${label}` }, label)));
        })));
    })));
};
exports.default = FacetLineSelected;
