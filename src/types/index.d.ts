declare global {
  interface Window {
    wts: {
      push(props: ["send", EventType, EventData]): void;
    };
  }
}

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    fetchpriority?: "high" | "low" | "auto";
  }
}

export default {};
