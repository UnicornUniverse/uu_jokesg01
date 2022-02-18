//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { Modal, Icon, useSpacing } from "uu5g05-elements";
import Config from "../config/config";
import ContentView from "../detail-view/content-view";
//@@viewOff:imports

const Css = {
  content: ({ spaceB }) => Config.Css.css({ marginTop: -spaceB }),
};

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
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const { header, shown, onClose, actionList, ...contentProps } = props;
    const headerElement = <Header header={header} joke={props.jokeDataObject.data} />;

    return (
      <Modal
        header={headerElement}
        open={shown}
        onClose={onClose}
        actionList={actionList}
        // ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6182ef94513f0b0029ced0a1
        // Disabled property cannot be set for the whole Modal now.
        disabled={props.disabled}
        closeOnOverlayClick
      >
        <ContentView {...contentProps} className={Css.content(spacing)} />
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
