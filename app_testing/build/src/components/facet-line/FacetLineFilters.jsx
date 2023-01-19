"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const react_1 = __importDefault(require("react"));
const modal_1 = require("../../core/utils/modal");
const text_1 = require("../../core/utils/text");
const ButtonTag_1 = __importDefault(require("../Buttons/ButtonTag"));
const Dropdown_1 = __importDefault(require("../Dropdown/Dropdown"));
const helper_1 = require("../facet-browser/helper");
const FacetLineFilters = ({ facets = [], filters, filterHandler }) => {
    const t = (0, text_1.useText)();
    const { open } = (0, modal_1.useModalButtonHandler)();
    const formatValuesToDropdown = (facet, values) => {
        return values.map((value) => {
            return {
                label: value.term,
                value: value.key
            };
        });
    };
    const handleDropdownOnchange = (e, facet) => {
        const term = facets
            .find((item) => item.name === facet)
            ?.values.find((item) => item.key === e.target.value);
        filterHandler({
            filterItem: {
                facet,
                term
            },
            action: "add"
        });
    };
    return (<ul className="facet-line mt-48">
      {facets.map(({ name, values }) => {
            if (values.length > 1) {
                return (<li className="facet-line__item">
              <Dropdown_1.default cyData={`facet-line-${name}-dropdown`} placeholder={{
                        label: t(`facet${(0, lodash_1.upperFirst)(name)}Text`),
                        value: ""
                    }} options={formatValuesToDropdown(name, values)} ariaLabel={name} arrowIcon="chevron" classNames="dropdown--grey-borders" innerClassNames={{
                        select: "dropdown__select--inline",
                        arrowWrapper: "dropdown__arrows--inline "
                    }} handleOnChange={(e) => handleDropdownOnchange(e, name)}/>
            </li>);
            }
            return (<>
            {values.map((termObj) => {
                    const { term, score } = termObj;
                    const onClickHandler = () => {
                        filterHandler({
                            filterItem: {
                                facet: name,
                                term: termObj
                            },
                            action: "add"
                        });
                    };
                    // Removes the selected term from the filter line because it is now displayed in the selected line
                    if (filters?.[name]?.[term])
                        return null;
                    return (<li className="facet-line__item">
                  <ButtonTag_1.default key={term} onClick={onClickHandler} selected={false} dataCy={`facet-line-term-${term}`}>
                    {`${term} (${score})`}
                  </ButtonTag_1.default>
                </li>);
                })}
          </>);
        })}
      <li className="facet-line__item">
        <ButtonTag_1.default onClick={() => open(helper_1.FacetBrowserModalId)} dataCy="facet-line-open-browser">
          {t("addMoreFiltersText")}
        </ButtonTag_1.default>
      </li>
    </ul>);
};
exports.default = FacetLineFilters;
