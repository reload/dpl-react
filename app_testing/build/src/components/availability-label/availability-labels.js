"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabiltityLabels = void 0;
const react_1 = __importDefault(require("react"));
const general_1 = require("../../core/utils/helpers/general");
const url_1 = require("../../core/utils/helpers/url");
const url_2 = require("../../core/utils/url");
const availability_label_1 = require("./availability-label");
const AvailabiltityLabels = ({ manifestations, workId, selectedManifestation: manifestation, selectManifestationHandler, cursorPointer = false }) => {
    const { materialUrl } = (0, url_2.useUrls)();
    return (react_1.default.createElement(react_1.default.Fragment, null, manifestations.map((item) => {
        const { pid, materialTypes, identifiers } = item;
        const materialType = materialTypes[0].specific;
        const faustId = (0, general_1.convertPostIdToFaustId)(pid);
        const url = (0, url_1.constructMaterialUrl)(materialUrl, workId, materialType);
        const accessTypesCodes = item.accessTypes.map((t) => t.code);
        return (react_1.default.createElement(availability_label_1.AvailabilityLabel, { key: pid, url: url, cursorPointer: cursorPointer, faustIds: [faustId], manifestText: materialType, accessTypes: accessTypesCodes, selected: manifestation &&
                materialType === (0, general_1.getManifestationType)(manifestation), handleSelectManifestation: selectManifestationHandler
                ? () => {
                    selectManifestationHandler(item);
                    (0, url_1.setQueryParametersInUrl)({
                        type: materialType
                    });
                }
                : undefined, isbn: identifiers?.[0]?.value }));
    })));
};
exports.AvailabiltityLabels = AvailabiltityLabels;
exports.default = {};
