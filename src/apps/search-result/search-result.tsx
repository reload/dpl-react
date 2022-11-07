import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/search-result.list";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";
import { formatFacetTerms } from "./helpers";
import useFilterHandler from "./useFilterHandler";
import { FilterItemTerm, TermOnClickHandler } from "./types";
import { useConfig } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";
import {
  excludeBlacklistedBranches,
  cleanBranchesId
} from "../../components/reservation/helper";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config("blacklistedSearchBranchesConfig", {
    transformer: "stringToArray"
  });

  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  const cleanBranches = cleanBranchesId(whitelistBranches);

  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPager } = usePager(hitcount, pageSize);
  const { filters, filterHandler } = useFilterHandler();

  const filteringHandler: TermOnClickHandler = (filterInfo) => {
    filterHandler(filterInfo);
    resetPager();
  };

  const createFilters = (
    facets: {
      [key: string]: { [key: string]: FilterItemTerm };
    },
    branchIdList: string[]
  ) => {
    return {
      ...formatFacetTerms(facets),
      ...(cleanBranches ? { branchId: branchIdList } : {})
    };
  };

  const { data } = useSearchWithPaginationQuery({
    q: { all: q },
    offset: page * pageSize,
    limit: pageSize,
    filters: createFilters(filters, cleanBranches)
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      search: { works: resultWorks, hitcount: resultCount }
    } = data as {
      search: {
        works: Work[];
        hitcount: SearchWithPaginationQuery["search"]["hitcount"];
      };
    };

    // if page has change then append the new result to the existing result
    if (page > 0) {
      setResultItems((prev) => [...prev, ...resultWorks]);
      return;
    }

    setHitCount(resultCount);
    setResultItems(resultWorks);
  }, [data, page]);

  return (
    <div className="search-result-page">
      <SearchResultHeader
        hitcount={String(hitcount)}
        q={q}
        filters={filters}
        filterHandler={filteringHandler}
      />
      <SearchResultList resultItems={resultItems} />
      {PagerComponent}
      <FacetBrowserModal
        q={q}
        filters={filters}
        filterHandler={filteringHandler}
      />
    </div>
  );
};

export default SearchResult;
