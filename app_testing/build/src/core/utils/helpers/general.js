"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataIsNotEmpty = exports.getManifestationType = exports.filterLoansSoonOverdue = exports.filterLoansOverdue = exports.getReadyForPickup = exports.materialIsOverdue = exports.pageSizeGlobal = exports.getPageSizeFromDataAttributes = exports.getListItems = exports.materialIsFiction = exports.stringifyValue = exports.getManifestationsPids = exports.groupObjectArrayByProperty = exports.getAmountOfRenewableLoans = exports.getRenewableMaterials = exports.getPageSizeFromConfiguration = exports.isAModalDisplayed = exports.getDueDatesForModal = exports.getDueDatesLoan = exports.sortByLoanDate = exports.getParams = exports.convertPostIdToFaustId = exports.usePrevious = exports.daysBetweenDates = exports.daysBetweenTodayAndDate = exports.getThresholds = exports.getModalIds = exports.getColors = exports.getCoverTint = exports.getManifestationPid = exports.getFirstPublishedYear = exports.getFirstPublishedManifestation = exports.getCreatorTextFromManifestations = exports.creatorsToString = exports.flattenCreators = exports.filterCreators = exports.orderManifestationsByYear = exports.getManifestationPublicationYear = void 0;
const react_1 = require("react");
const dayjs_1 = __importDefault(require("dayjs"));
const configuration_1 = __importStar(require("../../configuration"));
const url_1 = require("./url");
const getManifestationPublicationYear = (manifestation) => {
    return manifestation.edition?.publicationYear?.display || null;
};
exports.getManifestationPublicationYear = getManifestationPublicationYear;
const orderManifestationsByYear = (manifestations, order = "desc") => {
    return manifestations.sort((a, b) => {
        const currentDate = Number((0, exports.getManifestationPublicationYear)(a));
        const prevDate = Number((0, exports.getManifestationPublicationYear)(b));
        if (order === "desc") {
            return prevDate - currentDate;
        }
        return currentDate - prevDate;
    });
};
exports.orderManifestationsByYear = orderManifestationsByYear;
const filterCreators = (creators, filterBy) => creators.filter((creator) => {
    // eslint-disable-next-line no-underscore-dangle
    return creator.__typename && filterBy.includes(creator.__typename);
});
exports.filterCreators = filterCreators;
const flattenCreators = (creators) => creators.map((creator) => {
    return creator.display;
});
exports.flattenCreators = flattenCreators;
const getCreatorsFromManifestations = (manifestations) => {
    const creators = manifestations.reduce((acc, curr) => {
        return [...acc, ...(0, exports.flattenCreators)(curr.creators)];
    }, []);
    return Array.from(new Set(creators));
};
const creatorsToString = (creators, t) => {
    if (creators.length > 1) {
        const firstTwo = creators.slice(0, 2);
        return `${firstTwo.join(", ")} ${t("etAlText")}`;
    }
    return creators[0];
};
exports.creatorsToString = creatorsToString;
const getCreatorTextFromManifestations = (manifestations, t) => {
    const creators = getCreatorsFromManifestations(manifestations);
    return (0, exports.creatorsToString)(creators, t);
};
exports.getCreatorTextFromManifestations = getCreatorTextFromManifestations;
// We deliberately left this function here although we don't use it anywhere in the
// project. It can be used if ever needed to retrieve a chronologically oldest edition,
// provided a manifestation object.
const getFirstPublishedManifestation = (manifestations) => {
    const ordered = (0, exports.orderManifestationsByYear)(manifestations, "asc");
    return ordered[0];
};
exports.getFirstPublishedManifestation = getFirstPublishedManifestation;
const getFirstPublishedYear = (manifestations) => {
    return String((0, exports.getManifestationPublicationYear)((0, exports.getFirstPublishedManifestation)(manifestations)));
};
exports.getFirstPublishedYear = getFirstPublishedYear;
const getManifestationPid = (manifestations) => {
    const ordered = (0, exports.orderManifestationsByYear)(manifestations);
    return ordered[0].pid;
};
exports.getManifestationPid = getManifestationPid;
const getCoverTint = (index) => {
    const conf = (0, configuration_1.getConf)("coverTints", configuration_1.default);
    const { coverTints } = conf;
    if (coverTints) {
        const tintKey = index % coverTints.length;
        return coverTints[tintKey];
    }
    return undefined;
};
exports.getCoverTint = getCoverTint;
const getColors = () => {
    return (0, configuration_1.getConf)("colors", configuration_1.default);
};
exports.getColors = getColors;
const getModalIds = () => {
    return (0, configuration_1.getConf)("modalIds", configuration_1.default);
};
exports.getModalIds = getModalIds;
const getThresholds = () => {
    return (0, configuration_1.getConf)("thresholds", configuration_1.default);
};
exports.getThresholds = getThresholds;
const daysBetweenTodayAndDate = (date) => {
    const inputDate = (0, dayjs_1.default)(new Date(date));
    const today = (0, dayjs_1.default)(new Date());
    // Math.ceil 0 diff last param true is because "diff()" rounds the number down
    // and we need it to be rounded up
    // todo figure out if ceil is correct (talk to ddb)
    return Math.ceil(inputDate.diff(today, "day", true));
};
exports.daysBetweenTodayAndDate = daysBetweenTodayAndDate;
const daysBetweenDates = (firstDate, secondDate) => {
    const inputFirstDate = (0, dayjs_1.default)(new Date(firstDate));
    const inputSecondDate = (0, dayjs_1.default)(new Date(secondDate));
    // Math.ceil 0 diff last param true is because "diff()" rounds the number down
    // and we need it to be rounded up
    // todo figure out if ceil is correct (talk to ddb)
    return Math.ceil(inputFirstDate.diff(inputSecondDate, "day", true));
};
exports.daysBetweenDates = daysBetweenDates;
const usePrevious = (value) => {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
};
exports.usePrevious = usePrevious;
const convertPostIdToFaustId = (postId) => {
    // We have seen post ids containing both letters and numbers
    // in the last part after the colon.
    // We are about to have clarified what the proper name of the element.
    // But for now we will call it faustId.
    const matches = postId.match(/^[0-9]+-[a-z]+:([a-zA-Z0-9]+)$/);
    if (matches?.[1]) {
        return matches?.[1];
    }
    throw new Error(`Unable to extract faust id from post id "${postId}"`);
};
exports.convertPostIdToFaustId = convertPostIdToFaustId;
// Get params if they are defined as props use those
// otherwise try to fetch them from the url.
const getParams = (props) => {
    const params = {};
    Object.entries(props).forEach(([property, value]) => {
        params[property] = value || (0, url_1.getUrlQueryParam)(property);
    });
    return params;
};
exports.getParams = getParams;
const sortByLoanDate = (list) => {
    // Todo figure out what to do if loan does not have loan date
    // For now, its at the bottom of the list
    return list.sort((objA, objB) => new Date(objA.loanDate || new Date()).getTime() -
        new Date(objB.loanDate || new Date()).getTime());
};
exports.sortByLoanDate = sortByLoanDate;
const getDueDatesLoan = (list) => {
    return Array.from(new Set(list
        .filter(({ dueDate }) => dueDate !== (undefined || null))
        .map(({ dueDate }) => dueDate)));
};
exports.getDueDatesLoan = getDueDatesLoan;
const getDueDatesForModal = (list, date) => {
    return list.filter(({ dueDate }) => dueDate === date);
};
exports.getDueDatesForModal = getDueDatesForModal;
// If modalids are longer than 0, a modal is open.
// If a modal is open, the list should not be displayed.
const isAModalDisplayed = (modalIds) => {
    return modalIds.length > 0;
};
exports.isAModalDisplayed = isAModalDisplayed;
const getPageSizeFromConfiguration = (pageSizeConf) => {
    const { pageSize } = (0, configuration_1.getDeviceConf)(pageSizeConf, configuration_1.default);
    return Number(pageSize);
};
exports.getPageSizeFromConfiguration = getPageSizeFromConfiguration;
const getRenewableMaterials = (list) => {
    return list
        .filter(({ isRenewable }) => isRenewable)
        .map(({ loanId }) => loanId);
};
exports.getRenewableMaterials = getRenewableMaterials;
const getAmountOfRenewableLoans = (list) => {
    return (0, exports.getRenewableMaterials)(list).length;
};
exports.getAmountOfRenewableLoans = getAmountOfRenewableLoans;
const groupObjectArrayByProperty = (array, property) => array.reduce((result, current) => {
    const groupBy = current[property];
    // If for some reason we do not have a value we just return the accumulated result.
    if (!groupBy) {
        return result;
    }
    // Make sure that the new aggregation key is a string.
    const key = String(groupBy);
    // Merge into result if the property already exist.
    if (key in result) {
        return {
            ...result,
            [key]: [...result[key], current]
        };
    }
    // Otherwise create new property.
    return { ...result, [key]: [current] };
}, {});
exports.groupObjectArrayByProperty = groupObjectArrayByProperty;
const getManifestationsPids = (manifestations) => {
    return manifestations.map((manifestation) => manifestation.pid);
};
exports.getManifestationsPids = getManifestationsPids;
const stringifyValue = (value) => value ? String(value) : "";
exports.stringifyValue = stringifyValue;
const materialIsFiction = ({ fictionNonfiction }) => fictionNonfiction?.code === "FICTION";
exports.materialIsFiction = materialIsFiction;
const getListItems = (list, itemsShown) => {
    return [...list].splice(0, itemsShown);
};
exports.getListItems = getListItems;
const getPageSizeFromDataAttributes = ({ desktop, mobile }) => {
    const { pageSize } = (0, configuration_1.getDeviceConf)("pageSize", {
        pageSize: {
            mobile: {
                pageSize: mobile
            },
            desktop: {
                pageSize: desktop
            }
        }
    });
    return Number(pageSize);
};
exports.getPageSizeFromDataAttributes = getPageSizeFromDataAttributes;
const pageSizeGlobal = (pageSizes, configName) => {
    let pageSize = 0;
    if (pageSizes?.desktop && pageSizes?.mobile) {
        pageSize = (0, exports.getPageSizeFromDataAttributes)(pageSizes);
    }
    else {
        pageSize = (0, exports.getPageSizeFromConfiguration)(configName || "pageSize");
    }
    return pageSize;
};
exports.pageSizeGlobal = pageSizeGlobal;
const materialIsOverdue = (date) => (0, dayjs_1.default)().isAfter((0, dayjs_1.default)(date), "day");
exports.materialIsOverdue = materialIsOverdue;
const getReadyForPickup = (list) => {
    return [...list].filter(({ state }) => state === "readyForPickup");
};
exports.getReadyForPickup = getReadyForPickup;
const filterLoansOverdue = (loans) => {
    return loans.filter(({ dueDate }) => {
        return (0, exports.materialIsOverdue)(dueDate);
    });
};
exports.filterLoansOverdue = filterLoansOverdue;
const filterLoansSoonOverdue = (loans) => {
    const { warning } = (0, exports.getThresholds)();
    return loans.filter(({ dueDate }) => {
        const due = dueDate || "";
        const daysUntilExpiration = (0, exports.daysBetweenTodayAndDate)(due);
        return (daysUntilExpiration - warning <= 0 &&
            daysUntilExpiration - warning >= -warning);
    });
};
exports.filterLoansSoonOverdue = filterLoansSoonOverdue;
const getManifestationType = (manifestation) => manifestation?.materialTypes?.[0]?.specific;
exports.getManifestationType = getManifestationType;
const dataIsNotEmpty = (data) => Boolean(data.length);
exports.dataIsNotEmpty = dataIsNotEmpty;
exports.default = {};
