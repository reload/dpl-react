import { excludeBlacklistedBranches, cleanBranchesId } from "./branches";
import { AgencyBranch } from "../fbs/model";
import { useConfig } from "./config";

// Start of test suite
describe("excludeBlacklistedBranches", () => {
  // We want to test if the function correctly filters out blacklisted branches
  // Ensuring that blacklisted items aren't included is crucial for security and data integrity
  it("should return array without blacklisted branches", () => {
    // Sample data for testing
    const branches: AgencyBranch[] = [
      { branchId: "1", name: "Branch 1" },
      { branchId: "2", name: "Branch 2" },
      { branchId: "3", name: "Branch 3" }
    ];
    const blacklist: string[] = ["2", "3"];

    // Expected result after filtering
    const expected: AgencyBranch[] = [{ branchId: "1", name: "Branch 1" }];

    // Conduct test
    const result = excludeBlacklistedBranches(branches, blacklist);

    // Check if the result matches the expected output
    expect(result).toEqual(expected);
  });
  // We want to test if the function correctly filters out blacklisted branches
  // Ensuring that blacklisted items aren't included is crucial for security and data integrity
});

// Describing the test suite for the cleanBranchesId function.
describe("cleanBranchesId tests", () => {
  // Explaining what we want to test:
  // We want to test if the function successfully extracts the agency number from the branchId.
  // This is important because the system only uses agency number and not ISIL.
  // Hence, it's crucial that our function accurately filters the digits after the dash ("-").
  it("should extract agency number from branchId", () => {
    // Mocking the input data.
    const branches: AgencyBranch[] = [
      { branchId: "DK-775100" },
      { branchId: "US-123456" },
      { branchId: "CA-000111" }
    ];
    // Executing the function with the mock data.
    const result = cleanBranchesId(branches);
    // Asserting that the function returns the expected output.
    expect(result).toEqual(["775100", "123456", "000111"]);
  });
  // We also want to test if the function correctly removes empty strings.
  // If a branchId doesn't have a dash ("-") or digits after the dash,
  // it should be removed from the return array.
  it("should remove empty strings", () => {
    // Mocking the input data.
    const branches: AgencyBranch[] = [
      { branchId: "DK-775100" },
      { branchId: "US-" },
      { branchId: "CA-" }
    ];
    // Executing the function with the mock data.
    const result = cleanBranchesId(branches);
    // Asserting that the function returns the expected output.
    expect(result).toEqual(["775100"]);
  });
  // Explaining what we want to test:
  // We want to test if the function successfully extracts the agency number from the branchId.
  // This is important because the system only uses agency number and not ISIL.
  // Hence, it's crucial that our function accurately filters the digits after the dash ("-").
  // We also want to test if the function correctly removes empty strings.
  // If a branchId doesn't have a dash ("-") or digits after the dash,
  // it should be removed from the return array.
});
