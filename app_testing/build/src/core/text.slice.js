"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTextEntries = exports.textSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    data: {}
};
exports.textSlice = (0, toolkit_1.createSlice)({
    name: "text",
    initialState,
    reducers: {
        addTextEntries(state, action) {
            state.data = { ...state.data, ...action.payload.entries };
        }
    }
});
exports.addTextEntries = exports.textSlice.actions.addTextEntries;
exports.default = exports.textSlice.reducer;
