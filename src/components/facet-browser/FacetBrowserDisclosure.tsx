import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import clsx from "clsx";
import React, { FC, ReactNode, useCallback } from "react";

export interface FacetBrowserDisclosureProps {
  id: string;
  title: string;
  children?: ReactNode;
  fullWidth?: boolean;
  showContent?: boolean;
  removeHeadlinePadding?: boolean;
  onClick?: () => void;
}

// It was not possible to use the Disclosure component thats already in the project
// because we don't have control over the open attribute
const FacetBrowserDisclosure: FC<FacetBrowserDisclosureProps> = ({
  id,
  title,
  children,
  fullWidth,
  showContent = false,
  removeHeadlinePadding,
  onClick
}) => {
  const onClickHandler = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const disclosureId = `facet-${id}`;

  return (
    <div
      className={`disclosure text-body-large ${
        fullWidth ? "disclosure--full-width" : ""
      }`}
      aria-controls={disclosureId}
      aria-expanded={showContent}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      role="button"
      tabIndex={0}
    >
      <div
        className={clsx(
          "disclosure__headline text-body-large",
          removeHeadlinePadding && "disclosure__headline--no-padding"
        )}
      >
        <span className="disclosure__text">{title}</span>

        <img
          className="disclosure__expand noselect"
          src={ExpandMoreIcon}
          alt=""
        />
      </div>
      {showContent && <div id={disclosureId}>{children}</div>}
    </div>
  );
};

export default FacetBrowserDisclosure;
