"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const DropdownIcon_1 = __importDefault(require("./DropdownIcon"));
const Dropdown = ({ arrowIcon, ariaLabel, options, classNames, innerClassNames, handleOnChange, placeholder, cyData, defaultValue }) => {
    const classes = {
        root: (0, clsx_1.default)("dropdown", classNames),
        select: (0, clsx_1.default)("dropdown__select", innerClassNames?.select),
        option: (0, clsx_1.default)("dropdown__option", innerClassNames?.option),
        arrowWrapper: (0, clsx_1.default)("dropdown__arrows", innerClassNames?.arrowWrapper)
    };
    const checkHandleOnChange = (e) => {
        if (handleOnChange && e.target.value)
            handleOnChange(e);
        return undefined;
    };
    const optionsList = placeholder ? [placeholder, ...options] : options;
    return (<div className={classes.root}>
      <select data-cy={cyData} className={classes.select} aria-label={ariaLabel} onChange={checkHandleOnChange}>
        {optionsList.map(({ label, value, disabled }) => (<option key={label} value={value} className={classes.option} disabled={disabled} selected={value === defaultValue}>
            {label}
          </option>))}
      </select>
      <div className={classes.arrowWrapper}>
        <DropdownIcon_1.default arrowIcon={arrowIcon}/>
      </div>
    </div>);
};
exports.default = Dropdown;
