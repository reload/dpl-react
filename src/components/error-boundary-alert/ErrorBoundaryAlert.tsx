import React, { FC } from "react";
import ReachAlert from "@reach/alert";
import { useText } from "../../core/utils/text";

export interface ErrorBoundaryAlertProps {
  className?: string;
  type?: "assertive" | "polite";
  variant?: "info" | "success" | "warning" | "blank";
  resetErrorBoundary: () => void;
}

/**
 * A simple alert that serves as the foundation of all alerts.
 */
const ErrorBoundaryAlert: FC<ErrorBoundaryAlertProps> = ({
  className,
  type,
  variant,
  resetErrorBoundary
}) => {
  const t = useText();
  return (
    <ReachAlert
      className={`dpl-alert dpl-alert--${variant} ${className}`}
      type={type}
    >
      <>
        <h1 className="text-header-h3">{t("alertErrorTitleText")}</h1>
        <p className="text-body-medium-regular my-16">
          {t("alertErrorMessageText")}
        </p>
        <button
          type="button"
          className="btn-primary btn-outline btn-medium"
          aria-label={t("closeErrorWindow")}
          onClick={resetErrorBoundary}
        >
          {t("alertErrorCloseText")}
        </button>
      </>
    </ReachAlert>
  );
};

export default ErrorBoundaryAlert;
