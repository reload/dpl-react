"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFilterPathsAsString = exports.FacetBrowserModalId = exports.useGetFacets = exports.createFilters = exports.formatFacetTerms = exports.getPlaceHolderFacets = exports.allFacetFields = void 0;
const react_1 = require("react");
const lodash_1 = require("lodash");
const graphql_1 = require("../../core/dbc-gateway/generated/graphql");
const branches_1 = __importDefault(require("../../core/utils/branches"));
exports.allFacetFields = [
    graphql_1.FacetField.MainLanguages,
    graphql_1.FacetField.AccessTypes,
    graphql_1.FacetField.ChildrenOrAdults,
    graphql_1.FacetField.Creators,
    graphql_1.FacetField.FictionNonfiction,
    graphql_1.FacetField.FictionalCharacter,
    graphql_1.FacetField.GenreAndForm,
    graphql_1.FacetField.MaterialTypes,
    graphql_1.FacetField.Subjects,
    graphql_1.FacetField.WorkTypes
];
const getPlaceHolderFacets = (facets) => facets.map((facet) => ({
    name: facet,
    values: [
        {
            key: "",
            term: ""
        }
    ]
}));
exports.getPlaceHolderFacets = getPlaceHolderFacets;
const formatFacetTerms = (filters) => {
    return Object.keys(filters).reduce((acc, key) => ({
        ...acc,
        [key]: Object.keys(filters[key])
    }), {});
};
exports.formatFacetTerms = formatFacetTerms;
const createFilters = (facets, branchIdList) => {
    return {
        ...(0, exports.formatFacetTerms)(facets),
        ...(branchIdList ? { branchId: branchIdList } : {})
    };
};
exports.createFilters = createFilters;
function useGetFacets(query, filters) {
    const [facets, setFacets] = (0, react_1.useState)(null);
    const cleanBranches = (0, branches_1.default)();
    const { data, isLoading } = (0, graphql_1.useSearchFacetQuery)({
        q: { all: query },
        facets: exports.allFacetFields,
        facetLimit: 10,
        filters: (0, exports.createFilters)(filters, cleanBranches)
    }, {
        keepPreviousData: true,
        placeholderData: {
            search: {
                facets: (0, exports.getPlaceHolderFacets)(exports.allFacetFields)
            }
        }
    });
    (0, react_1.useEffect)(() => {
        if (!data) {
            return;
        }
        setFacets(data.search.facets);
    }, [data, filters, query]);
    return { facets, isLoading };
}
exports.useGetFacets = useGetFacets;
exports.FacetBrowserModalId = "facet-browser-modal";
function getAllFilterPathsAsString(filterObject) {
    const mappedFilterValues = (0, lodash_1.mapValues)(filterObject, (filter) => {
        return Object.keys(filter);
    });
    const filterNames = Object.keys(mappedFilterValues);
    let allFilterPathsAsString = "";
    filterNames.forEach((filterName) => {
        mappedFilterValues[filterName].forEach((filterValue) => {
            if (allFilterPathsAsString !== "") {
                allFilterPathsAsString = allFilterPathsAsString.concat(";");
            }
            allFilterPathsAsString = allFilterPathsAsString.concat(`facet.${filterName}:${filterValue}`);
        });
    });
    return allFilterPathsAsString;
}
exports.getAllFilterPathsAsString = getAllFilterPathsAsString;
exports.default = {};
