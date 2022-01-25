//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useEffect, Lsi } from "uu5g05";
import { Icon } from "uu5g05-elements";
import UuP from "uu_pg01";
import "uu_pg01-bricks";
import { DataObjectStateResolver } from "../../core/core";
import { getContextBarProps } from "../../jokes/context-bar";
import Content from "./content";
import Config from "./config/config";
import JokeErrorsLsi from "../errors-lsi";
import PreferenceErrorsLsi from "../../preference/errors-lsi";
import LsiData from "./box-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoxView",
  //@@viewOff:statics
};

// Prediction of the content height before we download and render it [px]
const PLACEHOLDER_HEIGHT = 500;

export const BoxView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    preferenceDataObject: PropTypes.object,
    baseUri: PropTypes.string,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onReload: PropTypes.func,
    onOpenPreference: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    preferenceDataObject: {
      state: "ready",
      data: {
        showCategories: true,
        showAuthor: true,
        showCreationTime: true,
        disableUserPreference: true,
      },
    },
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    isHome: false,
    contextType: "basic",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onReload: () => {},
    onOpenPreference: () => {},
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
    const { header, help, cardView, elevation, borderRadius, bgStyle, contextType, ...contentProps } = otherProps;

    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;
    const helpElement = <Lsi lsi={help} />;

    const isDataLoaded =
      props.jokesDataObject.data !== null &&
      props.jokeDataObject.data !== null &&
      props.preferenceDataObject.data !== null;

    const actionList = getActions(props, isDataLoaded);

    const contextBarProps = isDataLoaded
      ? getContextBarProps(props.jokesDataObject.data, props.awscDataObject.data, props.contextType, props.isHome)
      : null;

    return (
      <UuP.Bricks.ComponentWrapper
        {...elementProps}
        header={headerElement}
        help={helpElement}
        contextBarProps={contextBarProps}
        contextType={contextType}
        cardView={cardView}
        elevation={elevation}
        bgStyle={bgStyle}
        borderRadius={borderRadius}
        actionList={actionList}
        hideCopyComponent
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
              {() => <Content {...contentProps} className={Config.Css.css`margin: 16px`} />}
            </DataObjectStateResolver>
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </UuP.Bricks.ComponentWrapper>
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

function getActions(props, isDataLoaded) {
  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      content: <Lsi lsi={LsiData.reloadData} />,
      onClick: props.onReload,
    });
    actionList.push({
      content: <Lsi lsi={LsiData.configure} />,
      onClick: props.onOpenPreference,
      disabled: props.preferenceDataObject.data.disableUserPreference,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      content: <Lsi lsi={LsiData.copyComponent} />,
      onClick: props.onCopyComponent,
    });
  }

  return actionList;
}

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default BoxView;
