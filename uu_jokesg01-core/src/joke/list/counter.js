//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import Uu5TilesControls from "uu5tilesg02-controls";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
import useJokeList from "../use-joke-list.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

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
    const { jokeDataList } = useJokeList();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...props}>
        <Uu5TilesControls.Counter
          itemList={[{ label: lsi.results, value: jokeDataList.data.length }]}
          displayTotal={false}
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
