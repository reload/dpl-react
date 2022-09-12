import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../core/modal.slice";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";

type ReservationSuccesProps = {
  title: string;
  preferredPickupBranch: string;
  modalId: string;
};

const ReservationSucces: React.FC<ReservationSuccesProps> = ({
  modalId,
  title,
  preferredPickupBranch
}) => {
  const dispatch = useDispatch();
  const t = useText();
  return (
    <section className="reservation-modal reservation-modal--confirm">
      <h2 className="text-header-h3 pb-48">
        {t("reservationSuccesTitleText")}
      </h2>
      <p className="text-body-medium-regular pb-24">
        {title} {t("reservationSuccesIsReservedForYouText")}
      </p>
      <p className="text-body-medium-regular pb-48">
        {t("reservationSuccesPreferredPickupBranchText")}
        {preferredPickupBranch}.
      </p>
      <Button
        classNames="reservation-modal__confirm-button"
        label={t("okButtonText")}
        buttonType="none"
        disabled={false}
        collapsible={false}
        size="small"
        variant="filled"
        onClick={() => {
          dispatch(closeModal({ modalId }));
        }}
      />
    </section>
  );
};

export default ReservationSucces;
