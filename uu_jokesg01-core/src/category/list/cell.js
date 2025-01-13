//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils, useCallback } from "uu5g05";
import { Table } from "uu5tilesg02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const Cell = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Cell",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Table.Cell.propTypes,
    data: PropTypes.object,
    onClick: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Table.Cell.defaultProps,
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
    return <Table.Cell {...props} onClick={typeof onClick === "function" ? handleClick : undefined} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Cell };
export default Cell;
//@@viewOff:exports
