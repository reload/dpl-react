"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const statistics_1 = require("../../core/statistics/statistics");
const useStatistics_1 = require("../../core/statistics/useStatistics");
const link_no_style_1 = require("../atoms/link-no-style");
const CampaignBody_1 = __importDefault(require("./CampaignBody"));
const Campaign = ({ campaignData }) => {
    const { track } = (0, useStatistics_1.useStatistics)();
    if (!campaignData.title) {
        return null;
    }
    // campaignData.title will always be defined because we exit the component if
    // not, but Typescript still thinks it might so we assign it with "as string"
    const trackClick = () => {
        return track("click", {
            id: statistics_1.statistics.campaignClick.id,
            name: statistics_1.statistics.campaignClick.name,
            trackedData: campaignData.title
        });
    };
    if (campaignData.url) {
        return (<link_no_style_1.LinkNoStyle url={new URL(campaignData.url)} trackClick={trackClick} className="cursor-pointer">
        <CampaignBody_1.default campaignData={campaignData}/>
      </link_no_style_1.LinkNoStyle>);
    }
    return <CampaignBody_1.default campaignData={campaignData}/>;
};
exports.default = Campaign;
