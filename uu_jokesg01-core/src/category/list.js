//@@viewOn:imports
import { createVisualComponent, withRouteParamsProvider } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import DataTypes from "uu_datatypesg01";
import Config from "./config/config.js";
import WorkspaceProvider from "../workspace/provider.js";
import PermissionProvider from "../workspace/permission-provider.js";
import ListProvider from "./list-provider.js";
import View from "./list/view.js";
import useSorterDefinitionList from "./list/use-sorter-definition-list.js";
import useSerieDefinitionList from "./list/use-serie-definition-list.js";
//@@viewOff:imports

let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  nestingLevel: View.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
    sorterList: ListProvider.propTypes.sorterList,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
    sorterList: [],
    serieList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { baseUri, sorterList, serieList, ...viewProps } = props;
    const sorterDefinitionList = useSorterDefinitionList({ sorterList });
    const mergedSorterList = Uu5Tiles.Utils.SorterList.mergeList(sorterList, sorterDefinitionList);

    const mergedSerieList = useSerieDefinitionList({ serieList });
    //@@viewOff:private

    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <PermissionProvider>
          <ListProvider sorterList={mergedSorterList} serieList={mergedSerieList} skipInitialLoad>
            <View {...viewProps} sorterDefinitionList={sorterDefinitionList} />
          </ListProvider>
        </PermissionProvider>
      </WorkspaceProvider>
    );
    //@@viewOff:render
  },
});

List = withRouteParamsProvider(List, {
  sorterList: DataTypes.arrayOf(
    DataTypes.exact({
      key: DataTypes.string,
      ascending: DataTypes.bool,
    }),
  ),
});

List._useSorterDefinitionList = useSorterDefinitionList;
List._useSerieDefinitionList = useSerieDefinitionList;

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
