import * as React from "react";
import HelloWorld from "./hello-world";

export interface HelloWorldEntryProps {
  // Deliberately enforcing ts error.
  // Should be corrected again to: titleText
  title: string;
  introductionText: string;
}

const HelloWorldEntry: React.FC<HelloWorldEntryProps> = ({
  titleText,
  introductionText
}) => <HelloWorld title={titleText} introduction={introductionText} />;

export default HelloWorldEntry;
