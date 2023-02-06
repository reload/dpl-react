// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import path from "path";
// import storySettings from "../../src/apps/search-result/search-result.dev";

// console.log(storySettings);

const port = 5555;
const staticDir = `http://localhost:${port}/dpl-react-static`;
const app = express(); // create express app

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(
  "/dpl-react-static",
  express.static(path.join(__dirname, "../../dist"))
);

app.get("/search", (req, res) => {
  res.render("search", {
    staticDir
  });
});

// start express server on port 5000
app.listen(5555, () => {
  console.log("server started on port 5555");
});

export default {};
