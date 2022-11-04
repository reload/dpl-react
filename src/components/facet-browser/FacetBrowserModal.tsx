import React from "react";
import {
  formatFacetTerms,
  getPlaceHolderFacets,
  knownFacets
} from "../../apps/search-result/helpers";
import {
  FilterItemTerm,
  TermOnClickHandler
} from "../../apps/search-result/types";
import {
  FacetResult,
  useSearchFacetQuery
} from "../../core/dbc-gateway/generated/graphql";
import Modal from "../../core/utils/modal";
import { useText } from "../../core/utils/text";
import FacetBrowserModalBody from "./FacetBrowserModalBody";

export const FacetBrowserModalId = "facet-browser-modal";

interface FacetBrowserModalProps {
  q: string;
  filterHandler: TermOnClickHandler;
  filters: { [key: string]: { [key: string]: FilterItemTerm } };
}

const FacetBrowserModal: React.FunctionComponent<FacetBrowserModalProps> = ({
  q,
  filterHandler,
  filters
}) => {
  const t = useText();

  const { data, isLoading } = useSearchFacetQuery(
    {
      q: { all: q },
      facets: knownFacets,
      facetLimit: 10,
      filters: formatFacetTerms(filters)
    },
    {
      keepPreviousData: true,
      placeholderData: {
        search: {
          facets: getPlaceHolderFacets(knownFacets)
        }
      }
    }
  );

  return (
    <Modal
      classNames="modal-right modal--no-padding"
      modalId={FacetBrowserModalId}
      screenReaderModalDescriptionText={t(
        "facetBrowserModalScreenReaderModalDescriptionText"
      )}
      closeModalAriaLabelText={t("facetBrowserModalCloseModalAriaLabelText")}
    >
      {isLoading || !data ? null : (
        <FacetBrowserModalBody
          facets={data.search.facets as FacetResult[]}
          filterHandler={filterHandler}
          filters={filters}
        />
      )}
    </Modal>
  );
};

export default FacetBrowserModal;
