//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
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
    jokesPermission: UU5.PropTypes.object.isRequired,
    categoryDataObject: UU5.PropTypes.object.isRequired,
    colorSchema: UU5.PropTypes.string,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props, mainCss());

    return (
      <div {...attrs}>
        <UU5.Bricks.Text className={iconCss()} colorSchema={props.colorSchema}>
          <UU5.Bricks.Icon icon={category.icon} />
        </UU5.Bricks.Text>

        <UU5.Bricks.Text className={textCss()} colorSchema={props.colorSchema}>
          {category.name}
        </UU5.Bricks.Text>

        {canManage && (
          <>
            <UU5.Bricks.Icon
              className={buttonCss()}
              icon="mdi-pencil"
              mainAttrs={{ onClick: handleUpdate }}
              disabled={actionsDisabled}
            />
            <UU5.Bricks.Icon
              className={buttonCss()}
              icon="mdi-delete"
              mainAttrs={{ onClick: handleDelete }}
              disabled={actionsDisabled}
            />
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
