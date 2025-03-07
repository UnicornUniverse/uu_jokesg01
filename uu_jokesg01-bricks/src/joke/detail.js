//@@viewOn:imports
import { withLazy } from "uu5g05";
import DetailStatics from "./detail/statics.js";
//@@viewOff:imports

const Detail = withLazy(
  async () => {
    // NOTE Add extra imports here if the brick component needs them (and the imported library must be in package.json).
    // await Promise.all([Utils.Uu5Loader.import("uu_exampleg01", import.meta.url)]);
    return import("./detail/detail-lazy.js");
  },
  undefined,
  DetailStatics,
);

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
