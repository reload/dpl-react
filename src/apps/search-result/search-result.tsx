import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/search-result.list";
import {
  SearchResponse,
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<SearchResponse["hitcount"] | number>(
    0
  );
  const { PagerComponent, page } = usePager(hitcount, pageSize);

  // If q changes (eg. in Storybook context)
  //  then make sure that we reset the entire result set.
  useEffect(() => {
    setResultItems([]);
  }, [q, pageSize]);

  useSearchWithPaginationQuery(
    {
      q: { all: q },
      offset: page * pageSize,
      limit: pageSize
    },
    {
      // If the component is used in Storybook context
      // the same query and other parameters might come twice within the global stale time.
      // If that happens the onssuccess handler will not be called and we cannot
      // see the functionality of it properly.
      // By setting it to zero here we basically disable the cache for search queries,
      // which is tolerable since the same query probably won't occur in production
      // within a reasonable global stale time.
      staleTime: 0,
      onSuccess: (result) => {
        const {
          search: { works: resultWorks, hitcount: resultCount }
        } = result as {
          search: {
            works: Work[];
            hitcount: SearchWithPaginationQuery["search"]["hitcount"];
          };
        };

        setResultItems([...resultItems, ...resultWorks]);

        if (!hitcount) {
          setHitCount(resultCount);
        }
      }
    }
  );

  const worksAreLoaded = Boolean(resultItems.length);

  return (
    <div className="search-result-page">
      {worksAreLoaded && (
        <>
          <SearchResultHeader hitcount={String(hitcount)} q={q} />
          <SearchResultList resultItems={resultItems} />
          {PagerComponent}
          <FacetBrowserModal q={q} />
        </>
      )}
    </div>
  );
};

export default SearchResult;
