//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import { Modal, useSpacing } from "uu5g05-elements";
import ContextBar from "../context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

const Css = {
  contextBar: ({ spaceA, spaceB }) =>
    Config.Css.css({ marginTop: -spaceB, marginBottom: spaceB, marginLeft: -spaceA, marginRight: -spaceA }),
  content: ({ spaceA, spaceB }, identificationType) =>
    Config.Css.css({
      marginTop: identificationType === "none" ? -spaceB : 0,
      marginLeft: -spaceA,
      marginRight: -spaceA,
      marginBottom: -spaceA,
    }),
};

export const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.DetailModal.propTypes,
    ...Config.Types.BasicInfo.AsyncData.propTypes,
    ...Config.Types.BasicInfo.Internals.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.DetailModal.defaultProps,
    ...Config.Types.BasicInfo.AsyncData.defaultProps,
    ...Config.Types.BasicInfo.Internals.defaultProps,
    ...Config.Types.BasicInfo.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const { header, info, shown, actionList, isHome, onClose, identificationType, ...contentProps } = props;

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
        closeOnOverlayClick
      >
        <ContextBar
          jokes={props.jokesDataObject.data}
          awsc={props.awscDataObject.data}
          contextType={identificationType}
          isHome={isHome}
          className={Css.contextBar(spacing)}
        />
        <Content {...contentProps} className={Css.content(spacing, identificationType)} />
      </Modal>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
