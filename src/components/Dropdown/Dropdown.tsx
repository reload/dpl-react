import clsx from "clsx";
import React from "react";
import DropdownIcon from "./DropdownIcon";

export type Option = {
  label: string;
  disabled?: boolean;
  value: string;
};

type DropdownProps = {
  options: Option[];
  ariaLabel: string;
  arrowIcon: "triangles" | "chevron";
  classNames?: string;
  innerClassNames?: { select?: string; option?: string; arrowWrapper?: string };
  handleOnChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: Option;
  cyData?: string;
  defaultValue?: string;
};

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  arrowIcon,
  ariaLabel,
  options,
  classNames,
  innerClassNames,
  handleOnChange,
  placeholder,
  cyData,
  defaultValue
}) => {
  const classes = {
    root: clsx("dropdown", classNames),
    select: clsx("dropdown__select", innerClassNames?.select),
    option: clsx("dropdown__option", innerClassNames?.option),
    arrowWrapper: clsx("dropdown__arrows", innerClassNames?.arrowWrapper)
  };

  const checkHandleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (handleOnChange && e.target.value) handleOnChange(e);
    return undefined;
  };

  return (
    <div className={classes.root}>
      <select
        data-cy={cyData}
        className={classes.select}
        aria-label={ariaLabel}
        onChange={checkHandleOnChange}
      >
        {placeholder && (
          <option
            className={classes.option}
            value={placeholder.value}
            selected={placeholder.value === defaultValue}
            disabled={placeholder.disabled}
          >
            {placeholder.label}
          </option>
        )}

        {options.map(({ label, value, disabled }) => {
          return (
            <option
              key={label}
              value={value}
              className={classes.option}
              disabled={disabled}
              selected={value === defaultValue}
            >
              {label}
            </option>
          );
        })}
      </select>
      <div className={classes.arrowWrapper}>
        <DropdownIcon arrowIcon={arrowIcon} />
      </div>
    </div>
  );
};

export default Dropdown;
