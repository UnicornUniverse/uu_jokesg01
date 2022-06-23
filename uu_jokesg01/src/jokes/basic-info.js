//@@viewOn:imports
import { Jokes } from "uu_jokesg01-core";
import { withEditMode, withErrorBoundary, withMargin } from "../core/core";
import EditModal from "./basic-info/edit-modal";
//@@viewOff:imports

let BasicInfo = Jokes.BasicInfo;
BasicInfo = withMargin(BasicInfo);
BasicInfo = withEditMode(BasicInfo, EditModal);
BasicInfo = withErrorBoundary(BasicInfo);

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
