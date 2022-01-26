import { Utils } from "uu5g05";
import Config from "../../config/config.js";
import ListTypes from "./list-types";

const TAG = Config.TAG + "Category.";

export default {
  ...Config,

  TAG,
  Css: Utils.Css.createCssModule(
    TAG.replace(/\.$/, "")
      .toLowerCase()
      .replace(/\./g, "-")
      .replace(/[^a-z-]/g, ""),
    process.env.NAME + "/" + process.env.OUTPUT_NAME + "@" + process.env.VERSION // this helps preserve proper order of styles among loaded libraries
  ),
  Types: {
    ...Config.Types,
    List: ListTypes,
  },
};
