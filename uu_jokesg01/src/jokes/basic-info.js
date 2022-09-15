//@@viewOn:imports
import { Jokes } from "uu_jokesg01-core";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import EditModal from "./basic-info/edit-modal";
//@@viewOff:imports

let BasicInfo = Jokes.BasicInfo;
BasicInfo = withMargin(BasicInfo);
BasicInfo = withEditModal(BasicInfo, EditModal);
BasicInfo = withErrorBoundary(BasicInfo);

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
