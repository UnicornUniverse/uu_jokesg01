//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Link from "./link";
import Modal from "./modal";
import Utils from "../../utils/utils";
import Lsi from "./inline-view-lsi";
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
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
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

      Utils.redirectToPlus4UGo(Config.DefaultBrickTags.JOKE_DETAIL, componentProps);
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel="inline">
          <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel="inline">
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <Link header={props.header} joke={props.jokeDataObject.data} onDetail={handleDetail} />
                {isModal && (
                  <Modal
                    header={props.header}
                    jokeDataObject={props.jokeDataObject}
                    jokesPermission={props.jokesPermission}
                    categoryList={props.jokesDataObject.data.categoryList}
                    baseUri={props.baseUri}
                    colorSchema={props.colorSchema}
                    bgStyle={props.bgStyle}
                    shown={isModal}
                    onClose={() => setIsModal(false)}
                    onAddRating={props.onAddRating}
                    onUpdate={props.onUpdate}
                    onUpdateVisibility={props.onUpdateVisibility}
                    onCopyComponent={props.onCopyComponent}
                    showCopyComponent={props.showCopyComponent}
                    actionList={actionList}
                    disabled={props.disabled}
                  />
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
  const isDataLoaded = props.jokesDataObject.data !== null && props.jokeDataObject.data !== null;
  const actionList = [];

  if (isDataLoaded) {
    actionList.push({
      icon: "mdi-sync",
      children: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
      onClick: props.onReload,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      icon: "mdi-content-copy",
      children: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onCopyComponent,
      collapsed: true,
      disabled: props.disabled,
    });
  }

  return actionList;
}

export default InlineView;
