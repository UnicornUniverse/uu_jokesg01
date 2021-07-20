//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import { JokesProvider, JokesPermissionProvider } from "../jokes/jokes";
import CategoryListProvider from "./category-list-provider";
import CategoryListView from "./category-list-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryList",
  nestingLevel: "boxCollection",
  //@@viewOff:statics
};

export const CategoryList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: UU5.PropTypes.string,
    rowCount: UU5.PropTypes.number,
    bgStyle: UU5.PropTypes.string,
    cardView: UU5.PropTypes.string,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    showCopyComponent: UU5.PropTypes.bool,
    onCopyComponent: UU5.PropTypes.func,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    return (
      <JokesProvider baseUri={props.baseUri}>
        {(jokesDataObject) => (
          <JokesPermissionProvider profileList={jokesDataObject.data?.authorizedProfileList}>
            {(jokesPermission) => (
              <CategoryListProvider baseUri={props.baseUri}>
                {(categoryDataList) => (
                  <CategoryListView
                    jokesDataObject={jokesDataObject}
                    categoryDataList={categoryDataList}
                    jokesPermission={jokesPermission}
                    baseUri={props.baseUri}
                    rowCount={props.rowCount}
                    bgStyle={props.bgStyle}
                    cardView={props.cardView}
                    colorSchema={props.colorSchema}
                    elevation={props.elevation}
                    borderRadius={props.borderRadius}
                    showCopyComponent={props.showCopyComponent}
                    onCopyComponent={props.onCopyComponent}
                    {...attrs}
                  />
                )}
              </CategoryListProvider>
            )}
          </JokesPermissionProvider>
        )}
      </JokesProvider>
    );
    //@@viewOff:render
  },
});

export default CategoryList;
