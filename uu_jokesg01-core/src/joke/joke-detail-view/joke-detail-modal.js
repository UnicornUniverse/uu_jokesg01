//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config";
import JokeDetailContent from "./joke-detail-content";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "JokeDetailModal",
  //@@viewOff:statics
};

export const JokeDetailModal = createVisualComponent({
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    jokeDataObject: undefined,
    jokesPermission: undefined,
    categoryList: [],
    baseUri: undefined,
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
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UU5.Bricks.Modal
        header={<Header header={props.header} joke={props.jokeDataObject.data} />}
        shown={props.shown}
        onClose={props.onClose}
        stickyBackground={false}
        offsetTop="auto"
        location="portal"
      >
        <JokeDetailContent
          jokeDataObject={props.jokeDataObject}
          jokesPermission={props.jokesPermission}
          categoryList={props.categoryList}
          baseUri={props.baseUri}
          colorSchema={props.colorSchema}
          onAddRating={props.onAddRating}
          onUpdate={props.onUpdate}
          onUpdateVisibility={props.onUpdateVisibility}
          onCopyComponent={props.onCopyComponent}
          onDelete={props.onDelete}
          showCopyComponent={props.showCopyComponent}
          showDelete={props.showDelete}
        />
      </UU5.Bricks.Modal>
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

export default JokeDetailModal;
