//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Icon, Number, UuGds } from "uu5g05-elements";
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
      <span {...attrs}>
        <Icon icon="uugds-favorites" className={Css.marginRight()} />
        <span className={Css.marginRight()}>
          <Number value={joke.averageRating} minDecimalDigits={1} maxDecimalDigits={1} />
        </span>
        <Icon icon="uugds-account-multi" className={Css.marginRight()} />
        <Number value={joke.ratingCount} />
      </span>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineContent };
export default InlineContent;
//@@viewOff:exports
