//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponentWithRef } from "uu5g04-hooks";
import "uu5g04-bricks";
import Config from "../config/config";
//@@viewOff:imports

//@@viewOn:lazy
const EditModalLazy = UU5.Common.Component.lazy(async () => {
  // eslint-disable-next-line no-undef
  await SystemJS.import("uu5g04-bricks-editable");
  return import("./edit-modal-lazy.js");
});
//@@viewOff:lazy

const EditModal = createComponentWithRef({
  //@@viewOn:statics
  displayName: Config.TAG + "EditModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    props: UU5.PropTypes.object,
    onClose: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ props, onClose, fallback }, ref) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Common.Suspense fallback={fallback}>
        <EditModalLazy props={props} onClose={onClose} ref={ref} />
      </UU5.Common.Suspense>
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export default EditModal;
//viewOff:exports
