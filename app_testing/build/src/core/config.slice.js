"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addConfigEntries = exports.configSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    data: {}
};
exports.configSlice = (0, toolkit_1.createSlice)({
    name: "config",
    initialState,
    reducers: {
        addConfigEntries(state, action) {
            state.data = { ...state.data, ...action.payload.entries };
        }
    }
});
exports.addConfigEntries = exports.configSlice.actions.addConfigEntries;
exports.default = exports.configSlice.reducer;
