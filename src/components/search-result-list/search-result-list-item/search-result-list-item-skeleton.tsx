import React, { memo } from "react";

const SearchResultListItemSkeleton: React.FC = () => {
  return (
    <article className="card-list-item ssc">
      <div className="ssc-square cover--size-small">&nbsp;</div>
      <div className="ssc-wrapper">
        <div className="ssc-head-line w-60 mb" />
        <div className="ssc-line w-60 mbs">&nbsp;</div>
        <div className="ssc-line w-60 mbs">&nbsp;</div>
      </div>
    </article>
  );
};

export default memo(SearchResultListItemSkeleton);
