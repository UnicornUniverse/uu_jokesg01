//@@viewOn:imports
import { createVisualComponent, Utils, useLsi } from "uu5g05";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../context-bar";
import { Content } from "./content";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

export const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.AreaView.propTypes,
    ...Config.Types.BasicInfo.AsyncData.propTypes,
    ...Config.Types.BasicInfo.Internals.propTypes,
    ...Config.Types.BasicInfo.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.AreaView.defaultProps,
    ...Config.Types.BasicInfo.AsyncData.defaultProps,
    ...Config.Types.BasicInfo.Internals.defaultProps,
    ...Config.Types.BasicInfo.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);
    const { header, info, card, borderRadius, isHome, actionList, identificationType, level, ...contentProps } =
      otherProps;

    return (
      <IdentificationBlock
        {...elementProps}
        header={header}
        info={info}
        card={card}
        borderRadius={borderRadius}
        actionList={actionList}
        identificationType={identificationType}
        level={level}
      >
        {() => (
          <DataObjectStateResolver dataObject={props.jokesDataObject} customErrorLsi={errorsLsi}>
            {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
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
          </DataObjectStateResolver>
        )}
      </IdentificationBlock>
    );
    //@@viewOff:render
  },
});

export default AreaView;
