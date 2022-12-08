//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: (spacing, background) => {
    const isDark = ["dark", "full"].includes(background);

    return Config.Css.css({
      backgroundColor: isDark ? "#616161" : "#FFFFFF",
      padding: isDark ? spacing.d : 0,
    });
  },
};
//@@viewOff:css

//@@viewOn:helpers

//@@viewOff:helpers

const BackgroundView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BackgroundView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(spacing, props.background));
    return <div {...attrs}>{props.children}</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { BackgroundView };
export default BackgroundView;
//@@viewOff:exports
