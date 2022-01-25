//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { Modal } from "uu5g05-elements";
import ContextBar from "../context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineModal",
  //@@viewOff:statics
};

export const InlineModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesDataObject: PropTypes.object.isRequired,
    systemDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    header: PropTypes.object,
    shown: PropTypes.bool,
    showCopyComponent: PropTypes.bool,
    onClose: PropTypes.func,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onSetState: PropTypes.func,
    bgStyle: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    colorSchema: PropTypes.string,
    actionList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    isHome: false,
    contextType: "basic",
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
    const { header, shown, actionList, contextType, isHome, onClose, ...contentProps } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Modal
        header={<Lsi lsi={header} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <ContextBar
          jokes={props.jokesDataObject.data}
          awsc={props.awscDataObject.data}
          contextType={contextType}
          isHome={isHome}
        />
        <Content {...contentProps} />
      </Modal>
    );
    //@@viewOff:render
  },
});

export default InlineModal;
