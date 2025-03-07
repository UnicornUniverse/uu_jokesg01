//@@viewOn:imports
import { withLazy } from "uu5g05";
import BasicInfoStatics from "./basic-info/statics.js";
//@@viewOff:imports

const BasicInfo = withLazy(
  async () => {
    // NOTE Add extra imports here if the brick component needs them (and the imported library must be in package.json).
    // await Promise.all([Utils.Uu5Loader.import("uu_exampleg01", import.meta.url)]);
    return import("./basic-info/basic-info-lazy.js");
  },
  undefined,
  BasicInfoStatics,
);

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
