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
const react_1 = __importStar(require("react"));
const result_pager_1 = __importDefault(require("./result-pager"));
const usePager = (hitcount, pageSize, overrideItemsShown) => {
    const [itemsShown, setItemsShown] = (0, react_1.useState)(pageSize >= hitcount ? hitcount : pageSize);
    const [page, setPage] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const onLastPage = pageSize > hitcount;
        setItemsShown(onLastPage ? hitcount : pageSize);
    }, [hitcount, pageSize]);
    const pagehandler = () => {
        const currentPage = page + 1;
        const itemsOnPage = (currentPage + 1) * pageSize;
        const onLastPage = itemsOnPage > hitcount;
        // the "itemsOnPage > hitcount"-check is to
        // To avoid the "showing 10 out of 8"-situation
        setItemsShown(onLastPage ? hitcount : itemsOnPage);
        setPage(currentPage);
    };
    const PagerComponent = hitcount ? (<result_pager_1.default itemsShown={overrideItemsShown ? overrideItemsShown() : itemsShown} hitcount={hitcount} setPageHandler={pagehandler}/>) : null;
    return { itemsShown, PagerComponent, page };
};
exports.default = usePager;
