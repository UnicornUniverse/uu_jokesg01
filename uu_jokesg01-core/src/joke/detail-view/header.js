//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi } from "uu5g05";
import { Icon, Text, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
import LsiData from "./header-lsi";
//@@viewOff:imports

const Css = {
  visibilityIcon: ({ spaceC }) => Config.Css.css({ marginRight: spaceC }),
};

export const Header = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Header",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    joke: PropTypes.object,
    background: Text.propTypes.background,
    hideTypeName: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
    background: Text.defaultProps.background,
    hideTypeName: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const isSeparator = !props.hideTypeName && props.joke;

    return (
      <Text {...elementProps}>
        {props.joke && !props.joke.visibility && (
          <Text significance="subdued" colorScheme="building" background={props.background}>
            <Icon icon="mdi-eye-off" className={Css.visibilityIcon(spacing)} background={props.background} />
          </Text>
        )}
        {!props.hideTypeName && <Lsi lsi={LsiData.typeName} />}
        {isSeparator && ` - `}
        {props.joke && props.joke.name}
      </Text>
    );
    //@@viewOff:render
  },
});

export default Header;
