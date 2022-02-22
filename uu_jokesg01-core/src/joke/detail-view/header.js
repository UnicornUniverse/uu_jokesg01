//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Lsi } from "uu5g05";
import { Icon, Text, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const Css = {
  visibilityIcon: ({ spaceC }) => Config.Css.css({ marginRight: spaceC }),
};

export const VisibilityIcon = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "VisibilityIcon",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.string.isRequired,
    joke: PropTypes.object,
    background: Text.propTypes.background,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    joke: null,
    background: Text.defaultProps.background,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);

    return (
      <Text {...elementProps}>
        {props.joke && !props.joke.visibility && (
          <Text significance="subdued" colorScheme="building" background={props.background}>
            <Icon icon="mdi-eye-off" className={Css.visibilityIcon(spacing)} background={props.background} />
          </Text>
        )}
        <Lsi lsi={props.header} />
        {props.joke && ` - ${props.joke.name}`}
      </Text>
    );
    //@@viewOff:render
  },
});

export default VisibilityIcon;
