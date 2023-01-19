"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUrlEntries = exports.urlSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    data: {}
};
exports.urlSlice = (0, toolkit_1.createSlice)({
    name: "url",
    initialState,
    reducers: {
        addUrlEntries(state, action) {
            state.data = { ...state.data, ...action.payload.entries };
        }
    }
});
exports.addUrlEntries = exports.urlSlice.actions.addUrlEntries;
exports.default = exports.urlSlice.reducer;
