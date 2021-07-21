//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import { Error } from "../core/core";
import Lsi from "./category-delete-modal-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryDeleteModal",
  //@@viewOff:statics
};

export const CategoryDeleteModal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    categoryDataObject: UU5.PropTypes.object,
    shown: UU5.PropTypes.bool,
    onCancel: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryDataObject: undefined,
    shown: false,
    onCancel: () => {},
    onDelete: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    async function handleDelete() {
      try {
        await props.categoryDataObject.handlerMap.delete();
        props.onDelete();
      } catch (error) {
        console.error(error);
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    if (!props.categoryDataObject) {
      return null;
    }

    const category = props.categoryDataObject.data;

    let content;

    switch (props.categoryDataObject.state) {
      case "pending":
        content = <UU5.Bricks.Loading />;
        break;
      case "error":
        content = <Error errorData={props.categoryDataObject.errorData} />;
        break;
      case "ready":
      default:
        content = <UU5.Bricks.Lsi lsi={Lsi.question} params={[category.name]} />;
    }

    const isPending = props.categoryDataObject.state === "pending";

    return (
      <UU5.Bricks.Modal
        header={<UU5.Bricks.Lsi lsi={Lsi.header} />}
        shown={props.shown}
        onClose={props.onCancel}
        stickyBackground={true}
        offsetTop="auto"
        location="portal"
      >
        <div className="center">
          {content}
          <UU5.Bricks.Div className={buttonRowCss()} disabled={isPending}>
            <UU5.Bricks.Button onClick={props.onCancel} className={buttonCss()}>
              <UU5.Bricks.Lsi lsi={Lsi.cancel} />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button onClick={handleDelete} className={buttonCss()} colorSchema="danger">
              <UU5.Bricks.Lsi lsi={Lsi.delete} />
            </UU5.Bricks.Button>
          </UU5.Bricks.Div>
        </div>
      </UU5.Bricks.Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:css
const buttonRowCss = () => Config.Css.css`
margin: 16px;
`;

const buttonCss = () => Config.Css.css`
margin: 8px;
`;
//@@viewOff:css

export default CategoryDeleteModal;
