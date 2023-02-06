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
exports.useModalButtonHandler = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const CloseLarge_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/CloseLarge.svg"));
const clsx_1 = __importDefault(require("clsx"));
const modal_slice_1 = require("../modal.slice");
const user_1 = require("./helpers/user");
const url_1 = require("./helpers/url");
function Modal({ modalId, closeModalAriaLabelText, children, screenReaderModalDescriptionText, classNames, dataCy = "modal" }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { modalIds } = (0, react_redux_1.useSelector)((s) => s.modal);
    (0, react_1.useEffect)(() => {
        const searchParams = new URLSearchParams(window.location.search);
        // Deep link stuff: if the id is in the url, open the modal
        if (searchParams.get("modal")?.includes(modalId)) {
            dispatch((0, modal_slice_1.openModal)({ modalId }));
        }
    }, [modalId, dispatch]);
    // Check if the modal should be open
    if (modalIds && !modalIds.includes(modalId)) {
        return null;
    }
    return (<div className="modal-backdrop" 
    // TODO: Close the modal when clicking backdrop.
    style={{
            // some elements are designed with z-index which means they pop up over the modal
            // so I add 10 to the z-index of the modal
            // the index of the modalid is used, so the newest modal is always on top of
            // the remaining modals
            zIndex: modalIds.indexOf(modalId) + 10
        }}>
      <div className={(0, clsx_1.default)("modal", {
            "modal-show": modalIds.includes(modalId)
        }, classNames)} role="dialog" aria-labelledby={`modal-${modalId}-description`} data-cy={dataCy}>
        <div className="modal__screen-reader-description" id={`modal-${modalId}-description`}>
          {screenReaderModalDescriptionText}
        </div>
        <button type="button" 
    /* A focusable element in a modal must have focus when opened,
    or else the screen reader will remain on the main page */
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus className="btn-ui modal-btn-close" style={{
            // same as comment above
            zIndex: modalIds.indexOf(modalId) + 10
        }} aria-label={closeModalAriaLabelText} onClick={() => {
            dispatch((0, modal_slice_1.closeModal)({ modalId }));
        }} data-cy={`modal-${modalId}-close-button`}>
          <img src={CloseLarge_svg_1.default} alt="" style={{ pointerEvents: "none" }}/>
          {/* alt="": Hidden from screen readers, because the aria-label is sufficient */}
        </button>
        {children}
      </div>
    </div>);
}
const useModalButtonHandler = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    return {
        open: (modalId) => {
            return dispatch((0, modal_slice_1.openModal)({ modalId }));
        },
        close: (modalId) => {
            return dispatch((0, modal_slice_1.closeModal)({ modalId }));
        },
        openGuarded: ({ authUrl, modalId, trackOnlineView }) => {
            // Redirect anonymous users to the login platform, including a return link
            // to this page with an open modal.
            if ((0, user_1.userIsAnonymous)()) {
                const returnUrl = (0, url_1.currentLocationWithParametersUrl)({
                    modal: modalId
                });
                (0, url_1.redirectToLoginAndBack)({
                    authUrl,
                    returnUrl,
                    trackingFunction: trackOnlineView
                });
                return;
            }
            // If user is not anonymous we just open the given modal + potentially track it.
            if (trackOnlineView) {
                trackOnlineView();
            }
            dispatch((0, modal_slice_1.openModal)({ modalId }));
        }
    };
};
exports.useModalButtonHandler = useModalButtonHandler;
exports.default = Modal;
