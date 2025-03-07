//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Suspense, Fragment } from "uu5g05";
import Config from "./config/config.js";

const EditModalLazy = Utils.Component.lazy(async () => {
  await Promise.all([Utils.Uu5Loader.import("uu5editingg01-forms", import.meta.url)]);
  return import("./edit-modal-lazy.js");
});
//@@viewOff:imports

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
    //@@viewOn:private
    const { fallback, ...propsToPass } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Suspense fallback={fallback}>
        <EditModalLazy {...propsToPass} />
      </Suspense>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditModal };
export default EditModal;
//@@viewOff:exports
