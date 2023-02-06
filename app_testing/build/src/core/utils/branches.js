"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetBranches = exports.cleanBranchesId = exports.excludeBlacklistedBranches = void 0;
const config_1 = require("./config");
const excludeBlacklistedBranches = (branches, blacklist) => {
    return branches.filter((item) => !blacklist.includes(item.branchId));
};
exports.excludeBlacklistedBranches = excludeBlacklistedBranches;
const cleanBranchesId = (branches) => {
    return (branches
        .map((branch) => {
        // Filtering on branchId, only uses agency number for example "775100" and not ISIL "DK-775100"
        // So we need to filter on the digits after the -
        const pattern = /-(\d*)/g;
        const matches = pattern.exec(branch.branchId);
        return matches ? matches[1] : "";
    })
        // Remove empty strings
        .filter((item) => item));
};
exports.cleanBranchesId = cleanBranchesId;
const useGetBranches = () => {
    const config = (0, config_1.useConfig)();
    const branches = config("branchesConfig", {
        transformer: "jsonParse"
    });
    const blacklistBranches = config("blacklistedSearchBranchesConfig", {
        transformer: "stringToArray"
    });
    const whitelistBranches = (0, exports.excludeBlacklistedBranches)(branches, blacklistBranches);
    return whitelistBranches;
};
exports.useGetBranches = useGetBranches;
const useGetCleanBranches = () => {
    const branches = (0, exports.useGetBranches)();
    const cleanBranches = (0, exports.cleanBranchesId)(branches);
    return cleanBranches;
};
exports.default = useGetCleanBranches;
