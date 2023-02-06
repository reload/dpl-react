"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const graphql_1 = require("../../core/dbc-gateway/generated/graphql");
const FacetLineSelected_1 = __importDefault(require("./FacetLineSelected"));
const FacetLineFilters_1 = __importDefault(require("./FacetLineFilters"));
const helper_1 = require("../facet-browser/helper");
const branches_1 = __importDefault(require("../../core/utils/branches"));
const FacetLineFiltersSkeleton_1 = __importDefault(require("./FacetLineFiltersSkeleton"));
const FacetLine = ({ q, filters, filterHandler }) => {
    const cleanBranches = (0, branches_1.default)();
    const { data } = (0, graphql_1.useIntelligentFacetsQuery)({
        q: { all: q },
        facetsLimit: 6,
        valuesLimit: 5,
        filters: (0, helper_1.createFilters)(filters, cleanBranches)
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        !data && react_1.default.createElement(FacetLineFiltersSkeleton_1.default, null),
        data && (react_1.default.createElement(FacetLineFilters_1.default, { filters: filters, facets: data.search.intelligentFacets, filterHandler: filterHandler })),
        react_1.default.createElement(FacetLineSelected_1.default, { filters: filters, filterHandler: filterHandler })));
};
exports.default = FacetLine;
