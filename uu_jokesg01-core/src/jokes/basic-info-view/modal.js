//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Modal",
  //@@viewOff:statics
};

export const Modal = createVisualComponent({
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
    bgStyle: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    colorSchema: UU5.PropTypes.string,
    actionList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: {},
    help: {},
    shown: false,
    showCopyComponent: true,
    onCopyComponent: () => {},
    onClose: () => {},
    onUpdate: () => {},
    onSetState: () => {},
    bgStyle: "transparent",
    elevation: 1,
    borderRadius: "0",
    colorSchema: "default",
    actionList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Elements.Modal
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        open={props.shown}
        onClose={props.onClose}
        actionList={props.actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <Content
          jokesDataObject={props.jokesDataObject}
          jokesPermission={props.jokesPermission}
          expanded={false}
          expandButton
          editButtons
          bgStyle={props.bgStyle}
          colorSchema={props.colorSchema}
          elevation={props.elevation}
          borderRadius={props.borderRadius}
          onUpdate={props.onUpdate}
          onSetState={props.onSetState}
          disabled={props.disabled}
        />
      </Uu5Elements.Modal>
    );
    //@@viewOff:render
  },
});

export default Modal;
