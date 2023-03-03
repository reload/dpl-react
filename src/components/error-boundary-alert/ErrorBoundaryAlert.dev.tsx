import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ErrorBoundaryAlert, {
  ErrorBoundaryAlertProps
} from "./ErrorBoundaryAlert";
import { withText } from "../../core/utils/text";

const WrappedErrorBoundaryAlert = withText(ErrorBoundaryAlert);

export default {
  title: "Components / ErrorBoundaryAlert",
  argTypes: {
    type: {
      control: {
        type: "select",
        options: ["assertive", "polite"]
      }
    },
    variant: {
      control: {
        type: "select",
        options: ["info", "success", "warning", "blank"]
      }
    },
    alertErrorTitleText: {
      defaultValue: "Error",
      control: {
        type: "text"
      }
    },
    alertErrorMessageText: {
      defaultValue: "An unexpected error occurred. Please try again later.",
      control: {
        type: "text"
      }
    },
    alertErrorCloseText: {
      defaultValue: "OK",
      control: {
        type: "text"
      }
    }
  }
} as ComponentMeta<typeof ErrorBoundaryAlert>;

const Template: ComponentStory<typeof WrappedErrorBoundaryAlert> = (
  args: ErrorBoundaryAlertProps
) => <WrappedErrorBoundaryAlert {...args} />;

export const Alert = Template.bind({});
