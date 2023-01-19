"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilityLabel = void 0;
const react_1 = __importDefault(require("react"));
const Check_svg_1 = __importDefault(require("@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Check.svg"));
const clsx_1 = __importDefault(require("clsx"));
const react_use_1 = require("react-use");
const text_1 = require("../../core/utils/text");
const link_no_style_1 = require("../atoms/link-no-style");
const useStatistics_1 = require("../../core/statistics/useStatistics");
const statistics_1 = require("../../core/statistics/statistics");
const helper_1 = require("./helper");
const AvailabilityLabel = ({ manifestText, accessTypes, selected = false, url, faustIds, handleSelectManifestation, cursorPointer = false, dataCy = "availability-label", isbn }) => {
    const { track } = (0, useStatistics_1.useStatistics)();
    const t = (0, text_1.useText)();
    const { isAvailable } = (0, helper_1.useAvailabilityData)({
        accessTypes,
        faustIds,
        isbn
    });
    const availabilityText = isAvailable ? t("available") : t("unavailable");
    (0, react_use_1.useDeepCompareEffect)(() => {
        // Track material availability (status) if the button is active - also meaning
        // it is displayed on the material page and represent the active manifestation
        // material type
        if (selected) {
            track("click", {
                id: statistics_1.statistics.materialStatus.id,
                name: statistics_1.statistics.materialStatus.name,
                trackedData: availabilityText
            });
        }
        // We only want to track if the faustIds change (once - on load), or the selected
        // status changes (on select of the availability button)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faustIds, selected]);
    const availableTriangleCss = isAvailable ? "success" : "alert";
    const classes = {
        parent: (0, clsx_1.default)({
            "pagefold-parent--none availability-label--selected": selected
        }, {
            "pagefold-parent--xsmall availability-label--unselected": !selected
        }, { "cursor-pointer": cursorPointer }, "text-label", "availability-label"),
        triangle: (0, clsx_1.default)({ "pagefold-triangle--none": selected }, {
            [`pagefold-triangle--xsmall pagefold-triangle--xsmall--${availableTriangleCss}`]: !selected
        }),
        check: (0, clsx_1.default)("availability-label--check", selected && "selected")
    };
    const availabilityLabel = (<div className={classes.parent} onClick={handleSelectManifestation ?? undefined} onKeyPress={handleSelectManifestation ?? undefined} role="button" tabIndex={0} data-cy={dataCy}>
      <div className={classes.triangle}/>
      <img className={classes.check} src={Check_svg_1.default} alt="check-icon"/>
      {manifestText && (<>
          <p className="text-label-semibold ml-24" data-cy="availability-label-type">
            {manifestText}
          </p>
          <div className="availability-label--divider ml-4"/>
        </>)}
      <p className={`text-label-normal ${manifestText ? "ml-4" : "ml-24"} mr-8`} data-cy="availability-label-status">
        {availabilityText}
      </p>
    </div>);
    return url && !handleSelectManifestation ? (<link_no_style_1.LinkNoStyle url={url}>{availabilityLabel}</link_no_style_1.LinkNoStyle>) : (availabilityLabel);
};
exports.AvailabilityLabel = AvailabilityLabel;
exports.default = exports.AvailabilityLabel;
