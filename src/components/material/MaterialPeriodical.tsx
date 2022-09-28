import React, { FC } from "react";
import { useGetHoldingsV3 } from "../../core/fbs/fbs";
import { groupObjectArrayByProperty } from "../../core/utils/helpers/general";
import { FaustId } from "../../core/utils/types/ids";
import makePeriodicalEditionsFromHoldings from "./helper";
import MaterialPeriodicalSelect, {
  GroupList,
  GroupListItem
} from "./MaterialPeriodicalSelect";

export interface MaterialPeriodicalProps {
  faustId: FaustId;
  selectPeriodicalSelect: (periodicalSelect: string) => void;
}

const MaterialPeriodical: FC<MaterialPeriodicalProps> = ({
  faustId,
  selectPeriodicalSelect
}) => {
  const { data, isLoading, isError } = useGetHoldingsV3({
    recordid: [String(faustId)]
  });

  if (isLoading || isError || !data) return null;

  const materialsPeriodical = makePeriodicalEditionsFromHoldings(
    data[0].holdings
  );
  const groupByvolumeYear = groupObjectArrayByProperty(
    materialsPeriodical,
    "volumeYear"
  );

  const lastYear = Object.keys(groupByvolumeYear).sort().pop();
  const lastEdition = lastYear ? groupByvolumeYear[lastYear].shift() : null;

  if (lastYear && lastEdition) {
    return (
      <MaterialPeriodicalSelect
        lastEdition={lastEdition as GroupListItem}
        groupList={groupByvolumeYear as GroupList}
        lastYear={lastYear}
        selectPeriodicalSelect={selectPeriodicalSelect}
      />
    );
  }

  return null;
};

export default MaterialPeriodical;
