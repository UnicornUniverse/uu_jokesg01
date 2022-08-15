//@@viewOn:imports
import { createVisualComponent, PropTypes, useEffect } from "uu5g05";
import BoxView from "../detail-view/box-view";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...BoxView.propTypes,
    onItemDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...BoxView.defaultProps,
    onItemDetail: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: jokeDataObject, onItemDetail, ...viewProps } = props;

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

    function handleItemDetail(event) {
      event.stopPropagation();
      onItemDetail(jokeDataObject);
    }

    //@@viewOff:private

    //@@viewOn:render
    return (
      <BoxView
        {...viewProps}
        jokeDataObject={jokeDataObject}
        actionList={props.onGetItemActions(jokeDataObject)}
        onDetail={handleItemDetail}
        significance="subdued"
        borderRadius="elementary"
        hideTypeName
      />
    );
    //@@viewOff:render
  },
});

export default Tile;
