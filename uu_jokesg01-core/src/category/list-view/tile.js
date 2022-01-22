//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Icon } from "uu5g05-elements";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tile",
  //@@viewOff:statics
};

export const Tile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokesPermission: PropTypes.object.isRequired,
    categoryDataObject: PropTypes.object.isRequired,
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
    function handleUpdate() {
      props.onUpdate(props.categoryDataObject);
    }

    function handleDelete() {
      props.onDelete(props.categoryDataObject);
    }
    //@@viewOff:private

    //@@viewOn:render
    const category = props.categoryDataObject.data;
    const canManage = props.jokesPermission.category.canManage();
    const actionsDisabled = props.categoryDataObject.state === "pending";
    const attrs = Utils.VisualComponent.getAttrs(props, mainCss());

    return (
      <div {...attrs}>
        <span className={iconCss()} colorSchema={props.colorSchema}>
          <Icon icon={category.icon} />
        </span>

        <span className={textCss()} colorSchema={props.colorSchema}>
          {category.name}
        </span>

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
