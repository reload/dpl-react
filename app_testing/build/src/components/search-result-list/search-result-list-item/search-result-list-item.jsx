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
const react_redux_1 = require("react-redux");
const text_1 = require("../../../core/utils/text");
const arrow_1 = __importDefault(require("../../atoms/icons/arrow/arrow"));
const availability_labels_1 = require("../../availability-label/availability-labels");
const button_favourite_1 = __importDefault(require("../../button-favourite/button-favourite"));
const link_1 = require("../../atoms/link");
const general_1 = require("../../../core/utils/helpers/general");
const search_result_list_item_cover_1 = __importDefault(require("./search-result-list-item-cover"));
const HorizontalTermLine_1 = __importDefault(require("../../horizontal-term-line/HorizontalTermLine"));
const url_1 = require("../../../core/utils/url");
const url_2 = require("../../../core/utils/helpers/url");
const guardedRequests_slice_1 = require("../../../core/guardedRequests.slice");
const useStatistics_1 = require("../../../core/statistics/useStatistics");
const statistics_1 = require("../../../core/statistics/statistics");
const lazy_load_1 = require("../../../core/utils/helpers/lazy-load");
const SearchResultListItem = ({ item: { titles: { full: fullTitle }, series, creators, manifestations: { all: manifestations }, workId, workYear }, coverTint, resultNumber }) => {
    const t = (0, text_1.useText)();
    const { materialUrl, searchUrl } = (0, url_1.useUrls)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const author = (0, general_1.creatorsToString)((0, general_1.flattenCreators)((0, general_1.filterCreators)(creators, ["Person"])), t);
    const manifestationPid = (0, general_1.getManifestationPid)(manifestations);
    const firstInSeries = series?.[0];
    const { title: seriesTitle, numberInSeries } = firstInSeries || {};
    const materialFullUrl = (0, url_2.constructMaterialUrl)(materialUrl, workId);
    const { track } = (0, useStatistics_1.useStatistics)();
    // We use hasBeenVisible to determine if the search result
    // is, or has been, visible in the viewport.
    const { itemRef, hasBeenVisible: showItem } = (0, lazy_load_1.useItemHasBeenVisible)();
    const handleClick = (0, react_1.useCallback)(() => {
        track("click", {
            id: statistics_1.statistics.searchResultNumberClick.id,
            name: statistics_1.statistics.searchResultNumberClick.name,
            trackedData: resultNumber.toString()
        }).then(() => {
            (0, url_2.redirectTo)(materialFullUrl);
        });
        // We only want to call this on materialFullUrl change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [materialFullUrl]);
    const addToListRequest = (id) => {
        dispatch((0, guardedRequests_slice_1.guardedRequest)({
            type: "addFavorite",
            args: { id },
            app: "search-result"
        }));
    };
    return (
    // We know that is not following a11y recommendations to have an onclick
    // handler on a non-interactive element.
    //
    // The reason why this is implemented:
    // We have interactive elements within each search result
    // namely the the favorite button, which must react to clicks while we also want the
    // entire search result to be clickable.
    // You cannot have nested links so onClick handlers and stopping event propagation
    // is necessary.
    //
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <article ref={itemRef} className="search-result-item arrow arrow__hover--right-small" onClick={handleClick} onKeyUp={(e) => e.key === "Enter" && handleClick}>
      <div className="search-result-item__cover">
        {showItem && (<search_result_list_item_cover_1.default id={manifestationPid} description={String(fullTitle)} url={materialFullUrl} tint={coverTint}/>)}
      </div>
      <div className="search-result-item__text">
        <div className="search-result-item__meta">
          {showItem && (<button_favourite_1.default id={workId} addToListRequest={addToListRequest}/>)}
          {numberInSeries && seriesTitle && (<HorizontalTermLine_1.default title={`${t("numberDescriptionText")} ${numberInSeries.number?.[0]}`} subTitle={t("inSeriesText")} linkList={[
                {
                    url: (0, url_2.constructSearchUrl)(searchUrl, seriesTitle),
                    term: seriesTitle
                }
            ]}/>)}
        </div>

        <h2 className="search-result-item__title text-header-h4" data-cy="search-result-item-title">
          <link_1.Link href={materialFullUrl}>{fullTitle}</link_1.Link>
        </h2>

        {author && (<p className="text-small-caption" data-cy="search-result-item-author">
            {`${t("byAuthorText")} ${author}`}
            {workYear && ` (${workYear.year})`}
          </p>)}
      </div>
      <div className="search-result-item__availability" data-cy="search-result-item-availability">
        {showItem && (<availability_labels_1.AvailabiltityLabels cursorPointer workId={workId} manifestations={manifestations}/>)}
      </div>
      <arrow_1.default />
    </article>);
};
exports.default = SearchResultListItem;
