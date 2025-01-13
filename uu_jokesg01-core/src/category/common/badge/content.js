//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Badge } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:helpers
function InlineContent({ category, ...propsToPass }) {
  const attrs = Utils.VisualComponent.getAttrs(propsToPass);

  return <span {...attrs}>{category.name}</span>;
}

function SpotContent({ category, ...propsToPass }) {
  return (
    <Badge {...propsToPass} icon={category.icon}>
      {category.name}
    </Badge>
  );
}
//@@viewOff:helpers

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  nestingLevel: ["spot", "inline"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ nestingLevel, ...propsToPass }) {
    //@@viewOn:private
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel({ nestingLevel }, Content);
    //@@viewOff:private

    //@@viewOn:render
    switch (currentNestingLevel) {
      case "spot":
        return <SpotContent {...propsToPass} />;
      case "inline":
      default:
        return <InlineContent {...propsToPass} />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
