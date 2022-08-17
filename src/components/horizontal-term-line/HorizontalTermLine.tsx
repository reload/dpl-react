import React from "react";
import { Link } from "../atoms/link";

export interface HorizontalTermLineProps {
  title: string;
  subTitle?: string;
  linkList: {
    url: URL;
    term: string;
  }[];
}

const HorizontalTermLine: React.FC<HorizontalTermLineProps> = ({
  title,
  subTitle,
  linkList
}) => {
  return (
    <div className="text-small-caption horizontal-term-line">
      <p className="text-label-bold">
        {title || ""}{" "}
        {subTitle && (
          <span className="text-small-caption">{` ${subTitle}`}</span>
        )}
      </p>

      {linkList.map((item) => {
        return (
          <span key={item.term}>
            <Link href={item.url} className="link-tag">
              {item.term}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default HorizontalTermLine;
