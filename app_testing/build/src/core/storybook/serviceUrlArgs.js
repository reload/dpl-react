"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractServiceBaseUrls_1 = require("../utils/reduxMiddleware/extractServiceBaseUrls");
exports.default = {
    [extractServiceBaseUrls_1.serviceUrlKeys.fbs]: {
        name: "Base url for the FBS API",
        defaultValue: "https://fbs-openplatform.dbc.dk",
        control: { type: "text" }
    },
    [extractServiceBaseUrls_1.serviceUrlKeys.publizon]: {
        name: "Base url for the Publizon API",
        defaultValue: "https://pubhub-openplatform.test.dbc.dk",
        control: { type: "text" }
    },
    [extractServiceBaseUrls_1.serviceUrlKeys.dplCms]: {
        name: "Base url for the DPL CMS API",
        defaultValue: "https://dpl-cms.docker",
        control: { type: "text" }
    },
    [extractServiceBaseUrls_1.serviceUrlKeys.cover]: {
        name: "Base url for the cover service",
        defaultValue: "https://cover.dandigbib.org",
        control: { type: "text" }
    },
    [extractServiceBaseUrls_1.serviceUrlKeys.materialList]: {
        name: "Base url for the material list service",
        defaultValue: "https://prod.materiallist.dandigbib.org",
        control: { type: "text" }
    },
    [extractServiceBaseUrls_1.serviceUrlKeys.fbi]: {
        name: "Base url for the FBI API",
        defaultValue: "https://fbi-api.dbc.dk/opac/graphql",
        control: { type: "text" }
    }
};
