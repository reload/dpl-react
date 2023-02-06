"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIntelligentFacetsQuery = exports.IntelligentFacetsDocument = exports.useSearchFacetQuery = exports.SearchFacetDocument = exports.useSuggestionsFromQueryStringQuery = exports.SuggestionsFromQueryStringDocument = exports.useSearchWithPaginationQuery = exports.SearchWithPaginationDocument = exports.useGetInfomediaQuery = exports.GetInfomediaDocument = exports.useGetMaterialQuery = exports.GetMaterialDocument = exports.useGetManifestationViaMaterialByFaustQuery = exports.GetManifestationViaMaterialByFaustDocument = exports.WorkMediumFragmentDoc = exports.WorkSmallFragmentDoc = exports.ManifestationsSimpleFragmentDoc = exports.ManifestationsSimpleFieldsFragmentDoc = exports.SeriesSimpleFragmentDoc = exports.WorkType = exports.SuggestionType = exports.SubjectType = exports.SchoolUseCode = exports.ReviewElementType = exports.PeriodicaArticleOrderStatus = exports.NoteType = exports.ManifestationPartType = exports.LibrariansReviewSectionCode = exports.LanguageCode = exports.InfomediaError = exports.IdentifierType = exports.HoldingsStatus = exports.FictionNonfictionCode = exports.FacetField = exports.EntryType = exports.CopyRequestStatus = exports.ChildOrAdultCode = exports.AccessUrlType = exports.AccessTypeCode = void 0;
const react_query_1 = require("react-query");
const graphql_fetcher_1 = require("../graphql-fetcher");
var AccessTypeCode;
(function (AccessTypeCode) {
    /** @deprecated No longer supported */
    AccessTypeCode["NotSpecified"] = "NOT_SPECIFIED";
    AccessTypeCode["Online"] = "ONLINE";
    AccessTypeCode["Physical"] = "PHYSICAL";
    AccessTypeCode["Unknown"] = "UNKNOWN";
})(AccessTypeCode = exports.AccessTypeCode || (exports.AccessTypeCode = {}));
var AccessUrlType;
(function (AccessUrlType) {
    AccessUrlType["Image"] = "IMAGE";
    AccessUrlType["Other"] = "OTHER";
    AccessUrlType["Resource"] = "RESOURCE";
    AccessUrlType["Sample"] = "SAMPLE";
    AccessUrlType["TableOfContents"] = "TABLE_OF_CONTENTS";
    AccessUrlType["Thumbnail"] = "THUMBNAIL";
})(AccessUrlType = exports.AccessUrlType || (exports.AccessUrlType = {}));
var ChildOrAdultCode;
(function (ChildOrAdultCode) {
    ChildOrAdultCode["ForAdults"] = "FOR_ADULTS";
    ChildOrAdultCode["ForChildren"] = "FOR_CHILDREN";
})(ChildOrAdultCode = exports.ChildOrAdultCode || (exports.ChildOrAdultCode = {}));
var CopyRequestStatus;
(function (CopyRequestStatus) {
    CopyRequestStatus["ErrorAgencyNotSubscribed"] = "ERROR_AGENCY_NOT_SUBSCRIBED";
    CopyRequestStatus["ErrorInvalidPickupBranch"] = "ERROR_INVALID_PICKUP_BRANCH";
    CopyRequestStatus["ErrorPidNotReservable"] = "ERROR_PID_NOT_RESERVABLE";
    CopyRequestStatus["ErrorUnauthenticatedUser"] = "ERROR_UNAUTHENTICATED_USER";
    CopyRequestStatus["Ok"] = "OK";
})(CopyRequestStatus = exports.CopyRequestStatus || (exports.CopyRequestStatus = {}));
var EntryType;
(function (EntryType) {
    EntryType["AdditionalEntry"] = "ADDITIONAL_ENTRY";
    EntryType["MainEntry"] = "MAIN_ENTRY";
    EntryType["NationalBibliographyAdditionalEntry"] = "NATIONAL_BIBLIOGRAPHY_ADDITIONAL_ENTRY";
    EntryType["NationalBibliographyEntry"] = "NATIONAL_BIBLIOGRAPHY_ENTRY";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
/** The supported facet fields */
var FacetField;
(function (FacetField) {
    FacetField["AccessTypes"] = "accessTypes";
    FacetField["CanAlwaysBeLoaned"] = "canAlwaysBeLoaned";
    FacetField["ChildrenOrAdults"] = "childrenOrAdults";
    FacetField["Creators"] = "creators";
    FacetField["FictionNonfiction"] = "fictionNonfiction";
    FacetField["FictionalCharacter"] = "fictionalCharacter";
    FacetField["GenreAndForm"] = "genreAndForm";
    FacetField["MainLanguages"] = "mainLanguages";
    FacetField["MaterialTypes"] = "materialTypes";
    FacetField["Subjects"] = "subjects";
    FacetField["WorkTypes"] = "workTypes";
})(FacetField = exports.FacetField || (exports.FacetField = {}));
var FictionNonfictionCode;
(function (FictionNonfictionCode) {
    FictionNonfictionCode["Fiction"] = "FICTION";
    FictionNonfictionCode["Nonfiction"] = "NONFICTION";
    FictionNonfictionCode["NotSpecified"] = "NOT_SPECIFIED";
})(FictionNonfictionCode = exports.FictionNonfictionCode || (exports.FictionNonfictionCode = {}));
var HoldingsStatus;
(function (HoldingsStatus) {
    /** Holding is on loan */
    HoldingsStatus["OnLoan"] = "OnLoan";
    /** Holding is physically available at the branch */
    HoldingsStatus["OnShelf"] = "OnShelf";
})(HoldingsStatus = exports.HoldingsStatus || (exports.HoldingsStatus = {}));
var IdentifierType;
(function (IdentifierType) {
    IdentifierType["Barcode"] = "BARCODE";
    IdentifierType["Doi"] = "DOI";
    IdentifierType["Isbn"] = "ISBN";
    IdentifierType["Ismn"] = "ISMN";
    IdentifierType["Issn"] = "ISSN";
    IdentifierType["Movie"] = "MOVIE";
    IdentifierType["Music"] = "MUSIC";
    IdentifierType["NotSpecified"] = "NOT_SPECIFIED";
    IdentifierType["OrderNumber"] = "ORDER_NUMBER";
    IdentifierType["Publizon"] = "PUBLIZON";
    IdentifierType["Upc"] = "UPC";
    IdentifierType["Uri"] = "URI";
})(IdentifierType = exports.IdentifierType || (exports.IdentifierType = {}));
var InfomediaError;
(function (InfomediaError) {
    InfomediaError["BorrowercheckNotAllowed"] = "BORROWERCHECK_NOT_ALLOWED";
    InfomediaError["BorrowerNotFound"] = "BORROWER_NOT_FOUND";
    InfomediaError["BorrowerNotInMunicipality"] = "BORROWER_NOT_IN_MUNICIPALITY";
    InfomediaError["BorrowerNotLoggedIn"] = "BORROWER_NOT_LOGGED_IN";
    InfomediaError["ErrorInRequest"] = "ERROR_IN_REQUEST";
    InfomediaError["InternalServerError"] = "INTERNAL_SERVER_ERROR";
    InfomediaError["LibraryNotFound"] = "LIBRARY_NOT_FOUND";
    InfomediaError["NoMunicipality"] = "NO_MUNICIPALITY";
    InfomediaError["ServiceNotLicensed"] = "SERVICE_NOT_LICENSED";
    InfomediaError["ServiceUnavailable"] = "SERVICE_UNAVAILABLE";
})(InfomediaError = exports.InfomediaError || (exports.InfomediaError = {}));
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["Da"] = "da";
    LanguageCode["En"] = "en";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));
var LibrariansReviewSectionCode;
(function (LibrariansReviewSectionCode) {
    LibrariansReviewSectionCode["About"] = "ABOUT";
    LibrariansReviewSectionCode["All"] = "ALL";
    LibrariansReviewSectionCode["Compare"] = "COMPARE";
    LibrariansReviewSectionCode["Conclusion"] = "CONCLUSION";
    LibrariansReviewSectionCode["Description"] = "DESCRIPTION";
    LibrariansReviewSectionCode["Evaluation"] = "EVALUATION";
    LibrariansReviewSectionCode["Library"] = "LIBRARY";
    LibrariansReviewSectionCode["Olddescription"] = "OLDDESCRIPTION";
    LibrariansReviewSectionCode["Other"] = "OTHER";
    LibrariansReviewSectionCode["Use"] = "USE";
})(LibrariansReviewSectionCode = exports.LibrariansReviewSectionCode || (exports.LibrariansReviewSectionCode = {}));
var ManifestationPartType;
(function (ManifestationPartType) {
    ManifestationPartType["MusicTracks"] = "MUSIC_TRACKS";
    ManifestationPartType["NotSpecified"] = "NOT_SPECIFIED";
    ManifestationPartType["PartsOfBook"] = "PARTS_OF_BOOK";
    ManifestationPartType["SheetMusicContent"] = "SHEET_MUSIC_CONTENT";
})(ManifestationPartType = exports.ManifestationPartType || (exports.ManifestationPartType = {}));
var NoteType;
(function (NoteType) {
    NoteType["ConnectionToOtherWorks"] = "CONNECTION_TO_OTHER_WORKS";
    NoteType["DescriptionOfMaterial"] = "DESCRIPTION_OF_MATERIAL";
    NoteType["Dissertation"] = "DISSERTATION";
    NoteType["MusicalEnsembleOrCast"] = "MUSICAL_ENSEMBLE_OR_CAST";
    NoteType["NotSpecified"] = "NOT_SPECIFIED";
    NoteType["OccasionForPublication"] = "OCCASION_FOR_PUBLICATION";
    NoteType["OriginalTitle"] = "ORIGINAL_TITLE";
    NoteType["OriginalVersion"] = "ORIGINAL_VERSION";
    NoteType["References"] = "REFERENCES";
    NoteType["RestrictionsOnUse"] = "RESTRICTIONS_ON_USE";
})(NoteType = exports.NoteType || (exports.NoteType = {}));
var PeriodicaArticleOrderStatus;
(function (PeriodicaArticleOrderStatus) {
    PeriodicaArticleOrderStatus["ErrorAgencyNotSubscribed"] = "ERROR_AGENCY_NOT_SUBSCRIBED";
    PeriodicaArticleOrderStatus["ErrorInvalidPickupBranch"] = "ERROR_INVALID_PICKUP_BRANCH";
    PeriodicaArticleOrderStatus["ErrorPidNotReservable"] = "ERROR_PID_NOT_RESERVABLE";
    PeriodicaArticleOrderStatus["ErrorUnauthorizedUser"] = "ERROR_UNAUTHORIZED_USER";
    PeriodicaArticleOrderStatus["Ok"] = "OK";
})(PeriodicaArticleOrderStatus = exports.PeriodicaArticleOrderStatus || (exports.PeriodicaArticleOrderStatus = {}));
var ReviewElementType;
(function (ReviewElementType) {
    ReviewElementType["Abstract"] = "ABSTRACT";
    ReviewElementType["AcquisitionRecommendations"] = "ACQUISITION_RECOMMENDATIONS";
    ReviewElementType["Audience"] = "AUDIENCE";
    ReviewElementType["Conclusion"] = "CONCLUSION";
    ReviewElementType["Description"] = "DESCRIPTION";
    ReviewElementType["Evaluation"] = "EVALUATION";
    ReviewElementType["SimilarMaterials"] = "SIMILAR_MATERIALS";
})(ReviewElementType = exports.ReviewElementType || (exports.ReviewElementType = {}));
var SchoolUseCode;
(function (SchoolUseCode) {
    SchoolUseCode["ForSchoolUse"] = "FOR_SCHOOL_USE";
    SchoolUseCode["ForTeacher"] = "FOR_TEACHER";
})(SchoolUseCode = exports.SchoolUseCode || (exports.SchoolUseCode = {}));
var SubjectType;
(function (SubjectType) {
    SubjectType["FictionalCharacter"] = "FICTIONAL_CHARACTER";
    SubjectType["FilmNationality"] = "FILM_NATIONALITY";
    SubjectType["Laesekompasset"] = "LAESEKOMPASSET";
    SubjectType["LibraryOfCongressSubjectHeading"] = "LIBRARY_OF_CONGRESS_SUBJECT_HEADING";
    SubjectType["Location"] = "LOCATION";
    SubjectType["MedicalSubjectHeading"] = "MEDICAL_SUBJECT_HEADING";
    SubjectType["MusicalInstrumentation"] = "MUSICAL_INSTRUMENTATION";
    SubjectType["MusicCountryOfOrigin"] = "MUSIC_COUNTRY_OF_ORIGIN";
    SubjectType["MusicTimePeriod"] = "MUSIC_TIME_PERIOD";
    SubjectType["NationalAgriculturalLibrary"] = "NATIONAL_AGRICULTURAL_LIBRARY";
    SubjectType["TimePeriod"] = "TIME_PERIOD";
    SubjectType["Title"] = "TITLE";
    SubjectType["Topic"] = "TOPIC";
})(SubjectType = exports.SubjectType || (exports.SubjectType = {}));
var SuggestionType;
(function (SuggestionType) {
    SuggestionType["Composit"] = "COMPOSIT";
    SuggestionType["Creator"] = "CREATOR";
    SuggestionType["Subject"] = "SUBJECT";
    SuggestionType["Title"] = "TITLE";
})(SuggestionType = exports.SuggestionType || (exports.SuggestionType = {}));
var WorkType;
(function (WorkType) {
    WorkType["Analysis"] = "ANALYSIS";
    WorkType["Article"] = "ARTICLE";
    WorkType["Bookdescription"] = "BOOKDESCRIPTION";
    WorkType["Game"] = "GAME";
    WorkType["Literature"] = "LITERATURE";
    WorkType["Map"] = "MAP";
    WorkType["Movie"] = "MOVIE";
    WorkType["Music"] = "MUSIC";
    WorkType["Other"] = "OTHER";
    WorkType["Periodica"] = "PERIODICA";
    WorkType["Portrait"] = "PORTRAIT";
    WorkType["Review"] = "REVIEW";
    WorkType["Sheetmusic"] = "SHEETMUSIC";
    WorkType["Track"] = "TRACK";
})(WorkType = exports.WorkType || (exports.WorkType = {}));
exports.SeriesSimpleFragmentDoc = `
    fragment SeriesSimple on Series {
  title
  isPopular
  numberInSeries {
    display
    number
  }
  readThisFirst
  readThisWhenever
}
    `;
exports.ManifestationsSimpleFieldsFragmentDoc = `
    fragment ManifestationsSimpleFields on Manifestation {
  pid
  genreAndForm
  source
  titles {
    main
    original
  }
  fictionNonfiction {
    display
    code
  }
  materialTypes {
    specific
  }
  creators {
    display
    __typename
  }
  hostPublication {
    title
    creator
    publisher
    year {
      year
    }
  }
  languages {
    main {
      display
    }
  }
  identifiers {
    value
  }
  contributors {
    display
  }
  edition {
    summary
    publicationYear {
      display
    }
  }
  audience {
    generalAudience
  }
  physicalDescriptions {
    numberOfPages
  }
  materialTypes {
    specific
  }
  accessTypes {
    code
  }
  access {
    __typename
    ... on AccessUrl {
      origin
      url
      loginRequired
    }
    ... on InfomediaService {
      id
    }
    ... on InterLibraryLoan {
      loanIsPossible
    }
    ... on Ereol {
      origin
      url
      canAlwaysBeLoaned
    }
    ... on DigitalArticleService {
      issn
    }
  }
  shelfmark {
    postfix
    shelfmark
  }
}
    `;
exports.ManifestationsSimpleFragmentDoc = `
    fragment ManifestationsSimple on Manifestations {
  all {
    ...ManifestationsSimpleFields
  }
  latest {
    ...ManifestationsSimpleFields
  }
}
    ${exports.ManifestationsSimpleFieldsFragmentDoc}`;
exports.WorkSmallFragmentDoc = `
    fragment WorkSmall on Work {
  workId
  titles {
    full
    original
  }
  abstract
  creators {
    display
    __typename
  }
  series {
    ...SeriesSimple
  }
  seriesMembers {
    workId
    titles {
      main
      full
      original
    }
  }
  workYear {
    year
  }
  genreAndForm
  manifestations {
    ...ManifestationsSimple
  }
}
    ${exports.SeriesSimpleFragmentDoc}
${exports.ManifestationsSimpleFragmentDoc}`;
exports.WorkMediumFragmentDoc = `
    fragment WorkMedium on Work {
  ...WorkSmall
  materialTypes {
    specific
  }
  mainLanguages {
    display
    isoCode
  }
  subjects {
    all {
      display
    }
  }
  reviews {
    __typename
    ... on LibrariansReview {
      author
      date
      sections {
        code
        heading
        text
      }
    }
    ... on ExternalReview {
      author
      date
      rating
      urls {
        origin
        url
      }
    }
    ... on InfomediaReview {
      author
      date
      origin
      rating
      id
    }
  }
  fictionNonfiction {
    display
    code
  }
  dk5MainEntry {
    display
  }
}
    ${exports.WorkSmallFragmentDoc}`;
exports.GetManifestationViaMaterialByFaustDocument = `
    query getManifestationViaMaterialByFaust($faust: String!) {
  manifestation(faust: $faust) {
    pid
    titles {
      main
    }
    abstract
    materialTypes {
      specific
    }
    creators {
      display
    }
    edition {
      publicationYear {
        display
      }
    }
    series {
      title
      numberInSeries {
        number
      }
    }
  }
}
    `;
const useGetManifestationViaMaterialByFaustQuery = (variables, options) => (0, react_query_1.useQuery)(["getManifestationViaMaterialByFaust", variables], (0, graphql_fetcher_1.fetcher)(exports.GetManifestationViaMaterialByFaustDocument, variables), options);
exports.useGetManifestationViaMaterialByFaustQuery = useGetManifestationViaMaterialByFaustQuery;
exports.GetMaterialDocument = `
    query getMaterial($wid: String!) {
  work(id: $wid) {
    ...WorkMedium
  }
}
    ${exports.WorkMediumFragmentDoc}`;
const useGetMaterialQuery = (variables, options) => (0, react_query_1.useQuery)(["getMaterial", variables], (0, graphql_fetcher_1.fetcher)(exports.GetMaterialDocument, variables), options);
exports.useGetMaterialQuery = useGetMaterialQuery;
exports.GetInfomediaDocument = `
    query getInfomedia($id: String!) {
  infomedia(id: $id) {
    error
    article {
      headLine
      text
    }
  }
}
    `;
const useGetInfomediaQuery = (variables, options) => (0, react_query_1.useQuery)(["getInfomedia", variables], (0, graphql_fetcher_1.fetcher)(exports.GetInfomediaDocument, variables), options);
exports.useGetInfomediaQuery = useGetInfomediaQuery;
exports.SearchWithPaginationDocument = `
    query searchWithPagination($q: SearchQuery!, $offset: Int!, $limit: PaginationLimit!, $filters: SearchFilters) {
  search(q: $q, filters: $filters) {
    hitcount
    works(offset: $offset, limit: $limit) {
      ...WorkSmall
    }
  }
}
    ${exports.WorkSmallFragmentDoc}`;
const useSearchWithPaginationQuery = (variables, options) => (0, react_query_1.useQuery)(["searchWithPagination", variables], (0, graphql_fetcher_1.fetcher)(exports.SearchWithPaginationDocument, variables), options);
exports.useSearchWithPaginationQuery = useSearchWithPaginationQuery;
exports.SuggestionsFromQueryStringDocument = `
    query suggestionsFromQueryString($q: String!) {
  suggest(q: $q) {
    result {
      type
      term
      work {
        workId
        titles {
          main
        }
        creators {
          display
        }
        manifestations {
          first {
            pid
          }
        }
      }
    }
  }
}
    `;
const useSuggestionsFromQueryStringQuery = (variables, options) => (0, react_query_1.useQuery)(["suggestionsFromQueryString", variables], (0, graphql_fetcher_1.fetcher)(exports.SuggestionsFromQueryStringDocument, variables), options);
exports.useSuggestionsFromQueryStringQuery = useSuggestionsFromQueryStringQuery;
exports.SearchFacetDocument = `
    query searchFacet($q: SearchQuery!, $facets: [FacetField!]!, $facetLimit: Int!, $filters: SearchFilters) {
  search(q: $q, filters: $filters) {
    facets(facets: $facets) {
      name
      values(limit: $facetLimit) {
        key
        term
        score
      }
    }
  }
}
    `;
const useSearchFacetQuery = (variables, options) => (0, react_query_1.useQuery)(["searchFacet", variables], (0, graphql_fetcher_1.fetcher)(exports.SearchFacetDocument, variables), options);
exports.useSearchFacetQuery = useSearchFacetQuery;
exports.IntelligentFacetsDocument = `
    query intelligentFacets($q: SearchQuery!, $facetsLimit: Int!, $valuesLimit: Int!, $filters: SearchFilters!) {
  search(q: $q, filters: $filters) {
    intelligentFacets(limit: $facetsLimit) {
      name
      values(limit: $valuesLimit) {
        key
        term
        score
      }
    }
  }
}
    `;
const useIntelligentFacetsQuery = (variables, options) => (0, react_query_1.useQuery)(["intelligentFacets", variables], (0, graphql_fetcher_1.fetcher)(exports.IntelligentFacetsDocument, variables), options);
exports.useIntelligentFacetsQuery = useIntelligentFacetsQuery;
