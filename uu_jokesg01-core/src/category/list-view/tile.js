//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Icon, Text, Button, Box, useSpacing } from "uu5g05-elements";
import Config from "./config/config";
import LsiData from "./tile-lsi";
//@@viewOff:imports

//@@viewOn:css
export const TILE_HEIGHT = 40; // px

const Css = {
  main: ({ spaceB, spaceC }) =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      height: TILE_HEIGHT,
      paddingLeft: spaceB,
      paddingRight: spaceC,
    }),
  text: () =>
    Config.Css.css({
      flexGrow: 1,
    }),
  icon: ({ spaceC }) =>
    Config.Css.css({
      marginRight: spaceC,
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
  defaultProps: {
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    const { data: categoryDataObject } = props;

    function handleUpdate() {
      props.onUpdate(categoryDataObject);
    }

    function handleDelete() {
      props.onDelete(categoryDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const category = categoryDataObject.data;
    const canManage = props.jokesPermission.category.canManage();
    const actionsDisabled = categoryDataObject.state === "pending";
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main(spacing));

    return (
      <Box {...elementProps} significance="subdued" borderRadius="elementary">
        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.icon(spacing)}>
          <Icon icon={category.icon} />
        </Text>

        <Text category="interface" segment="title" type="minor" colorScheme="building" className={Css.text()}>
          {category.name}
        </Text>

        {canManage && (
          <>
            <Button
              icon="mdi-pencil"
              onClick={handleUpdate}
              disabled={actionsDisabled}
              tooltip={LsiData.update}
              significance="subdued"
            />
            <Button
              icon="mdi-delete"
              onClick={handleDelete}
              disabled={actionsDisabled}
              tooltip={LsiData.delete}
              significance="subdued"
            />
          </>
        )}
      </Box>
    );
    //@@viewOff:render
  },
});

export default Tile;
