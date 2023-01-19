"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIsAnonymous = void 0;
const token_1 = require("../../token");
const userIsAnonymous = () => {
    return !(0, token_1.hasToken)("user");
};
exports.userIsAnonymous = userIsAnonymous;
exports.default = {};
