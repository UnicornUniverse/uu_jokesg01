//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import JokesBasicInfoContent from "./jokes-basic-info-content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokesBasicInfoModal",
  //@@viewOff:statics
};

export const JokesBasicInfoModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesPermission: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    header: UU5.PropTypes.object,
    shown: UU5.PropTypes.bool,
    showCopyComponent: UU5.PropTypes.bool,
    onClose: UU5.PropTypes.func,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onSetState: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokesPermission: undefined,
    jokesDataObject: undefined,
    header: {},
    help: {},
    shown: false,
    showCopyComponent: false,
    onCopyComponent: () => {},
    onClose: () => {},
    onUpdate: () => {},
    onSetState: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Bricks.Modal
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        shown={props.shown}
        onClose={props.onClose}
        stickyBackground={false}
        offsetTop="auto"
        location="portal"
      >
        <JokesBasicInfoContent
          jokesDataObject={props.jokesDataObject}
          jokesPermission={props.jokesPermission}
          expanded={false}
          expandButton
          editButtons
          onOpenJokesUpdateModal={props.onUpdate}
          onOpenJokesSetStateModal={props.onSetState}
        />
      </UU5.Bricks.Modal>
    );
    //@@viewOff:render
  },
});

export default JokesBasicInfoModal;
