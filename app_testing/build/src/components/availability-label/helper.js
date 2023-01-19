"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAvailabilityData = void 0;
const react_1 = require("react");
const fbs_1 = require("../../core/fbs/fbs");
const publizon_1 = require("../../core/publizon/publizon");
const config_1 = require("../../core/utils/config");
const graphql_1 = require("../../core/dbc-gateway/generated/graphql");
const useAvailabilityData = ({ accessTypes, faustIds, isbn }) => {
    const [isAvailable, setIsAvailable] = (0, react_1.useState)(false);
    const config = (0, config_1.useConfig)();
    const blacklistBranches = config("blacklistedAvailabilityBranchesConfig", {
        transformer: "stringToArray"
    });
    const isOnline = accessTypes?.includes(graphql_1.AccessTypeCode.Online) ?? false;
    (0, fbs_1.useGetAvailabilityV3)({
        recordid: faustIds ?? [],
        ...(blacklistBranches ? { exclude: blacklistBranches } : {})
    }, {
        query: {
            // FBS / useGetAvailabilityV3 is responsible for handling availability
            // for physical items. This will be the majority of all materials so we
            // use this for everything except materials that are explicitly online.
            enabled: !isOnline && faustIds !== null,
            onSuccess: (data) => {
                if (data?.some((item) => item.available)) {
                    setIsAvailable(true);
                }
            }
        }
    });
    (0, publizon_1.useGetV1ProductsIdentifier)(isbn ?? "", {
        query: {
            // Publizon / useGetV1ProductsIdentifier is responsible for online
            // materials. It requires an ISBN to do lookups.
            enabled: isOnline && isbn !== null,
            onSuccess: () => {
                // For now we always consider online materials available at publizon
                // as available. In the future this can be improved by checking
                // 1. Whether the material has a quota (res?.product?.costFree)
                // 2. If the product has a quota:
                //    1. If the user has any quota loans available for the material type
                //    2. If the library has a queue on the material
                setIsAvailable(true);
            }
        }
    });
    return { isAvailable };
};
exports.useAvailabilityData = useAvailabilityData;
exports.default = {};
