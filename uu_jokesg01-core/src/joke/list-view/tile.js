//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useEffect } from "uu5g05";
import { Box } from "uu5g05-elements";
import BoxContent from "../detail-view/box-content";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: jokeDataObject } = props;

    useEffect(() => {
      if (jokeDataObject.data.image && !jokeDataObject.data.imageUrl && jokeDataObject.state === "ready") {
        jokeDataObject.handlerMap.getImage(jokeDataObject.data).catch((error) => console.error(error));
      }
    }, [jokeDataObject]);

    function handleDetail(event) {
      event.stopPropagation();
      props.onDetail(jokeDataObject);
    }

    //@@viewOff:private

    //@@viewOn:render
    // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=60f0389a1012fb00296f2155
    // We are not able to show placeholder for position where are no data and we are wating for their download
    const [elementProps, contentProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Box
        {...elementProps}
        significance="subdued"
        borderRadius="elementary"
        onClick={handleDetail}
        background={props.background}
      >
        <BoxContent {...contentProps} jokeDataObject={jokeDataObject} showDelete />
      </Box>
    );
    //@@viewOff:render
  },
});

export default Tile;
