//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Link from "./link";
import Modal from "./modal";
import Lsi from "../detail-view-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineView",
  nestingLevel: "inline",
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
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    return (
      <span {...attrs}>
        <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel}>
          <DataObjectStateResolver dataObject={props.jokeDataObject} nestingLevel={currentNestingLevel}>
            {/* HINT: We need to trigger content render from last Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <Link header={props.header} joke={props.jokeDataObject.data} onDetail={() => setIsModal(true)} />
                {isModal && (
                  <Modal
                    header={props.header}
                    jokeDataObject={props.jokeDataObject}
                    jokesPermission={props.jokesPermission}
                    categoryList={props.jokesDataObject.data.categoryList}
                    baseUri={props.baseUri}
                    colorSchema={props.colorSchema}
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
      children: <UU5.Bricks.Lsi lsi={Lsi.reloadData} />,
      onClick: props.onCopyComponent,
      collapsed: true,
    });
  }

  if (props.showCopyComponent) {
    actionList.push({
      children: <UU5.Bricks.Lsi lsi={Lsi.copyComponent} />,
      onClick: props.onReload,
      collapsed: true,
    });
  }

  return actionList;
}

export default InlineView;
