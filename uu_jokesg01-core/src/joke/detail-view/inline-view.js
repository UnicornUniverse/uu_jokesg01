//@@viewOn:imports
import { createVisualComponent, Utils, useState, Lsi } from "uu5g05";
import { Icon, Link } from "uu5g05-elements";
import { useSubApp } from "uu_plus4u5g01-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineModal from "./inline-modal";
import JokesUtils from "../../utils/utils";
import LsiData from "./inline-view-lsi";
import JokeErrorsLsi from "../errors-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineView",
  //@@viewOff:statics
};

export const InlineView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    ...Config.Types.InlineView.propTypes,
    ...Config.Types.Component.AsyncData.propTypes,
    ...Config.Types.Component.Internals.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Config.Types.InlineView.defaultProps,
    ...Config.Types.Component.AsyncData.defaultProps,
    ...Config.Types.Component.Internals.defaultProps,
    ...Config.Types.Component.Properties.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [isModal, setIsModal] = useState(false);
    const { baseUri } = useSubApp();
    const actionList = getActions(props);

    function handleDetail(event) {
      // Is it Ctrl + click?
      if (event.ctrlKey || event.metaKey) {
        const componentProps = {
          baseUri: baseUri,
          jokeId: props.jokeDataObject.data.id,
        };

        JokesUtils.redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps);
      } else {
        setIsModal(true);
      }
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps, modalProps] = Utils.VisualComponent.splitProps(props);
    const attrs = Utils.VisualComponent.getAttrs(elementProps);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver
            dataObject={props.jokeDataObject}
            nestingLevel="inline"
            customErrorLsi={JokeErrorsLsi}
          >
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <span>
                  {!props.jokeDataObject.data.visibility && <Icon className={visibilityCss()} icon="mdi-eye-off" />}
                  <Lsi lsi={props.header} />
                  {" - "}
                  <Link onClick={handleDetail}>{props.jokeDataObject.data.name}</Link>
                </span>
                {isModal && (
                  <InlineModal {...modalProps} onClose={() => setIsModal(false)} actionList={actionList} shown />
                )}
              </>
            )}
          </DataObjectStateResolver>
        </DataObjectStateResolver>
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 4px;
`;
//@@viewOff:css

//@@viewOn:helpers
function getActions(props) {
  const isDataLoaded =
    props.jokesDataObject.data !== null &&
    props.jokeDataObject.data !== null &&
    props.preferenceDataObject.data !== null;

  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      icon: "mdi-sync",
      children: <Lsi lsi={LsiData.reloadData} />,
      onClick: props.onReload,
      collapsed: true,
      disabled: props.disabled,
    });
    actionList.push({
      icon: "mdi-settings",
      children: <Lsi lsi={LsiData.configure} />,
      onClick: props.onOpenPreference,
      collapsed: true,
      disabled: props.disabled || props.preferenceDataObject.data.disableUserPreference,
    });
  }

  actionList.push({
    icon: "mdi-content-copy",
    children: <Lsi lsi={LsiData.copyComponent} />,
    onClick: props.onCopyComponent,
    collapsed: true,
    disabled: props.disabled,
  });

  return actionList;
}
//@@viewOff:helpers

export default InlineView;
