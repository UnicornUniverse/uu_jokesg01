//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import ContentView from "./content-view";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  //@@viewOff:statics
};

export const Content = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.object.isRequired,
    help: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onSetState: PropTypes.func,
    onReload: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    isHome: false,
    contextType: "basic",
    bgStyle: "transparent",
    colorSchema: "default",
    elevation: 1,
    cardView: "full",
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onSetState: () => {},
    onReload: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { jokesDataObject, awscDataObject, systemDataObject, ...viewProps } = props;

    return (
      <ContentView
        {...viewProps}
        jokes={props.jokesDataObject.data}
        awsc={props.awscDataObject.data}
        system={props.systemDataObject.data}
        expandButton
        editButtons
      />
    );
    //@@viewOff:render
  },
});

export default Content;
