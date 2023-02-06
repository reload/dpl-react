"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // create express app
app.get("/", (req, res) => {
    res.send("This is from express.js");
});
// start express server on port 5000
app.listen(5555, () => {
    console.log("server started on port 5000");
});
exports.default = {};
