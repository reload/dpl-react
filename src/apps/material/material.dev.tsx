import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    pid: {
      name: "pid",
      defaultValue: "870970-basis:52557240",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodikumSelectYearText: {
      name: "Year",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodikumSelectWeekText: {
      name: "Week",
      defaultValue: "Uge",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    reserveText: {
      name: "Reserve",
      defaultValue: "reserver",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "FIND PÅ HYLDEN",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      name: "Description headline",
      defaultValue: "Beskrivelse",
      control: { type: "text" }
    },
    searchUrl: {
      name: "Base search url",
      defaultValue:
        "http://localhost/?path=/story/apps-search-result--search-result",
      control: { type: "text" }
    },
    identifierText: {
      name: "Identifier/topic text",
      defaultValue: "Emneord",
      control: { type: "text" }
    },
    inSameSeriesText: {
      name: "In same series as",
      defaultValue: "I samme serie",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number",
      defaultValue: "Nr",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "i serien",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      name: "Details of the material",
      defaultValue: "Detaljer om materialet",
      control: { type: "text" }
    },
    editionsText: {
      name: "Editions",
      defaultValue: "Udgaver",
      control: { type: "text" }
    },
    detailsText: {
      name: "Details",
      defaultValue: "Detaljer",
      control: { type: "text" }
    },
    typeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    languageText: {
      name: "Language",
      defaultValue: "Sprog",
      control: { type: "text" }
    },
    contributorsText: {
      name: "Contributors",
      defaultValue: "Bidragsydere",
      control: { type: "text" }
    },
    originalTitleText: {
      name: "Original title",
      defaultValue: "Originaltitel",
      control: { type: "text" }
    },
    isbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Udgave",
      control: { type: "text" }
    },
    scopeText: {
      name: "Scope",
      defaultValue: "Omfang",
      control: { type: "text" }
    },
    publisherText: {
      name: "Publisher",
      defaultValue: "Forlag",
      control: { type: "text" }
    },
    audienceText: {
      name: "Audience",
      defaultValue: "Målgruppe",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

export const Material: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;
