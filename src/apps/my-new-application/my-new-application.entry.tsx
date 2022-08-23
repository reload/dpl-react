import * as React from "react";

export interface MyNewApplicationEntryProps {
  text: string;
}

// The props of an entry is all of the data attributes that were
// set on the DOM element. See the section on "Naive app mount." for
// an example.
const MyNewApplicationEntry: React.FC<MyNewApplicationEntryProps> = ({
  text
}) => <h2>{text}</h2>;

export default MyNewApplicationEntry;
