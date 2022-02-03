//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { Modal, Icon } from "uu5g05-elements";
import Config from "../config/config";
import ContentView from "../detail-view/content-view";
//@@viewOff:imports

export const DetailModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DetailModal",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    categoryList: PropTypes.array.isRequired,
    baseUri: PropTypes.string,
    header: PropTypes.object,
    shown: PropTypes.bool,
    showCopyComponent: PropTypes.bool,
    showDelete: PropTypes.bool,
    onClose: PropTypes.func,
    onCopyComponent: PropTypes.func,
    onUpdate: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
    onDelete: PropTypes.func,
    colorSchema: PropTypes.string,
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
      <Modal
        header={<Header header={props.header} joke={props.jokeDataObject.data} />}
        open={props.shown}
        onClose={props.onClose}
        actionList={props.actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
      >
        <ContentView
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
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function Header({ header, joke }) {
  return (
    <>
      {joke && !joke.visibility && <Icon className={visibilityCss()} icon="mdi-eye-off" />}
      <Lsi lsi={header} />
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

export default DetailModal;
