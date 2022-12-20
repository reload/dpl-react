import React, { FC, ReactNode } from "react";
import { Cover } from "../../../../components/cover/cover";
import { BasicDetailsType } from "../../../../core/utils/types/basic-details-type";

interface MaterialInfoProps {
  material: BasicDetailsType;
  isbnForCover: string;
  periodical?: string | null;
  children?: ReactNode;
}

const MaterialInfo: FC<MaterialInfoProps> = ({
  material,
  isbnForCover,
  periodical,
  children
}) => {
  const { authors, materialType, year, title, description, pid, series } =
    material || {};
  const coverId = pid || isbnForCover;

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          id={coverId}
          idType={pid ? "pid" : "isbn"}
          size="small"
          animate={false}
          description={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        <div>
          <div className="status-label status-label--outline">
            {materialType}
          </div>
        </div>
        <div className="list-reservation__about">
          <h3 className="text-header-h4">{title}</h3>
          <p className="text-small-caption color-secondary-gray">
            {/* todo consolidate author/year in a component 
             other files: reservartion/helper.ts, search-result-list-item.tsx */}
            {authors && authors} {year && <>({year})</>}
          </p>
          {periodical && (
            <p className="text-small-caption color-secondary-gray">
              {periodical}
            </p>
          )}
          {series && (
            <p className="text-small-caption color-secondary-gray">{series}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default MaterialInfo;
