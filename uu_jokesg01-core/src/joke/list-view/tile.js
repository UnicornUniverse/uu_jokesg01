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
    ...BoxContent.propTypes,
    onItemDetail: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...BoxContent.defaultProps,
    onItemDetail: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: jokeDataObject } = props;

    useEffect(() => {
      if (
        jokeDataObject.data.image &&
        !jokeDataObject.data.imageUrl &&
        jokeDataObject.state === "ready" &&
        jokeDataObject.handlerMap?.getImage
      ) {
        jokeDataObject.handlerMap.getImage(jokeDataObject.data).catch((error) => console.error(error));
      }
    }, [jokeDataObject]);

    function handleItemDetail(event) {
      event.stopPropagation();
      props.onItemDetail(jokeDataObject);
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
        onClick={handleItemDetail}
        background={props.background}
      >
        <BoxContent {...contentProps} jokeDataObject={jokeDataObject} hideTypeName showDelete />
      </Box>
    );
    //@@viewOff:render
  },
});

export default Tile;
