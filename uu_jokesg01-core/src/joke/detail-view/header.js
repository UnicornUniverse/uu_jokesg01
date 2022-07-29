//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, useLsi } from "uu5g05";
import { Icon, Text, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const Css = {
  visibilityIcon: (spacing) => Config.Css.css({ marginRight: spacing.b }),
};

export const Header = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Header",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object,
    hideTypeName: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
    hideTypeName: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const lsi = useLsi(importLsi, [Header.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const isSeparator = !props.hideTypeName && props.joke;

    return (
      <Text {...elementProps}>
        {props.joke && !props.joke.visibility && (
          <Text significance="subdued" colorScheme="building">
            <Icon icon="mdi-eye-off" className={Css.visibilityIcon(spacing)} />
          </Text>
        )}
        {!props.hideTypeName && lsi.typeName}
        {isSeparator && ` - `}
        {props.joke && props.joke.name}
      </Text>
    );
    //@@viewOff:render
  },
});

export default Header;
