import * as React from "react";
import { useDispatch } from "react-redux";
import {
  ManifestationsSimpleFieldsFragment,
  WorkMediumFragment
} from "../../core/dbc-gateway/generated/graphql";
import { guardedRequest } from "../../core/guardedRequests.slice";
import { TypedDispatch } from "../../core/store";
import {
  convertPostIdToFaustId,
  creatorsToString,
  filterCreators,
  flattenCreators,
  getManifestationPid
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { AvailabiltityLabels } from "../availability-label/availability-labels";
import ButtonFavourite, {
  ButtonFavouriteId
} from "../button-favourite/button-favourite";
import { Cover } from "../cover/cover";
import MaterialAvailabilityText from "./MaterialAvailabilityText/MaterialAvailabilityText";
import MaterialHeaderText from "./MaterialHeaderText";
import MaterialButtons from "./material-buttons/MaterialButtons";
import MaterialPeriodikum from "./MaterialPeriodikum";
import { getUrlQueryParam } from "../../core/utils/helpers/url";

interface MaterialHeaderProps {
  wid: WorkId;
  work: WorkMediumFragment;
  manifestation?: ManifestationsSimpleFieldsFragment;
  selectManifestationHandler: (
    manifestation: ManifestationsSimpleFieldsFragment
  ) => void;
  selectPeriodikumSelect: (periodikumSelect: string | null) => void;
}

const MaterialHeader: React.FC<MaterialHeaderProps> = ({
  work: {
    titles: { full: fullTitle },
    creators,
    manifestations,
    mainLanguages,
    workId: wid
  },
  manifestation,
  selectManifestationHandler,
  selectPeriodikumSelect
}) => {
  // THIS MUST BE DELETED (START
  const isDemoPeriodikum = getUrlQueryParam("periodikum");
  // THIS MUST BE DELETED (END)
  const t = useText();
  const dispatch = useDispatch<TypedDispatch>();
  const addToListRequest = (id: ButtonFavouriteId) => {
    dispatch(
      guardedRequest({
        type: "addFavorite",
        args: { id },
        app: "material"
      })
    );
  };
  const creatorsText = creatorsToString(
    flattenCreators(filterCreators(creators, ["Person"])),
    t
  );

  const author = creatorsText || t("creatorsAreMissingText");

  const containsDanish = mainLanguages.some((language) =>
    language?.isoCode.toLowerCase().includes("dan")
  );

  const allLanguages = mainLanguages
    .map((language) => language.display)
    .join(", ");

  const title = containsDanish ? fullTitle : `${fullTitle} (${allLanguages})`;
  const coverPid =
    (manifestation?.pid as Pid) || getManifestationPid(manifestations);

  const faustId = manifestation
    ? convertPostIdToFaustId(manifestation?.pid as Pid)
    : null;

  return (
    <header className="material-header">
      <div className="material-header__cover">
        <Cover pid={coverPid} size="xlarge" animate />
      </div>
      <div className="material-header__content">
        <ButtonFavourite
          id={wid as WorkId}
          addToListRequest={addToListRequest}
        />
        <MaterialHeaderText title={String(title)} author={author} />
        <div className="material-header__availability-label">
          <AvailabiltityLabels
            workId={wid as WorkId}
            manifestations={manifestations}
            manifestation={manifestation}
            selectManifestationHandler={selectManifestationHandler}
          />
        </div>

        {
          // isDemoPeriodikum logic MUST BE DELETED
          // TODO check and show if manifestation needs PeriodikumSelect.
          // manifestation?.source.includes("Dummy some source") &&
          isDemoPeriodikum && faustId && (
            <MaterialPeriodikum
              faustId={isDemoPeriodikum ? "49333536" : faustId}
              selectPeriodikumSelect={selectPeriodikumSelect}
            />
          )
        }
        <div className="material-header__button">
          {manifestation && <MaterialButtons manifestation={manifestation} />}
        </div>
        {manifestation && (
          <MaterialAvailabilityText manifestation={manifestation} />
        )}
      </div>
    </header>
  );
};

export default MaterialHeader;
