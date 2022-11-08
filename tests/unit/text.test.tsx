import { renderHook, act } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import React, { ReactNode } from "react";
import { useText } from "../../src/core/utils/text";
import textReducer from "../../src/core/text.slice";

const store = configureStore({
  reducer: combineReducers({
    text: textReducer
  }),
  preloadedState: {
    text: {
      data: {
        simpleText: "This is a @simple test",
        placeholdersText: `{"type":"simple","text":["This is a text with a @placeholder embedded. Does it work? @result it does!"]}`,
        pluralText: `{"type":"plural","text":["You have 1 material on the waiting list","You have @count materials on the waiting list"]}`
      }
    }
  }
});

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}> {children} </Provider>
);

describe("useText", () => {
  test("That useText work (nneds another name)", () => {
    const { result } = renderHook(() => useText(), { wrapper: Wrapper });

    act(() => {
      const simpleOutput = result.current("simpleText", {
        placeholders: {
          "@simple": "simple"
        }
      });
      const placeholdersOutput = result.current("placeholdersText", {
        placeholders: {
          "@placeholder": "placeholder",
          "@result": "yes"
        }
      });
      const pluralTextOneOutput = result.current("pluralText", {
        count: 1
      });
      const pluralTextMultipleOutput = result.current("pluralText", {
        count: 10
      });

      console.log({
        simpleOutput,
        placeholdersOutput,
        pluralTextOneOutput,
        pluralTextMultipleOutput
      });

      expect(simpleOutput).toBe("This is a simple test");
      expect(placeholdersOutput).toBe(
        "This is a text with a @placeholder embedded. Does it work? yes it does!"
      );
      expect(pluralTextOneOutput).toBe(
        "You have 1 material on the waiting list"
      );
      expect(pluralTextMultipleOutput).toBe(
        "You have 10 materials on the waiting list"
      );
    });
  });
});

// const localStorageMock = (function () {
//   let mockStore: Record<string, string> = {};

//   return {
//     getItem(key: string) {
//       return mockStore[key] || null;
//     },
//     setItem(key: string, value: string) {
//       mockStore[key] = value.toString();
//     },
//     clear() {
//       mockStore = {};
//     }
//   };
// })();

// Object.defineProperty(window, "localStorage", {
//   value: localStorageMock
// });
