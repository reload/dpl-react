import * as React from "react";
import { FC } from "react";
import { Cover } from "./cover";

export interface MaterialCoverProps {
  id: string;
}

const MaterialCover: FC<MaterialCoverProps> = ({ id }) => {
  return <Cover id={id} size="xlarge" fetchPriority="high" animate />;
};

export default MaterialCover;
