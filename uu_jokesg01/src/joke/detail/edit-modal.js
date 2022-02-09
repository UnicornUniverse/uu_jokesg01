//@@viewOn:imports
import { createComponentWithRef, PropTypes, Utils, Suspense } from "uu5g05";
import Config from "../config/config";
//@@viewOff:imports

//@@viewOn:lazy
const EditModalLazy = Utils.Component.lazy(async () => {
  await Utils.Uu5Loader.import("uu5g04-bricks-editable");
  return import("./edit-modal-lazy.js");
});
//@@viewOff:lazy

const EditModal = createComponentWithRef({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    props: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ props, onClose, fallback }, ref) {
    //@@viewOn:render
    return (
      <Suspense fallback={fallback}>
        <EditModalLazy props={props} onClose={onClose} ref={ref} />
      </Suspense>
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export default EditModal;
//viewOff:exports
