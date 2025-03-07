//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import Uu5TilesControls from "uu5tilesg02-controls";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
import useJokeList from "../use-joke-list.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottomLeftRadius: "inherit", borderBottomRightRadius: "inherit" }),
};
//@@viewOff:css

const Counter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Counter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Box.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Box.defaultProps,
    significance: "distinct",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { filterList } = useJokeList();
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props, Css.main());
    const isResults = filterList.length > 0;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...elementProps} {...componentProps}>
        <Uu5TilesControls.Counter displayTotal={!isResults} displayResults={isResults} />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Counter };
export default Counter;
//@@viewOff:exports
