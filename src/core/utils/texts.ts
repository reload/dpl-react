import { Texts } from "./hoc/with-static-data-prop";

export const getText = (key: string, texts: Texts): string => {
  return texts?.data?[key] ?? key;
};

export default {};
