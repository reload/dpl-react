import React, { FC } from "react";
import ReservationList from "./reservation-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { withConfig } from "../../../core/utils/config";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";

export interface ReservationListProps {
  headerText: string;
  physicalLoansTitleText: string;
  readyText: string;
  materialByAuthorText: string;
  materialAndAuthorText: string;
  pauseReservationStartDateConfig: string;
  youAreNumberInQueueText: string;
  youAreFirstInQueueText: string;
  expiresSoonText: string;
  inLineText: string;
  youAreNumberInLineText: string;
  blacklistedPickupBranchesConfig: string;
  reservationPickUpLatestText: string;
  publizonEbookText: string;
  publizonAudioBookText: string;
  publizonPodcastText: string;
  loanBeforeText: string;
  daysText: string;
  canBeLoanedInText: string;
  reservationDetailsButtonText: string;
  reservationDetailsOthersInQueueText: string;
  reservationDetailsNumberInQueueLabelText: string;
  reservationDetailsNumberInQueueTitelText: string;
  reservationDetailsPickUpAtTitelText: string;
  reservationDetailsNoInterestAfterTitelText: string;
  reservationDetailsPickupDeadlineTitleText: string;
  reservationDetailsGoToEreolenText: string;
  reservationDetailsExpiresLabelText: string;
  oneMonthText: string;
  twoMonthsText: string;
  threeMonthsText: string;
  sixMonthsText: string;
  oneYearText: string;
  listDetailsNothingSelectedLabelText: string;
  branchesConfig: string;
  reservationDetailsPickupDeadlineTitelText: string;
  reservationDetailsDateOfReservationTitelText: string;
  reservationDetailsReadyForLoanText: string;
  reservationDetailsRemoveReservationText: string;
  deleteReservationModalHeaderText: string;
  deleteReservationModalDeleteQuestionText: string;
  deleteReservationModalNotRegrettableText: string;
  deleteReservationModalDeleteText: string;
  deleteReservationModalCloseModalText: string;
  deleteReservationModalAriaDescriptionText: string;
  reservationListPauseReservationText: string;
  reservationListOnHoldAriaText: string;
  reservationListPauseReservationAriaModalText: string;
  pauseReservationModalAriaDescriptionText: string;
  pauseReservationModalHeaderText: string;
  pauseReservationModalBreadText: string;
  pauseReservationModalCloseModalText: string;
  pauseReservationModalStartDateLabelText: string;
  pauseReservationModalEndDateLabelText: string;
  pauseReservationModalBelowInputsTextText: string;
  pauseReservationModalLinkText: string;
  pauseReservationModalSaveButtonLabelText: string;
  reservationListReadyForPickupTitleText: string;
  reservationListReadyForPickupEmptyText: string;
  reservationListPhysicalReservationsEmptyText: string;
  reservationListPhysicalReservationsHeaderText: string;
  reservationListDigitalReservationsEmptyText: string;
  reservationListDigitalReservationsHeaderText: string;
  reservationListAllEmptyText: string;
  pageSizeDesktop: number;
  pageSizeMobile: number;
}

const ReservationListEntry: FC<ReservationListProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeReservationList"
  );
  return <ReservationList pageSize={pageSize} />;
};

export default withConfig(withUrls(withText(ReservationListEntry)));
