//@@viewOn:imports
import { createVisualComponent, Utils, useEffect, Lsi } from "uu5g05";
import { Icon } from "uu5g05-elements";
import { IdentificationBlock } from "uu_plus4u5g02-elements";
import { DataObjectStateResolver } from "../../core/core";
import ContextBar from "../../jokes/context-bar";
import Content from "./content";
import Config from "./config/config";
import JokeErrorsLsi from "../errors-lsi";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
//@@viewOff:imports

// Prediction of the content height before we download and render it [px]
const PLACEHOLDER_HEIGHT = 500;

export const BoxView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BoxView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.BoxView.propTypes,
    ...Config.Types.Detail.AsyncData.propTypes,
    ...Config.Types.Detail.Internals.propTypes,
    ...Config.Types.Detail.Properties.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.BoxView.defaultProps,
    ...Config.Types.Detail.AsyncData.defaultProps,
    ...Config.Types.Detail.Internals.defaultProps,
    ...Config.Types.Detail.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    useEffect(() => {
      async function checkDataAndLoad() {
        if (props.preferenceDataObject.state === "readyNoData") {
          try {
            await props.preferenceDataObject.handlerMap.load();
          } catch (error) {
            console.error(error);
          }
        }
      }

      checkDataAndLoad();
    });
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, otherProps] = Utils.VisualComponent.splitProps(props);

    const {
      header,
      info,
      card,
      background,
      significance,
      borderRadius,
      isHome,
      awscDataObject,
      actionList,
      identificationType,
      ...contentProps
    } = otherProps;

    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;

    return (
      <IdentificationBlock
        {...elementProps}
        header={headerElement}
        info={<Lsi lsi={info} />}
        card={card}
        background={background}
        significance={significance}
        borderRadius={borderRadius}
        actionList={actionList}
        identificationType={identificationType}
      >
        <DataObjectStateResolver dataObject={props.jokesDataObject} height={PLACEHOLDER_HEIGHT}>
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            height={PLACEHOLDER_HEIGHT}
            customErrorLsi={JokeErrorsLsi}
          >
            <DataObjectStateResolver
              dataObject={props.preferenceDataObject}
              height={PLACEHOLDER_HEIGHT}
              customErrorLsi={PreferenceErrorsLsi}
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
                  <Content {...contentProps} className={Config.Css.css`margin: 16px`} />
                </>
              )}
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </IdentificationBlock>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Header({ header, joke }) {
  return (
    <>
      {joke && !joke.visibility && <Icon className={visibilityCss()} icon="mdi-eye-off" />}
      <Lsi lsi={header} />
      {joke && ` - ${joke.name}`}
    </>
  );
}

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default BoxView;
