import dayjs from "dayjs";
import {
  getFeesInRelationToPaymentChangeDate,
  getFeeObjectByFaustId,
  isDateBeforePaymentChangeDate
} from "./helper";
import { FeeV2 } from "../../../core/fbs/model";

// Describe the test suite
describe("getFeesInRelationToPaymentChangeDate", () => {
  // We are testing the function getFeesInRelationToPaymentChangeDate
  // This function takes in an array of FeeV2 objects and a boolean flag
  // The function filters the fees based on their due date in relation to the payment method change date
  // If beforePaymentChangeDate is true, it returns fees due before the payment method change date, otherwise it returns fees due after the change date

  it("should return fees due before the payment method change date", () => {
    const fees: FeeV2[] = [
      { dueDate: dayjs("2020-10-26").toDate() }, // due before the change date
      { dueDate: dayjs("2020-10-28").toDate() } // due after the change date
    ];
    const result = getFeesInRelationToPaymentChangeDate(fees, true);
    expect(result).toEqual([{ dueDate: dayjs("2020-10-26").toDate() }]);
  });
  it("should return fees due after the payment method change date", () => {
    const fees: FeeV2[] = [
      { dueDate: dayjs("2020-10-26").toDate() }, // due before the change date
      { dueDate: dayjs("2020-10-28").toDate() } // due after the change date
    ];
    const result = getFeesInRelationToPaymentChangeDate(fees, false);
    expect(result).toEqual([{ dueDate: dayjs("2020-10-28").toDate() }]);
  });
  it("should return an empty array if no fees match the criteria", () => {
    const fees: FeeV2[] = [{ dueDate: dayjs("2020-10-27").toDate() }]; // due on the change date
    const result = getFeesInRelationToPaymentChangeDate(fees, true);
    expect(result).toEqual([]);
  });
  // We are testing the function getFeesInRelationToPaymentChangeDate
  // This function takes in an array of FeeV2 objects and a boolean flag
  // The function filters the fees based on their due date in relation to the payment method change date
  // If beforePaymentChangeDate is true, it returns fees due before the payment method change date, otherwise it returns fees due after the change date
});

// We will start the describe block which contains all our unit tests for getFeeObjectByFaustId function
describe("getFeeObjectByFaustId helper function", () => {
  // Our first test case will verify if the function correctly filters out the objects based on the faustId
  it("should return a list of fee objects that match the provided faustId", () => {
    // Mock FeeV2 array and faustId
    const mockFeeObj: FeeV2[] = [
      { materials: [{ recordId: "123" }] },
      { materials: [{ recordId: "456" }] },
      { materials: [{ recordId: "123" }] }
    ];
    const mockFaustId = "123";

    // Call the function with the mocked data
    const result = getFeeObjectByFaustId(mockFeeObj, mockFaustId);

    // Assert that the function returns the correct data
    expect(result).toEqual([
      { materials: [{ recordId: "123" }] },
      { materials: [{ recordId: "123" }] }
    ]);
  });
  // Our second test case will verify if the function returns an empty array when there are no matches
  it("should return an empty array when no fee objects match the provided faustId", () => {
    // Mock FeeV2 array and faustId
    const mockFeeObj: FeeV2[] = [
      { materials: [{ recordId: "789" }] },
      { materials: [{ recordId: "456" }] }
    ];
    const mockFaustId = "123";

    // Call the function with the mocked data
    const result = getFeeObjectByFaustId(mockFeeObj, mockFaustId);

    // Assert that the function returns an empty array
    expect(result).toEqual([]);
  });
  // Our first test case will verify if the function correctly filters out the objects based on the faustId
  // Our second test case will verify if the function returns an empty array when there are no matches
});

// We start by describing the test suite
describe("isDateBeforePaymentChangeDate", () => {
  // We want to test if the function correctly identifies dates before the payment change date
  it("should return true for dates before 2020-10-27", () => {
    const date = dayjs("2020-10-26").format("YYYY-MM-DD"); // A date before the payment change date
    const result = isDateBeforePaymentChangeDate(date);
    // We expect the function to return true for this date
    expect(result).toBe(true);
  });
  // We also want to test if the function correctly identifies dates after the payment change date
  it("should return false for dates after 2020-10-27", () => {
    const date = dayjs("2020-10-28").format("YYYY-MM-DD"); // A date after the payment change date
    const result = isDateBeforePaymentChangeDate(date);
    // We expect the function to return false for this date
    expect(result).toBe(false);
  });
  // Lastly, we want to test if the function correctly identifies the payment change date itself
  it("should return false for the date of 2020-10-27", () => {
    const date = dayjs("2020-10-27").format("YYYY-MM-DD"); // The payment change date
    const result = isDateBeforePaymentChangeDate(date);
    // We expect the function to return false for this date as well
    expect(result).toBe(false);
  });
  // We want to test if the function correctly identifies dates before the payment change date
  // We also want to test if the function correctly identifies dates after the payment change date
  // Lastly, we want to test if the function correctly identifies the payment change date itself
});
