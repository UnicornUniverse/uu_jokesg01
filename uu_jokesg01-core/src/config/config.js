// This file was auto-generated according to the "namespace" setting in package.json.
// Manual changes to this file are discouraged, if values are inconsistent with package.json setting.
import UU5 from "uu5g04";

const TAG = "UuJokesCore.";

export default {
  TAG,
  DEFAULT_DETAIL_BRICK_TAG: "UuJokes.Joke.Detail",

  Css: UU5.Common.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),
  Routes: {
    JOKES: "jokes",
    CATEGORIES: "categories",
    CONTROL_PANEL: "controlPanel",
    INIT_APP_WORKSPACE: "sys/uuAppWorkspace/initUve",
    ABOUT: "about",
  },
};
