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
const react_1 = __importStar(require("react"));
const react_use_1 = require("react-use");
const SearchResultHeader_1 = __importDefault(require("../../components/search-bar/search-result-header/SearchResultHeader"));
const use_pager_1 = __importDefault(require("../../components/result-pager/use-pager"));
const SearchResultList_1 = __importDefault(require("../../components/search-result-list/SearchResultList"));
const graphql_1 = require("../../core/dbc-gateway/generated/graphql");
const helper_1 = require("../../components/facet-browser/helper");
const useFilterHandler_1 = __importDefault(require("./useFilterHandler"));
const useStatistics_1 = require("../../core/statistics/useStatistics");
const dpl_cms_1 = require("../../core/dpl-cms/dpl-cms");
const Campaign_1 = __importDefault(require("../../components/campaign/Campaign"));
const FacetBrowserModal_1 = __importDefault(require("../../components/facet-browser/FacetBrowserModal"));
const statistics_1 = require("../../core/statistics/statistics");
const FacetLine_1 = __importDefault(require("../../components/facet-line/FacetLine"));
const url_1 = require("../../core/utils/helpers/url");
const branches_1 = __importDefault(require("../../core/utils/branches"));
const general_1 = require("../../core/utils/helpers/general");
const SearchResult = ({ q, pageSize }) => {
    const cleanBranches = (0, branches_1.default)();
    const [resultItems, setResultItems] = (0, react_1.useState)([]);
    const [hitcount, setHitCount] = (0, react_1.useState)(0);
    const [canWeTrackHitcount, setCanWeTrackHitcount] = (0, react_1.useState)(false);
    const { PagerComponent, page } = (0, use_pager_1.default)(hitcount, pageSize);
    const { filters, filterHandler } = (0, useFilterHandler_1.default)();
    const { mutate } = (0, dpl_cms_1.useCampaignMatchPOST)();
    const [campaignData, setCampaignData] = (0, react_1.useState)(null);
    const filteringHandler = (filterInfo) => {
        filterHandler(filterInfo);
    };
    const { facets: campaignFacets } = (0, helper_1.useGetFacets)(q, filters);
    // If q changes (eg. in Storybook context)
    // then make sure that we reset the entire result set.
    (0, react_use_1.useDeepCompareEffect)(() => {
        setResultItems([]);
    }, [q, pageSize, filters]);
    const { track } = (0, useStatistics_1.useStatistics)();
    (0, react_1.useEffect)(() => {
        track("click", {
            id: statistics_1.statistics.searchQuery.id,
            name: statistics_1.statistics.searchQuery.name,
            trackedData: q
        });
        // We actually just want to track if the query changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);
    (0, react_use_1.useDeepCompareEffect)(() => {
        if (campaignFacets) {
            mutate({
                data: campaignFacets
            }, {
                onSuccess: (campaign) => {
                    setCampaignData(campaign);
                },
                onError: () => {
                    // TODO: when we handle errors - handle this error
                }
            });
        }
    }, [campaignFacets, mutate]);
    // Check for material type filters in url on pageload
    // This is an initial, intentionally simple approach supporting what is required by the search header.
    // It could be reworked to support all filters and terms at a later point.
    (0, react_1.useEffect)(() => {
        const materialTypeUrlFilter = (0, url_1.getUrlQueryParam)("materialType");
        if (materialTypeUrlFilter) {
            filterHandler({
                filterItem: {
                    facet: graphql_1.FacetField.MaterialTypes,
                    term: { key: materialTypeUrlFilter, term: materialTypeUrlFilter }
                },
                action: "add"
            });
        }
        // We only want to do this once, so we need the dependency array empty
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const { data } = (0, graphql_1.useSearchWithPaginationQuery)({
        q: { all: q },
        offset: page * pageSize,
        limit: pageSize,
        filters: (0, helper_1.createFilters)(filters, cleanBranches)
    });
    (0, react_1.useEffect)(() => {
        if (!data) {
            return;
        }
        const { search: { works: resultWorks, hitcount: resultCount } } = data;
        setHitCount(resultCount);
        // if page has change then append the new result to the existing result
        if (page > 0) {
            setResultItems((prev) => [...prev, ...resultWorks]);
            return;
        }
        setResultItems(resultWorks);
    }, [data, page]);
    (0, react_1.useEffect)(() => {
        // We want to disregard the first hitcount because it is always 0 and doesn't
        // represent reality (the number is set manually by us in the code). We only
        // track all the following hitcount values that are based on the data.
        if (!canWeTrackHitcount) {
            setCanWeTrackHitcount(true);
            return;
        }
        track("click", {
            id: statistics_1.statistics.searchResultCount.id,
            name: statistics_1.statistics.searchResultCount.name,
            trackedData: hitcount ? hitcount.toString() : "0"
        });
        // We actaully just want to track if the hitcount changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hitcount]);
    (0, react_1.useEffect)(() => {
        if (campaignData?.data?.title) {
            track("click", {
                id: statistics_1.statistics.campaignShown.id,
                name: statistics_1.statistics.campaignShown.name,
                trackedData: campaignData.data.title
            });
        }
        // We only want to track when campaignData changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [campaignData]);
    return (<div className="search-result-page">
      <SearchResultHeader_1.default hitcount={hitcount} q={q}/>
      <FacetLine_1.default q={q} filters={filters} filterHandler={filteringHandler}/>
      {campaignData && campaignData.data && (<Campaign_1.default campaignData={campaignData.data}/>)}
      <SearchResultList_1.default resultItems={resultItems}/>
      {PagerComponent}
      {(0, general_1.dataIsNotEmpty)(resultItems) && (<FacetBrowserModal_1.default q={q} filters={filters} filterHandler={filteringHandler}/>)}
    </div>);
};
exports.default = SearchResult;
