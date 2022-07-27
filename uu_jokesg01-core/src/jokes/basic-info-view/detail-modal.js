//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import { IdentificationModal } from "uu_plus4u5g02-elements";
import ContextBar from "../context-bar";
import Config from "./config/config";
import Content from "./content";
//@@viewOff:imports

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
    //@@viewOn:render
    const { header, info, shown, actionList, isHome, onClose, identificationType, ...contentProps } = props;

    return (
      <IdentificationModal
        header={header}
        info={<Lsi lsi={info} />}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        disabled={props.disabled}
        identificationType={identificationType}
        closeOnOverlayClick
      >
        {() => (
          <>
            <ContextBar
              jokes={props.jokesDataObject.data}
              awsc={props.awscDataObject.data}
              contextType={identificationType}
              isHome={isHome}
            />
            <Content {...contentProps} />
          </>
        )}
      </IdentificationModal>
    );
    //@@viewOff:render
  },
});

export default DetailModal;
