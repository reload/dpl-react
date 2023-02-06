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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const icon_favourite_1 = require("../icon-favourite/icon-favourite");
const material_list_1 = require("../../core/material-list-api/material-list");
const text_1 = require("../../core/utils/text");
// TODO We have to check if user is login and redirect if not
const ButtonFavourite = ({ id, addToListRequest }) => {
    const [fillState, setFillState] = (0, react_1.useState)(false);
    const t = (0, text_1.useText)();
    const { mutate } = (0, material_list_1.useHasItem)();
    (0, react_1.useEffect)(() => {
        mutate({
            listId: "default",
            itemId: id
        }, {
            onSuccess: () => {
                setFillState(true);
            },
            // The material list service will return response code 404 when a
            // material is not on the patrons list. This is interpreted as an
            // error by our client. Consequently we set
            onError: () => {
                setFillState(false);
            }
        });
    }, [id, mutate]);
    const handleClick = (0, react_1.useCallback)((e) => {
        if (fillState) {
            (0, material_list_1.removeItem)("default", id);
            setFillState(false);
        }
        else {
            addToListRequest(id);
            setFillState(true);
        }
        // Prevent event from bubbling up. If other components includes the favourite button
        // this wont interfere with their click handler.
        e.stopPropagation();
    }, [addToListRequest, fillState, id]);
    return (react_1.default.createElement("button", { type: "button", "aria-label": fillState ? t("Remove from favorites") : t("Add to favorites"), onClick: handleClick, className: "button-favourite" },
        react_1.default.createElement(icon_favourite_1.IconFavourite, { fill: fillState })));
};
exports.default = ButtonFavourite;
