//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Icon, Number, Text, UuGds } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  marginRight: () => Config.Css.css({ paddingRight: UuGds.SpacingPalette.getValue(["inline", "b"]) }),
};
//@@viewOff:css

const InlineContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ joke, ...propsToPass }) {
    //@@viewOn:private
    const attrs = Utils.VisualComponent.getAttrs(propsToPass);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Text
        {...attrs}
        category="interface"
        segment="content"
        type="medium"
        colorScheme="building"
        significance="subdued"
      >
        <Icon icon="uugds-favorites" className={Css.marginRight()} />
        <span className={Css.marginRight()}>
          <Number value={joke.averageRating} minDecimalDigits={1} maxDecimalDigits={1} />
        </span>
      </Text>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineContent };
export default InlineContent;
//@@viewOff:exports
