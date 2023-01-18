//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useEffect } from "uu5g05";
import BoxView from "../detail-view/box-view";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onGetItemActions: PropTypes.func,
    onItemDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { elementAttrs, componentProps } = Utils.VisualComponent.splitProps(props);
    const { data: jokeDataObject, onItemDetail, ...viewProps } = componentProps;

    useEffect(() => {
      if (
        jokeDataObject.data.image &&
        !jokeDataObject.data.imageUrl &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap?.getImage
      ) {
        jokeDataObject.handlerMap
          .getImage(jokeDataObject.data)
          .catch((error) => Tile.logger.error("Error loading image", error));
      }
    }, [jokeDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <div {...elementAttrs} role="listitem" aria-label={jokeDataObject.data.name}>
        <BoxView
          {...viewProps}
          jokeDataObject={jokeDataObject}
          actionList={props.onGetItemActions(jokeDataObject)}
          onDetail={props.onItemDetail}
          significance="subdued"
          borderRadius="elementary"
          hideTypeName
        />
      </div>
    );
    //@@viewOff:render
  },
});

export default Tile;
