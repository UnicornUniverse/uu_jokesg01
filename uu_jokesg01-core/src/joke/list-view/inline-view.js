//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { DataObjectStateResolver } from "../../core/core";
import Config from "./config/config";
import Modal from "./modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InlineView",
  nestingLevel: "inline",
  //@@viewOff:statics
};

// We need to use memo to avoid uncessary re-renders of whole list for better performance
// For example, when we open UpdateModal from Tile (trough events) we don't need to re-render list
export const InlineView = UU5.Common.Component.memo(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      header: UU5.PropTypes.object.isRequired,
      help: UU5.PropTypes.object.isRequired,
      jokeDataList: UU5.PropTypes.object.isRequired,
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
      onLoad: UU5.PropTypes.func,
      onLoadNext: UU5.PropTypes.func,
      onReload: UU5.PropTypes.func,
      onCreate: UU5.PropTypes.func,
      onDetail: UU5.PropTypes.func,
      onUpdate: UU5.PropTypes.func,
      onDelete: UU5.PropTypes.func,
      onAddRating: UU5.PropTypes.func,
      onUpdateVisibility: UU5.PropTypes.func,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {
      header: undefined,
      help: undefined,
      jokeDataList: undefined,
      jokesDataObject: undefined,
      jokesPermission: undefined,
      baseUri: undefined,
      bgStyle: "transparent",
      cardView: "full",
      colorSchema: "default",
      elevation: 1,
      borderRadius: "0",
      showCopyComponent: true,
      onCopyComponent: () => {},
      onLoad: () => {},
      onLoadNext: () => {},
      onReload: () => {},
      onCreate: () => {},
      onDetail: () => {},
      onUpdate: () => {},
      onDelete: () => {},
      onAddRating: () => {},
      onUpdateVisibility: () => {},
    },
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const [isModal, setIsModal] = useState(false);
      //@@viewOff:private

      //@@viewOn:render
      const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
      const attrs = UU5.Common.VisualComponent.getAttrs(props);

      return (
        <span {...attrs}>
          <DataObjectStateResolver dataObject={props.jokesDataObject} nestingLevel={currentNestingLevel}>
            {/* HINT: We need to trigger content render from Resolver to have all data loaded before we use them in content */}
            {() => (
              <>
                <UU5.Bricks.Link onClick={() => setIsModal(true)}>
                  <UU5.Bricks.Lsi lsi={props.header} />
                  {` - ${props.jokesDataObject.data.name}`}
                </UU5.Bricks.Link>
                {isModal && <Modal {...props} shown={isModal} onClose={() => setIsModal(false)} />}
              </>
            )}
          </DataObjectStateResolver>
        </span>
      );
      //@@viewOff:render
    },
  })
);

export default InlineView;
