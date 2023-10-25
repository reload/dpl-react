import {
  SuggestionType,
  SuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import { findNonWorkSuggestion } from "./helpers";

// We are using jest's describe and it functions to structure our tests.
// The describe function is used for grouping related tests and 'it' function is used for writing individual test cases.
describe("findNonWorkSuggestion", () => {
  // We want to test if the function correctly finds the first suggestion that is not of type 'Title' or 'Composit'.
  // This is important because we want to make sure that our function can correctly filter out suggestions based on their type.

  it("should return the first non-Title and non-Composit suggestion", () => {
    // Define a mock data
    const mockData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [
      { type: SuggestionType.Title },
      { type: SuggestionType.Composit },
      { type: SuggestionType.Other }
    ];

    // Call our function with the mock data
    const result = findNonWorkSuggestion(mockData);

    // We expect the result to be the first non-Title and non-Composit suggestion
    expect(result).toEqual({ type: SuggestionType.Other });
  });
  // We also want to test the case where all suggestions are of type 'Title' or 'Composit'.
  // In this case, our function should return undefined.

  it("should return undefined when all suggestions are of type 'Title' or 'Composit'", () => {
    const mockData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [
      { type: SuggestionType.Title },
      { type: SuggestionType.Composit }
    ];

    const result = findNonWorkSuggestion(mockData);

    expect(result).toBeUndefined();
  });
  // We want to test if the function correctly finds the first suggestion that is not of type 'Title' or 'Composit'.
  // This is important because we want to make sure that our function can correctly filter out suggestions based on their type.
  // We also want to test the case where all suggestions are of type 'Title' or 'Composit'.
  // In this case, our function should return undefined.
});
