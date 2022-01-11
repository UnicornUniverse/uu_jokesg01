//@@viewOn:imports
import UU5 from "uu5g04";
import Uu5Elements from "uu5g05-elements";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import Content from "../detail-view/content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Modal",
  //@@viewOff:statics
};

export const Modal = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    categoryList: UU5.PropTypes.array.isRequired,
    baseUri: UU5.PropTypes.string,
    header: UU5.PropTypes.object,
    shown: UU5.PropTypes.bool,
    showCopyComponent: UU5.PropTypes.bool,
    showDelete: UU5.PropTypes.bool,
    onClose: UU5.PropTypes.func,
    onCopyComponent: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    colorSchema: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    categoryList: [],
    header: "",
    shown: false,
    showCopyComponent: true,
    showDelete: false,
    onClose: () => {},
    onCopyComponent: () => {},
    onUpdate: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onDelete: () => {},
    colorSchema: "default",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5Elements.Modal
        header={<Header header={props.header} joke={props.jokeDataObject.data} />}
        open={props.shown}
        onClose={props.onClose}
        actionList={props.actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <Content
          jokeDataObject={props.jokeDataObject}
          jokesPermission={props.jokesPermission}
          categoryList={props.categoryList}
          baseUri={props.baseUri}
          colorSchema={props.colorSchema}
          bgStyle={props.bgStyle}
          onAddRating={props.onAddRating}
          onUpdate={props.onUpdate}
          onUpdateVisibility={props.onUpdateVisibility}
          onCopyComponent={props.onCopyComponent}
          onDelete={props.onDelete}
          showCopyComponent={props.showCopyComponent}
          showDelete={props.showDelete}
          disabled={props.disabled}
        />
      </Uu5Elements.Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Header({ header, joke }) {
  return (
    <>
      {joke && !joke.visibility && <UU5.Bricks.Icon className={visibilityCss()} icon="mdi-eye-off" />}
      <UU5.Bricks.Lsi lsi={header} />
      &nbsp;
      {joke && ` - ${joke.name}`}
    </>
  );
}

const visibilityCss = () => Config.Css.css`
  color: rgba(0,0,0,0.34);
  margin-right: 8px;
`;
//@@viewOff:helpers

export default Modal;
