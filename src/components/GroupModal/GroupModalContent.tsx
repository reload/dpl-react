import React, { FC, useRef, ReactNode } from "react";
import { useIntersection } from "react-use";
import CheckBox from "../checkbox/Checkbox";
import { useText } from "../../core/utils/text";
import { getRenewableMaterials } from "../../core/utils/helpers/general";
import { ListType } from "../../core/utils/types/list-type";

interface GroupModalContentProps {
  amountOfSelectableMaterials: number;
  selectableMaterials?: ListType[];
  selectedMaterials?: ListType[];
  buttonComponent: ReactNode;
  selectMaterials?: (materialIds: ListType[]) => void;
  children: ReactNode;
}

const GroupModalContent: FC<GroupModalContentProps> = ({
  amountOfSelectableMaterials,
  selectableMaterials = [],
  selectedMaterials = [],
  selectMaterials,
  buttonComponent,
  children
}) => {
  const t = useText();

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0
  });

  const selectAllPossible = () => {
    if (selectMaterials) {
      if (selectedMaterials.length === amountOfSelectableMaterials) {
        selectMaterials(getRenewableMaterials([]));
      } else {
        selectMaterials(selectableMaterials);
      }
    }
  };

  const checkBoxComponent =
    selectMaterials !== undefined ? (
      <CheckBox
        selected={
          amountOfSelectableMaterials !== 0 &&
          selectedMaterials.length === amountOfSelectableMaterials
        }
        disabled={amountOfSelectableMaterials === 0}
        id="checkbox-select-all"
        onChecked={() => selectAllPossible()}
        label={t("groupModalCheckboxText")}
      />
    ) : null;

  return (
    <>
      <div className="modal-loan__buttons" ref={intersectionRef}>
        {checkBoxComponent}
        {buttonComponent}
      </div>
      <div className="modal-loan__list">{children}</div>
      {!intersection?.isIntersecting && (
        <div className="modal-loan__buttons modal-loan__buttons--bottom">
          {checkBoxComponent}
          {buttonComponent}
        </div>
      )}
    </>
  );
};

export default GroupModalContent;
