// This file was auto-generated according to the "namespace" setting in package.json.
// Manual changes to this file are discouraged, if values are inconsistent with package.json setting.
import { Utils } from "uu5g05";

const TAG = "UuJokesCore.";

export default {
  TAG,

  Css: Utils.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),
  DefaultBrickTags: {
    JOKE_DETAIL: "UuJokes.Joke.Detail",
    JOKE_LIST: "UuJokes.Joke.List",
    JOKES_BASIC_INFO: "UuJokes.Jokes.BasicInfo",
  },
  Routes: {
    JOKES: "jokes",
    CATEGORIES: "categories",
    CONTROL_PANEL: "controlPanel",
    INIT_APP_WORKSPACE: "sys/uuAppWorkspace/initUve",
    ABOUT: "about",
  },
};
