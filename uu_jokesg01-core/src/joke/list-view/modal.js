//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Content from "./content";
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
    header: UU5.PropTypes.object.isRequired,
    help: UU5.PropTypes.object.isRequired,
    jokeDataList: UU5.PropTypes.object.isRequired,
    jokesDataObject: UU5.PropTypes.object.isRequired,
    jokesPermission: UU5.PropTypes.object.isRequired,
    baseUri: UU5.PropTypes.string,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
    onLoad: UU5.PropTypes.func,
    onLoadNext: UU5.PropTypes.func,
    onReload: UU5.PropTypes.func,
    onCreate: UU5.PropTypes.func,
    onDetail: UU5.PropTypes.func,
    onUpdate: UU5.PropTypes.func,
    onDelete: UU5.PropTypes.func,
    onAddRating: UU5.PropTypes.func,
    onUpdateVisibility: UU5.PropTypes.func,
    onClose: UU5.PropTypes.func,
    shown: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    header: undefined,
    help: undefined,
    jokeDataList: undefined,
    jokesDataObject: undefined,
    jokesPermission: undefined,
    baseUri: undefined,
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    showCopyComponent: true,
    onCopyComponent: () => {},
    onLoad: () => {},
    onLoadNext: () => {},
    onReload: () => {},
    onCreate: () => {},
    onDetail: () => {},
    onUpdate: () => {},
    onDelete: () => {},
    onAddRating: () => {},
    onUpdateVisibility: () => {},
    onClose: () => {},
    shown: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return (
      <UU5.Bricks.Modal
        header={<UU5.Bricks.Lsi lsi={props.header} />}
        shown={props.shown}
        onClose={props.onClose}
        stickyBackground={false}
        location="portal"
        size="max"
      >
        <Content
          data={props.jokeDataList.data}
          categoryList={props.jokesDataObject.data.categoryList}
          pageSize={props.jokeDataList.pageSize}
          baseUri={props.baseUri}
          jokesPermission={props.jokesPermission}
          onLoad={props.onLoad}
          onLoadNext={props.onLoadNext}
          onReload={props.onReload}
          onCreate={props.onCreate}
          onDetail={props.onDetail}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
          onAddRating={props.onAddRating}
          onUpdateVisibility={props.onUpdateVisibility}
          onCopyComponent={props.onCopyComponent}
          showCopyComponent={props.showCopyComponent}
          nestingLevel={currentNestingLevel}
        />
      </UU5.Bricks.Modal>
    );
    //@@viewOff:render
  },
});

export default Modal;