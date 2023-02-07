// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
import path from "path";
// import storySettings from "../../src/apps/search-result/search-result.dev";

// console.log(storySettings);

const fullStaticPath = (relativeRoute: string, port: number) => {
  return `http://localhost:${port}${relativeRoute}`;
};

const settings = {
  port: 5555,
  staticDir: {
    dplReact: {
      route: "/dpl-react-static",
      path: "../../dist"
    },
    dplDesignSystem: {
      route: "/dpl-design-system-static",
      path: "../../node_modules/@danskernesdigitalebibliotek/dpl-design-system/build"
    }
  }
};

const staticDirJs = fullStaticPath(
  settings.staticDir.dplReact.route,
  settings.port
);
const staticDirCss = fullStaticPath(
  settings.staticDir.dplDesignSystem.route,
  settings.port
);

const app = express(); // create express app

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(
  settings.staticDir.dplReact.route,
  express.static(path.join(__dirname, settings.staticDir.dplReact.path))
);
app.use(
  settings.staticDir.dplDesignSystem.route,
  express.static(path.join(__dirname, settings.staticDir.dplDesignSystem.path))
);

app.get("/work", (req, res) => {
  res.render("work", {
    staticDirJs,
    staticDirCss
  });
});

app.get("/search", (req, res) => {
  res.render("search", {
    staticDirJs,
    staticDirCss
  });
});

// start express server on port 5000
app.listen(5555, () => {
  console.log("server started on port 5555");
});

export default {};
