import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MyNewApplication, {
  MyNewApplicationEntryProps
} from "./my-new-application.entry";

import "./my-new-application.css";

export default {
  title: "My new application",
  component: MyNewApplication,
  argTypes: {
    text: {
      defaultValue: "Text",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MyNewApplication>;

export const App: ComponentStory<typeof MyNewApplication> = (
  args: MyNewApplicationEntryProps
) => <MyNewApplication {...args} />;
