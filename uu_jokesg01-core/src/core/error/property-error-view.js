//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { Box, Icon, Text } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PropertyErrorView",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = Utils.VisualComponent.getAttrs(props, className);

    switch (currentNestingLevel) {
      case "box":
        return (
          <Box significance="distinct" colorScheme="negative" className={className}>
            {props.children}
            <div className={Config.Css.css`font-size: 65px;`}>
              <Icon icon="mdi-bug" colorScheme="negative" />
            </div>
          </Box>
        );
      case "inline":
      default:
        return (
          <Text nestingLevel={currentNestingLevel} {...attrs} colorScheme="negative">
            <Icon icon="mdi-bug" />
            {props.children}
          </Text>
        );
    }
    //@@viewOff:render
  },
});

export default PropertyErrorView;
