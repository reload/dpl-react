import React, { useEffect, useState } from "react";
import AdvancedSearchRow from "./AdvancedSearchRow";
import {
  AdvancedSearchFilterData,
  advancedSearchAccessibility,
  advancedSearchFiction,
  advancedSearchMaterialTypes,
  AdvancedSearchQuery,
  initialAdvancedSearchQuery
} from "./types";
import { useText } from "../../core/utils/text";
import PreviewSection from "./PreviewSection";
import Multiselect from "../../components/multiselect/Multiselect";
import {
  MultiselectExternalUpdateFunction,
  MultiselectOption
} from "../../components/multiselect/types";
import CqlSearchHeader from "./CqlSearchHeader";
import {
  shouldAdvancedSearchButtonBeDisabled,
  translateSearchObjectToCql
} from "./helpers";
import { Button } from "../../components/Buttons/Button";

export type AdvancedSearchHeaderProps = {
  dataCy?: string;
  searchQuery: string | null;
  setSearchQuery: (searchQuery: string | null) => void;
  searchObject: AdvancedSearchQuery | null;
  setSearchObject: (searchObject: AdvancedSearchQuery | null) => void;
};

const AdvancedSearchHeader: React.FC<AdvancedSearchHeaderProps> = ({
  dataCy = "advanced-search-header",
  searchQuery,
  setSearchQuery,
  searchObject,
  setSearchObject
}) => {
  const t = useText();
  const [isFormMode, setIsFormMode] = useState<boolean>(true);
  // Keep an internal copy of the search object in a separate state. We only
  // want to update the outer state and perform a search when the user clicks
  // the search button.
  const [internalSearchObject, setInternalSearchObject] =
    useState<AdvancedSearchQuery>(
      searchObject || structuredClone(initialAdvancedSearchQuery)
    );
  const [previewCql, setPreviewCql] = useState<string>(searchQuery || "");
  const [rawCql, setRawCql] = useState<string>("");

  // If a new search object is passed in, override the internal state to reflect
  // the updated values in the state.
  useEffect(() => {
    if (searchObject === null) return;
    setInternalSearchObject(searchObject);
  }, [searchObject]);

  useEffect(() => {
    const cql = translateSearchObjectToCql(internalSearchObject);
    setPreviewCql(cql);
  }, [internalSearchObject]);

  const updateFiltersData = (filtersUpdate: {
    key: keyof AdvancedSearchFilterData;
    value: MultiselectOption[];
  }) => {
    if (!internalSearchObject?.filters[filtersUpdate.key].length) {
      return;
    }
    const newSearchObject = { ...internalSearchObject };
    newSearchObject.filters = {
      ...newSearchObject.filters,
      [filtersUpdate.key]: filtersUpdate.value
    };
    setInternalSearchObject(newSearchObject);
  };

  const reset = () => {
    setSearchObject(structuredClone(initialAdvancedSearchQuery));
  };

  useEffect(() => {
    if (searchQuery && !searchObject) {
      setIsFormMode(false);
    }
  }, [searchObject, searchQuery]);

  const handleSearchButtonClick = () => {
    if (rawCql.trim() !== "" && !isFormMode) {
      setSearchQuery(rawCql);
      return;
    }
    setSearchObject(internalSearchObject);
  };

  const [isSearchButtonDisabled, setIsSearchButtonDisabled] =
    useState<boolean>(true);

  const translatedCql = previewCql || searchQuery || "";

  useEffect(() => {
    setIsSearchButtonDisabled(
      shouldAdvancedSearchButtonBeDisabled(
        isFormMode,
        internalSearchObject,
        rawCql
      )
    );
  }, [internalSearchObject, rawCql, isFormMode]);

  return (
    <>
      {isFormMode && (
        <>
          <h1 className="text-header-h2 advanced-search__title capitalize-first">
            {t("advancedSearchTitleText")}
          </h1>
          <div className="input-and-preview">
            <div className="input-and-preview__input">
              {internalSearchObject.rows.map((row, index) => {
                return (
                  <AdvancedSearchRow
                    key={row.id}
                    data={internalSearchObject}
                    rowIndex={index}
                    setSearchObject={setInternalSearchObject}
                    dataCy={`${dataCy}-row`}
                  />
                );
              })}
            </div>
            <PreviewSection
              translatedCql={translatedCql}
              reset={reset}
              setIsFormMode={setIsFormMode}
            />
          </div>

          <section className="advanced-search__filters">
            <div className="advanced-search__filter">
              <Multiselect
                caption={t("advancedSearchFilterMaterialTypeText")}
                options={advancedSearchMaterialTypes}
                defaultValue={internalSearchObject.filters.materialTypes}
                updateExternalState={{
                  key: "materialTypes",
                  externalUpdateFunction:
                    updateFiltersData as MultiselectExternalUpdateFunction
                }}
                dataCy="advanced-search-material-types"
              />
            </div>
            <div className="advanced-search__filter">
              <Multiselect
                caption={t("advancedSearchFilterLiteratureFormText")}
                options={advancedSearchFiction}
                defaultValue={internalSearchObject.filters.fiction}
                updateExternalState={{
                  key: "fiction",
                  externalUpdateFunction:
                    updateFiltersData as MultiselectExternalUpdateFunction
                }}
                dataCy="advanced-search-fiction"
              />
            </div>
            <div className="advanced-search__filter">
              <Multiselect
                caption={t("advancedSearchFilterAccessText")}
                options={advancedSearchAccessibility}
                defaultValue={internalSearchObject.filters.accessibility}
                updateExternalState={{
                  key: "accessibility",
                  externalUpdateFunction:
                    updateFiltersData as MultiselectExternalUpdateFunction
                }}
                dataCy="advanced-search-accessibility"
              />
            </div>
          </section>
          <PreviewSection
            translatedCql={translatedCql}
            reset={reset}
            isMobile
            setIsFormMode={setIsFormMode}
          />
        </>
      )}
      {!isFormMode && (
        <CqlSearchHeader initialCql={translatedCql} setCql={setRawCql} />
      )}

      <section className="advanced-search__footer">
        {!isFormMode && (
          <button
            type="button"
            className="link-tag advanced-search__back-button cursor-pointer"
            onClick={() => setIsFormMode(true)}
            onKeyUp={(e) => e.key === "Enter" ?? setIsFormMode(!true)}
          >
            {t("toAdvancedSearchButtonText")}
          </button>
        )}
        <Button
          dataCy="search-button"
          buttonType="none"
          disabled={isSearchButtonDisabled}
          size="xlarge"
          variant="filled"
          classNames="advanced-search__search-button"
          collapsible
          label={t("advancedSearchSearchButtonText")}
          onClick={handleSearchButtonClick}
        />
      </section>
    </>
  );
};

export default AdvancedSearchHeader;
