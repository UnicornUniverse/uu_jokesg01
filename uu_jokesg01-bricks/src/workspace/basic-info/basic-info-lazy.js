//@@viewOn:imports
import { createComponent } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { Workspace } from "uu_jokesg01-core";
import EditModal from "./edit-modal.js";
import Statics from "./statics.js";
//@@viewOff:imports

let BasicInfo = createComponent({
  //@@viewOn:statics
  ...Statics,
  nestingLevel: Workspace.BasicInfo.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Workspace.BasicInfo.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Workspace.BasicInfo.defaultProps,
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <Workspace.BasicInfo {...props} />;
    //@@viewOff:render
  },
});

BasicInfo = withMargin(BasicInfo);
BasicInfo = withEditModal(BasicInfo, EditModal);
BasicInfo = withErrorBoundary(BasicInfo);

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
