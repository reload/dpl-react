import * as React from "react";

interface MyNewApplicationProps {
  text: string;
}

const MyNewApplication: React.FC<MyNewApplicationProps> = ({ text }) => (
  <h2 className="warm">{text}</h2>
);

export default MyNewApplication;
