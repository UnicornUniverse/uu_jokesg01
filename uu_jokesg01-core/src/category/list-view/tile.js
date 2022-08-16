//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import Uu5Elements, { Icon, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  icon: (spacing) =>
    Config.Css.css({
      marginRight: spacing.b,
    }),
};
//@@viewOff:css

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const { data: categoryDataObject } = props;
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props);
    const category = categoryDataObject.data;

    const headerElement = (
      <>
        <Icon icon={category.icon} className={Css.icon(spacing)} />
        {category.name}
      </>
    );

    return (
      <Uu5Elements.Tile
        {...elementProps}
        header={headerElement}
        actionList={props.onGetItemActions(categoryDataObject)}
        significance="subdued"
        borderRadius="elementary"
      />
    );
    //@@viewOff:render
  },
});

export default Tile;
