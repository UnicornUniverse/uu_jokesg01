//@@viewOn:imports
import { createVisualComponent, withStickyTop, Utils } from "uu5g05";
import { Box } from "uu5g05-elements";
import Uu5TilesControls from "uu5tilesg02-controls";
import Config from "./config/config.js";
//@@viewOff:imports

const Component = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SorterBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Uu5TilesControls.SorterBar.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Uu5TilesControls.SorterBar.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...elementProps} shape="background" significance="subdued">
        <Uu5TilesControls.SorterBar {...componentProps} />
      </Box>
    );
    //@@viewOff:render
  },
});

const SorterBar = withStickyTop(Component);

//@@viewOn:exports
export { SorterBar };
export default SorterBar;
//@@viewOff:exports
