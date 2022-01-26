//@@viewOn:imports
import { createVisualComponent, Utils, useState, Lsi } from "uu5g05";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import InlineLink from "./inline-link";
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
    const actionList = getActions(props);

    function handleNewWindow() {
      const componentProps = {
        baseUri: props.baseUri,
        jokeId: props.jokeDataObject.data.id,
      };

      JokesUtils.redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps);
    }

    function handleDetail(eventType) {
      if (eventType === "newWindow") {
        handleNewWindow();
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
                <InlineLink header={props.header} joke={props.jokeDataObject.data} onDetail={handleDetail} />
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

  if (props.showCopyComponent) {
    actionList.push({
      icon: "mdi-content-copy",
      children: <Lsi lsi={LsiData.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  return actionList;
}

export default InlineView;
