"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const lodash_1 = require("lodash");
const react_use_1 = require("react-use");
const text_1 = require("../../core/utils/text");
const Button_1 = require("../Buttons/Button");
const ButtonTag_1 = __importDefault(require("../Buttons/ButtonTag"));
const DisclosureControllable_1 = __importDefault(require("../Disclosures/DisclosureControllable"));
const useStatistics_1 = require("../../core/statistics/useStatistics");
const statistics_1 = require("../../core/statistics/statistics");
const modal_1 = require("../../core/utils/modal");
const helper_1 = require("./helper");
const FacetBrowserModalBody = ({ facets, filterHandler, filters }) => {
    const t = (0, text_1.useText)();
    const { close } = (0, modal_1.useModalButtonHandler)();
    const { track } = (0, useStatistics_1.useStatistics)();
    (0, react_use_1.useDeepCompareEffect)(() => {
        if ((0, lodash_1.isEmpty)(filters)) {
            return;
        }
        track("click", {
            id: statistics_1.statistics.searchFacets.id,
            name: statistics_1.statistics.searchFacets.name,
            trackedData: (0, helper_1.getAllFilterPathsAsString)(filters)
        });
        // We only want to track when filters change value.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);
    return (react_1.default.createElement("section", { className: "facet-browser" },
        react_1.default.createElement("header", { className: "facet-browser__header" },
            react_1.default.createElement("h3", { className: "text-header-h3" }, t("filterListText")),
            false && (react_1.default.createElement("button", { type: "button", className: "link-tag cursor-pointer facet-browser__clear-btn" }, t("clearAllText")))),
        facets.map((facet) => {
            const { name, values } = facet;
            // Remove facets disclosures with no tags
            if (values.length === 0)
                return null;
            const hasSelectedTerms = Boolean(filters[name]);
            return (react_1.default.createElement(DisclosureControllable_1.default, { key: name, cyData: `facet-browser-${name}`, id: name, fullWidth: true, removeHeadlinePadding: true, title: t(`facet${(0, lodash_1.upperFirst)(name)}Text`), showContent: hasSelectedTerms },
                react_1.default.createElement("div", { className: "facet-browser__facet-group" }, values.map((termItem) => {
                    const { term } = termItem;
                    const selected = Boolean(filters[name] && filters[name][term]);
                    // If there is no term name (eg. when using placeholder data, see: FacetBrowserModal)
                    // then do not render term.
                    if (!termItem.term) {
                        return null;
                    }
                    return (react_1.default.createElement(ButtonTag_1.default, { key: term, onClick: (e) => {
                            // This to prevent the disclosure from closing when clicking on a tag because event bobbling
                            e.stopPropagation();
                            filterHandler({
                                filterItem: {
                                    facet: name,
                                    term: termItem
                                },
                                action: selected ? "remove" : "add"
                            });
                        }, selected: selected, dataCy: `facet-browser-${name}-${term}` },
                        termItem.term,
                        " ",
                        termItem?.score && `(${termItem.score})`));
                })),
                false && (react_1.default.createElement("button", { type: "button", className: "link-tag cursor-pointer facet-browser__more-btn" }, t("showMoreText")))));
        }),
        react_1.default.createElement(Button_1.Button, { classNames: "facet-browser__results-btn", label: t("showResultsText"), buttonType: "none", disabled: false, collapsible: false, size: "medium", variant: "filled", onClick: () => {
                close(helper_1.FacetBrowserModalId);
            } })));
};
exports.default = FacetBrowserModalBody;
