//@@viewOn:imports
import { createVisualComponent, useLsi, Utils } from "uu5g05";
import Uu5TilesControls from "uu5tilesg02-controls";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
import useJokeList from "../use-joke-list.js";
import importLsi from "../../lsi/import-lsi.js";
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
    const lsi = useLsi(importLsi, [Counter.uu5Tag]);
    const { jokeDataList, filterList } = useJokeList();
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props, Css.main());
    const isResults = filterList.length > 0;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...elementProps} {...componentProps}>
        <Uu5TilesControls.Counter
          itemList={isResults ? [{ label: lsi.results, value: jokeDataList.data.length }] : []}
          displayTotal={isResults ? false : true}
          displayResults={false}
        />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Counter };
export default Counter;
//@@viewOff:exports
