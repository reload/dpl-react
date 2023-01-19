"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const modal_1 = __importDefault(require("../../core/utils/modal"));
const text_1 = require("../../core/utils/text");
const FacetBrowserModalBody_1 = __importDefault(require("./FacetBrowserModalBody"));
const helper_1 = require("./helper");
const FacetBrowserModal = ({ q, filterHandler, filters }) => {
    const t = (0, text_1.useText)();
    const { facets, isLoading } = (0, helper_1.useGetFacets)(q, filters);
    return (react_1.default.createElement(modal_1.default, { classNames: "modal-right modal--no-padding", modalId: helper_1.FacetBrowserModalId, screenReaderModalDescriptionText: t("facetBrowserModalScreenReaderModalDescriptionText"), closeModalAriaLabelText: t("facetBrowserModalCloseModalAriaLabelText") }, isLoading || !facets ? null : (react_1.default.createElement(FacetBrowserModalBody_1.default, { facets: facets, filterHandler: filterHandler, filters: filters }))));
};
exports.default = FacetBrowserModal;
