//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
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
    ...Config.Types.InlineModal.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
    ...Config.Types.Component.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineModal.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { header, info, shown, actionList, contextType, isHome, onClose, ...contentProps } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Modal
        header={<Lsi lsi={header} />}
        info={<Lsi lsi={info} />}
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
