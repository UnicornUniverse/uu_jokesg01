//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PropertyErrorView",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const PropertyErrorView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const className = Config.Css.css`padding-top: 20px;text-align: center`;
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    switch (currentNestingLevel) {
      case "box":
        return (
          <UU5.Bricks.Card colorSchema="danger" elevation={0} elevationHover={0} {...attrs}>
            {props.children}
            <UU5.Bricks.Text className={Config.Css.css`font-size: 65px;`}>
              <UU5.Bricks.Icon icon="mdi-bug" />
            </UU5.Bricks.Text>
          </UU5.Bricks.Card>
        );
      case "inline":
      default:
        return (
          <UU5.Bricks.Text nestingLevel={currentNestingLevel} {...attrs} colorSchema="danger">
            <UU5.Bricks.Icon icon="mdi-bug" />
            {props.children}
          </UU5.Bricks.Text>
        );
    }
    //@@viewOff:render
  },
});

export default PropertyErrorView;
