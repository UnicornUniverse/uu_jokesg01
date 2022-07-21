//@@viewOn:imports
import { Jokes } from "uu_jokesg01-core";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditMode, withMargin } from "../core/core";
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
