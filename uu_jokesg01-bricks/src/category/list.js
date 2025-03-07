//@@viewOn:imports
import { withLazy } from "uu5g05";
import ListStatics from "./list/statics.js";
//@@viewOff:imports

const List = withLazy(
  async () => {
    // NOTE Add extra imports here if the brick component needs them (and the imported library must be in package.json).
    // await Promise.all([Utils.Uu5Loader.import("uu_exampleg01", import.meta.url)]);
    return import("./list/list-lazy.js");
  },
  undefined,
  ListStatics,
);

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
