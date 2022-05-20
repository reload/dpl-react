import * as React from "react";
import { Hello } from "../../components/hello/hello";
import { Texts } from "../../core/utils/hoc/with-static-data-prop";

interface HelloWorldProps {
  title: string;
  introduction: string;
  texts: Texts;
}

const HelloWorld: React.FC<HelloWorldProps> = (props) => {
  const { title, introduction, texts } = props;

  if (texts.isLoading) {
    return <p>Bug off!</p>;
  }

  return (
    <article>
      <h2>{title}</h2>
      <p>{introduction}</p>
      <p>
        <Hello what="world" shouldBeEmphasized />
      </p>
      <p>{texts["message.success"]}</p>
    </article>
  );
};

export default HelloWorld;
