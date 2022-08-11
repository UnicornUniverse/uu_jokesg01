//@@viewOn:imports
import { createVisualComponent, Utils, useEffect, useLsi } from "uu5g05";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import Header from "./header";
import ContextBar from "../../jokes/context-bar";
import Content from "./content";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

// Prediction of the content height before we download and render it
const PLACEHOLDER_HEIGHT = "500px";

export const AreaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AreaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.AreaView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.AreaView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const errorsLsi = useLsi(importLsi, ["Errors"]);

    useEffect(() => {
      async function checkDataAndLoad() {
        if (props.preferenceDataObject.state === "readyNoData") {
          try {
            await props.preferenceDataObject.handlerMap.load();
          } catch (error) {
            AreaView.logger.error("Error loading preference data", error);
          }
        }
      }

      checkDataAndLoad();
    });
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);

    const { info, card, borderRadius, isHome, awscDataObject, actionList, identificationType, level, ...contentProps } =
      otherProps;

    const headerElement = <Header joke={props.jokeDataObject.data} hideTypeName={props.hideTypeName} />;

    return (
      <IdentificationBlock
        {...elementProps}
        header={headerElement}
        info={info}
        card={card}
        borderRadius={borderRadius}
        actionList={actionList}
        identificationType={identificationType}
        headerSeparator={true}
        level={level}
      >
        {(block) => (
          <DataObjectStateResolver
            dataObject={props.jokesDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={errorsLsi}
          >
            <DataObjectStateResolver
              dataObject={props.jokeDataObject}
              height={PLACEHOLDER_HEIGHT}
              customErrorLsi={errorsLsi}
            >
              <DataObjectStateResolver
                dataObject={props.preferenceDataObject}
                height={PLACEHOLDER_HEIGHT}
                customErrorLsi={errorsLsi}
              >
                {/* HINT: We need to trigger Content render from last Resolver to have all data loaded before setup of Content properties */}
                {() => (
                  <>
                    <ContextBar
                      jokes={props.jokesDataObject.data}
                      awsc={awscDataObject.data}
                      contextType={identificationType}
                      isHome={isHome}
                    />
                    <Content {...contentProps} parentStyle={block.style} />
                  </>
                )}
              </DataObjectStateResolver>
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        )}
      </IdentificationBlock>
    );
    //@@viewOff:render
  },
});

export default AreaView;
