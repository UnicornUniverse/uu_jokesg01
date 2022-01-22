//@@viewOn:imports
import { createComponentWithRef, PropTypes, Utils, Suspense } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:lazy
const EditModalLazy = Utils.Component.lazy(async () => {
  // eslint-disable-next-line no-undef
  await SystemJS.import("uu5g04-bricks-editable");
  return import("./edit-modal-lazy.js");
});
//@@viewOff:lazy

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EditModal",
  //@@viewOff:statics
};

export const EditModal = createComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    props: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    props: {},
    onClose: () => {},
  },
  //@@viewOff:defaultProps

  render({ props, onClose, fallback }, ref) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Suspense fallback={fallback}>
        <EditModalLazy props={props} onClose={onClose} ref={ref} />
      </Suspense>
    );
    //@@viewOff:render
  },
});

export default EditModal;
