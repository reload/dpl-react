"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withText = exports.useText = void 0;
const store_1 = require("../store");
const text_slice_1 = require("../text.slice");
const withSuffix_1 = __importDefault(require("./withSuffix"));
const isAJsonObjectString = (str) => str.match(/^\{.*\}$/);
class TextDefinitionError extends Error {
    constructor(message) {
        super(message);
        this.name = "TextDefinitionError";
    }
}
// This function is trying to convert a text string given to an application
// into a text definition object.
//
// If the text string is a Json object it will be validated.
// If it is valid it will be returned as is
// or otherwise transformed into a text definition object with an error.
//
// If the text string is a string it will be converted to a "simple" text definition.
const constructTextDefinitionFromRawTextTextEntry = (rawText) => {
    // String converted to "simple" text definition.
    if (!isAJsonObjectString(rawText)) {
        return {
            type: "simple",
            text: [rawText]
        };
    }
    // Let's try to parse the string as a Json object.
    try {
        const textDefinition = JSON.parse(rawText);
        // Validate the text definition object.
        if (typeof textDefinition === "object" &&
            Object.keys(textDefinition).length === 2 &&
            Object.keys(textDefinition).includes("type") &&
            Object.keys(textDefinition).includes("text") &&
            ["simple", "plural"].includes(textDefinition?.type ?? "") &&
            Array.isArray(textDefinition?.text)) {
            const type = textDefinition?.type;
            const text = textDefinition?.text ?? [];
            if (["simple"].includes(type) && text.length !== 1) {
                throw new TextDefinitionError("Simple text definitions must have exactly one text entry");
            }
            if (["plural"].includes(type) && text.length !== 2) {
                throw new TextDefinitionError("Plural text definitions must have exactly two text entries");
            }
            return textDefinition;
        }
    }
    catch (error) {
        // Instead we are logging an error to the console.
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new TextDefinitionError(`Could not parse rawText text format: ${rawText}. Message: ${message}`);
    }
    // If we got this far the text definition is invalid.
    return {
        type: "simple",
        text: ["Unknown text entry"]
    };
};
const processTexts = (texts, placeholders) => texts.map((text) => text.replace(/@\w+/g, (match) => {
    // If the placeholder value is zero we need to handle it specifically.
    if (placeholders[match] === 0) {
        return "0";
    }
    // Otherwise we check if we have a value for the placeholder.
    // We return the value of the placeholder if found.
    // Otherwise we return the placeholder itself
    // to show that the placeholder value cannot be found.
    return String(placeholders[match] || match);
}));
const useText = () => {
    const { data } = (0, store_1.useSelector)((state) => state.text);
    return (key, { placeholders, count } = { count: 0 }) => {
        const textDefinition = constructTextDefinitionFromRawTextTextEntry(data?.[key] ?? key);
        const textPlaceholders = { ...(placeholders ?? {}) };
        // If we are in plural mode we make sure
        // that we do not also need to specify a count placeholder.
        if (textDefinition.type === "plural") {
            textPlaceholders["@count"] = String(count);
        }
        const processedTexts = textPlaceholders
            ? processTexts(textDefinition.text, textPlaceholders)
            : textDefinition.text;
        switch (textDefinition.type) {
            case "plural":
                // If count is 0 we need the second text because it is the plural form.
                if (count === 0) {
                    return processedTexts[1];
                }
                // If count is 1 we select the first text entry
                // otherwise we select the second text entry.
                return processedTexts[1 % (count ?? 1)];
            case "simple":
            default:
                return processedTexts[0];
        }
    };
};
exports.useText = useText;
const withText = (Component) => {
    return (0, withSuffix_1.default)(Component, "Text", text_slice_1.addTextEntries);
};
exports.withText = withText;
