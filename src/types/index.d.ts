declare global {
  interface Window {
    wts: {
      push(props: ["send", EventType, EventData]): void;
    };
  }
}

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}

export default {};
