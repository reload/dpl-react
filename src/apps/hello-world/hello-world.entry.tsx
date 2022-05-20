import * as React from "react";
import { withStaticDataProp } from "../../core/utils/hoc/with-static-data-prop";
import HelloWorld from "./hello-world";

export interface HelloWorldEntryProps {
  titleText: string;
  introductionText: string;
  texts: Texts;
}
const HelloComponent = withStaticDataProp(
  HelloWorld,
  "http://0.0.0.0:3001/static-data"
);
const HelloWorldEntry: React.FC<HelloWorldEntryProps> = (props) => {
  const { titleText, introductionText, texts } = props;
  console.log(props);

  return (
    <HelloComponent
      title={titleText}
      introduction={introductionText}
      texts={texts}
    />
  );
};

export default HelloWorldEntry;
