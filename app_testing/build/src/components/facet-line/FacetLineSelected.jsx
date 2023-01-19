"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ButtonTag_1 = __importDefault(require("../Buttons/ButtonTag"));
const FacetLineSelected = ({ filters, filterHandler }) => {
    return (<ul className="facet-line-selected-terms">
      {Object.entries(filters).map(([facet, value]) => {
            return (<>
            {Object.entries(value).map(([label, term]) => {
                    return (<li className="facet-line-selected-terms__item">
                  <ButtonTag_1.default selected removable onClick={() => filterHandler({
                            filterItem: {
                                facet,
                                term
                            },
                            action: "remove"
                        })} dataCy={`facet-line-selected-term-${label}`}>
                    {label}
                  </ButtonTag_1.default>
                </li>);
                })}
          </>);
        })}
    </ul>);
};
exports.default = FacetLineSelected;
