"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeModal = exports.openModal = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const modalSlice = (0, toolkit_1.createSlice)({
    name: "modal",
    initialState: { modalIds: [] },
    reducers: {
        openModal(state, action) {
            // If there is a modalid in the payload, and if this modalid is not saved
            // then save the modalid
            if (action.payload.modalId &&
                !state.modalIds.includes(action.payload.modalId)) {
                state.modalIds.push(action.payload.modalId);
                const searchParams = new URLSearchParams(window.location.search);
                const alreadyOpenModals = searchParams.get("modal");
                if (alreadyOpenModals) {
                    searchParams.set("modal", `${alreadyOpenModals}${action.payload.modalId}`);
                }
            }
        },
        closeModal(state, action) {
            state.modalIds.splice(state.modalIds.indexOf(action.payload.modalId), 1);
            const searchParams = new URLSearchParams(window.location.search);
            const newSearchParams = searchParams
                .get("modal")
                ?.replace(action.payload.modalId, "");
            searchParams.set("modal", newSearchParams || "");
        }
    }
});
_a = modalSlice.actions, exports.openModal = _a.openModal, exports.closeModal = _a.closeModal;
exports.default = modalSlice.reducer;
