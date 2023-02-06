"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceConf = exports.getConf = void 0;
const react_device_detect_1 = require("react-device-detect");
const page_size_json_1 = __importDefault(require("./page-size.json"));
const page_size_loan_list_json_1 = __importDefault(require("./page-size-loan-list.json"));
const page_size_reservation_list_json_1 = __importDefault(require("./page-size-reservation-list.json"));
const cover_tints_json_1 = __importDefault(require("./cover-tints.json"));
const colors_json_1 = __importDefault(require("./colors.json"));
const status_thresholds_json_1 = __importDefault(require("./status-thresholds.json"));
const modal_ids_json_1 = __importDefault(require("./modal-ids.json"));
const getConf = (type, configuration, device) => {
    const subConf = configuration[type];
    if (device) {
        return subConf[device];
    }
    return subConf;
};
exports.getConf = getConf;
const getDeviceConf = (type, configuration) => {
    const device = react_device_detect_1.isMobile ? "mobile" : "desktop";
    return (0, exports.getConf)(type, configuration, device);
};
exports.getDeviceConf = getDeviceConf;
exports.default = {
    pageSize: page_size_json_1.default,
    coverTints: cover_tints_json_1.default,
    pageSizeLoanList: page_size_loan_list_json_1.default,
    pageSizeReservationList: page_size_reservation_list_json_1.default,
    colors: colors_json_1.default,
    modalIds: modal_ids_json_1.default,
    thresholds: status_thresholds_json_1.default
};
