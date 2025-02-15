import React, { FC, ReactNode } from "react";
import { formatDate } from "../../utils/helpers";
import { LoanType } from "../../../../core/utils/types/loan-type";
import StatusCircle from "../utils/status-circle";
import StatusBadge from "../utils/status-badge";
import { useText } from "../../../../core/utils/text";

interface MaterialStatusProps {
  loan: LoanType;
  dueDateLabel: string;
  children: ReactNode;
}

const MaterialStatus: FC<MaterialStatusProps> = ({
  loan,
  dueDateLabel,
  children
}) => {
  const t = useText();
  const { dueDate, loanDate } = loan;

  if (!dueDate || !loanDate) return <div />;

  return (
    <div className="list-reservation__status">
      <StatusCircle loanDate={loanDate} dueDate={dueDate} />
      <div>
        <div className="list-reservation__deadline">
          <StatusBadge
            dueDate={dueDate}
            dangerText={t("loanListStatusBadgeDangerText")}
            warningText={t("loanListStatusBadgeWarningText")}
          />
          <p className="text-small-caption" id="due-date">
            {dueDateLabel} {formatDate(dueDate)}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MaterialStatus;
