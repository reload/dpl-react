"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const search_result_dev_1 = __importDefault(require("../../src/apps/search-result/search-result.dev"));
console.log(search_result_dev_1.default);
const port = 5555;
const staticDir = `http://localhost:${port}/dpl-react-static`;
const app = (0, express_1.default)(); // create express app
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.use("/dpl-react-static", express_1.default.static(path_1.default.join(__dirname, "../../dist")));
app.get("/search", (req, res) => {
    res.render("search", {
        staticDir
    });
});
// start express server on port 5000
app.listen(5555, () => {
    console.log("server started on port 5555");
});
exports.default = {};
