//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
import Config from "./config/config";
import ContentView, { getContentHeight } from "./content-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  //@@viewOff:statics
};

export const Content = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    header: PropTypes.object.isRequired,
    help: PropTypes.object.isRequired,
    jokeDataList: PropTypes.object.isRequired,
    jokesDataObject: PropTypes.object.isRequired,
    awscDataObject: PropTypes.object.isRequired,
    jokesPermission: PropTypes.object.isRequired,
    baseUri: PropTypes.string,
    rowCount: PropTypes.number,
    bgStyle: PropTypes.string,
    cardView: PropTypes.string,
    colorSchema: PropTypes.string,
    elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isHome: PropTypes.bool,
    contextType: PropTypes.oneOf(["none", "basic", "full"]),
    showCopyComponent: PropTypes.bool,
    onCopyComponent: PropTypes.func,
    onLoad: PropTypes.func,
    onLoadNext: PropTypes.func,
    onReload: PropTypes.func,
    onCreate: PropTypes.func,
    onDetail: PropTypes.func,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onAddRating: PropTypes.func,
    onUpdateVisibility: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    bgStyle: "transparent",
    cardView: "full",
    colorSchema: "default",
    elevation: 1,
    borderRadius: "0",
    isHome: false,
    contextType: "basic",
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
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const { jokeDataList, jokesDataObject, ...viewProps } = props;

    return (
      <ContentView
        {...viewProps}
        data={props.jokeDataList.data}
        categoryList={props.jokesDataObject.data.categoryList}
        pageSize={props.jokeDataList.pageSize}
      />
    );
    //@@viewOff:render
  },
});

export { getContentHeight };

export default Content;
