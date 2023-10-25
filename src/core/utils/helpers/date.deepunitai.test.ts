import dayjs from "dayjs";
import getCurrentUnixTime, { dateHasPassed } from "./date";

// We describe our test suite
describe("dateHasPassed function", () => {
  // We want to test if the function correctly determines if the date has passed
  // This is crucial because our application relies on accurate date comparisons
  it("should return true if the date has passed", () => {
    // We create a date string for yesterday
    const yesterday = dayjs().subtract(1, "day").toISOString();

    // We expect the function to return true for yesterday's date
    expect(dateHasPassed(yesterday)).toBe(true);
  });
  // We also want to test if the function correctly determines if the date has not passed
  it("should return false if the date has not passed", () => {
    // We create a date string for tomorrow
    const tomorrow = dayjs().add(1, "day").toISOString();

    // We expect the function to return false for tomorrow's date
    expect(dateHasPassed(tomorrow)).toBe(false);
  });
  // We want to test if the function correctly determines if the date has passed
  // This is crucial because our application relies on accurate date comparisons
  // We also want to test if the function correctly determines if the date has not passed
});

// We write our test in a describe block
describe("getCurrentUnixTime", () => {
  // What we want to test is that getCurrentUnixTime returns the current unix time
  // We test this by comparing the result of the function to the current time returned by dayjs
  // Since the values are based on the current time, some delay is expected between the function call and the comparison
  // Therefore, we use a small threshold to account for this delay
  it("should return the current unix time", () => {
    const currentUnixTime = getCurrentUnixTime();
    const dayjsUnixTime = dayjs().unix();
    const diff = Math.abs(dayjsUnixTime - currentUnixTime);

    // We expect the difference to be very small (less than 1 second)
    // This accounts for any minor delays between the function call and the comparison
    expect(diff).toBeLessThan(1);
  });
  // What we want to test is that getCurrentUnixTime returns the current unix time
  // We test this by comparing the result of the function to the current time returned by dayjs
  // Since the values are based on the current time, some delay is expected between the function call and the comparison
  // Therefore, we use a small threshold to account for this delay
});
