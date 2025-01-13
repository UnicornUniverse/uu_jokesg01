//@@viewOn:imports
import { PropTypes, Utils, createVisualComponent, useCallback } from "uu5g05";
import { Grid } from "uu5tilesg02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Grid.DefaultTile.propTypes,
    data: PropTypes.object,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Grid.DefaultTile.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data, onClick } = props;
    const handleClick = useCallback(
      (event) => {
        const eventWithData = new Utils.Event(data, event);
        onClick(eventWithData);
      },
      [data, onClick],
    );
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Grid.DefaultTile {...props} onClick={typeof onClick === "function" ? handleClick : undefined} headerOverlap />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Tile };
export default Tile;
//@@viewOff:exports
