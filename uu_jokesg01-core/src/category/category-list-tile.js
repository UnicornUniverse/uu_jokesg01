//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Css from "./category-list-tile-css.js";
//@@viewOff:imports

// TODO LACO The tile doesn't look as expected. Do it according reference demo application.
// https://uuapp.plus4u.net/uu-jokes-maing01/4ef6a7b01b5942ecbfb925b249af987f/categoryManagement
// TODO LACO There is different icon when hovering over tile but it doesn't make sence if there is no detail modal

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryListTile",
  //@@viewOff:statics
};

export const TILE_HEIGHT = Css.TILE_HEIGHT;

export const CategoryListTile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryDataObject: UU5.PropTypes.object.isRequired,
    colorSchema: UU5.PropTypes.string,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryDataObject: undefined,
    colorSchema: undefined,
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const category = props.categoryDataObject.data;

    function handleUpdate() {
      props.onUpdate(props.categoryDataObject);
    }

    function handleDelete() {
      props.onDelete(props.categoryDataObject);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (!category) {
      return null;
    }
    const canManage = props.jokesPermission.category.canManage();
    const actionsDisabled = props.categoryDataObject.state === "pending";

    return (
      <div className={Css.main()}>
        <div className={Css.header()}>{category.name}</div>
        <div className={Css.content()}>
          <div className={Css.icon()}>
            <UU5.Bricks.Icon icon={category.icon} className={Css.icon()} />
          </div>
        </div>
        <div className={Css.footer()}>
          {canManage && (
            <div>
              <UU5.Bricks.Icon
                icon="mdi-pencil"
                className={Css.icon()}
                mainAttrs={{ onClick: handleUpdate }}
                disabled={actionsDisabled}
              />
              <UU5.Bricks.Icon
                icon="mdi-delete"
                className={Css.icon()}
                mainAttrs={{ onClick: handleDelete }}
                disabled={actionsDisabled}
              />
            </div>
          )}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

export default CategoryListTile;
