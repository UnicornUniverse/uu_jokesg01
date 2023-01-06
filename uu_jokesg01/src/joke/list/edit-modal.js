//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Suspense, Fragment } from "uu5g05";
import Config from "./config/config";
//@@viewOff:imports

const EditModalLazy = Utils.Component.lazy(async () => {
  await Promise.all([
    Utils.Uu5Loader.import("uu5g05-editing", import.meta.url),
    Utils.Uu5Loader.import("uu5g05-forms", import.meta.url),
  ]);
  return import("./edit-modal-lazy.js");
});

const EditModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    componentType: PropTypes.elementType.isRequired,
    componentProps: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onReady: PropTypes.func.isRequired,
    fallback: PropTypes.element,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    fallback: <Fragment />,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    return (
      <Suspense fallback={props.fallback}>
        <EditModalLazy {...props} />
      </Suspense>
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export { EditModal };
export default EditModal;
//viewOff:exports
