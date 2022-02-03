//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Icon, Text } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

export const Tile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Tile",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokesPermission: PropTypes.object.isRequired,
    colorSchema: PropTypes.string,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
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
    const attrs = Utils.VisualComponent.getAttrs(props, mainCss());

    return (
      <div {...attrs}>
        <Text className={iconCss()} colorScheme={props.colorScheme}>
          <Icon icon={category.icon} />
        </Text>

        <Text className={textCss()} colorScheme={props.colorScheme}>
          {category.name}
        </Text>

        {canManage && (
          <>
            <Icon className={buttonCss()} icon="mdi-pencil" onClick={handleUpdate} disabled={actionsDisabled} />
            <Icon className={buttonCss()} icon="mdi-delete" onClick={handleDelete} disabled={actionsDisabled} />
          </>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
export const TILE_HEIGHT = 40; // px

const mainCss = () => Config.Css.css`
display: flex;
align-items: center;
height: ${TILE_HEIGHT}px;
border-radius: 4px;
border: 1px solid #bdbdbd;
`;

const textCss = () => Config.Css.css`
flex-grow: 1;
font-size: 16px;
font-weight: bold;
`;

const iconCss = () => Config.Css.css`
font-size: 20px;
margin: 10px;
`;

const buttonCss = () => Config.Css.css`
font-size: 20px;
color: rgba(0, 0, 0, 0.54);
cursor: pointer;
margin-right: 10px;
`;
//@@viewOff:css

export default Tile;
