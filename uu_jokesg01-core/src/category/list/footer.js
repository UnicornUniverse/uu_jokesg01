//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Counter } from "uu5tilesg02-controls";
import { Box } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({ borderBottomLeftRadius: "inherit", borderBottomRightRadius: "inherit" }),
};
//@@viewOff:css

const Footer = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Footer",
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
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props, Css.main());
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Box {...elementProps} {...componentProps}>
        <Counter />
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Footer };
export default Footer;
//@@viewOff:exports
