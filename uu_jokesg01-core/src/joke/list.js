//@@viewOn:imports
import { createVisualComponent, PropTypes, withRouteParamsProvider } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import DataTypes from "uu_datatypesg01";
import Config from "./config/config.js";
import WorkspaceProvider from "../workspace/provider.js";
import PermissionProvider from "../workspace/permission-provider.js";
import ListProvider from "./list-provider.js";
import View from "./list/view.js";
import Filter from "../utils/filter.js";
import useFilterDefinitionList from "./list/use-filter-definition-list.js";
import usePermission from "../workspace/use-permission.js";
import Joke from "../utils/joke.js";
import useSorterDefinitionList from "./list/user-sorter-definition-list.js";
//@@viewOff:imports

//@@viewOn:helpers
function DefinitionProvider({ filterList, filterMap, sorterList, children }) {
  const permission = usePermission();

  const propFilterList = filterMap ? Filter.convertMap2List(filterMap) : filterList;
  const filterDefinitionList = useFilterDefinitionList(permission, { filterList: propFilterList });
  let mergedFilterList = Uu5Tiles.Utils.FilterList.mergeList(propFilterList, filterDefinitionList);

  const sorterDefinitionList = useSorterDefinitionList({ sorterList });
  const mergedSorterList = Uu5Tiles.Utils.SorterList.mergeList(sorterList, sorterDefinitionList);

  return children({
    filterList: mergedFilterList,
    filterDefinitionList,
    sorterList: mergedSorterList,
    sorterDefinitionList,
  });
}
//@@viewOff:helpers

let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  nestingLevel: View.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
    filterMap: PropTypes.object,
    filterList: ListProvider.propTypes.filterList,
    sorterList: ListProvider.propTypes.sorterList,
    onFilterListChange: ListProvider.propTypes.onFilterListChange,
    onSorterListChange: ListProvider.propTypes.onSorterListChange,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
    filterList: [],
    sorterList: [],
  },
  //@@viewOff:defaultProps

  render({
    baseUri,
    filterList,
    filterMap,
    sorterList,
    onFilterListChange,
    onSorterListChange,
    nestingLevel,
    ...viewProps
  }) {
    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <PermissionProvider>
          <DefinitionProvider filterList={filterList} filterMap={filterMap} sorterList={sorterList}>
            {({ filterList, filterDefinitionList, sorterList, sorterDefinitionList }) => (
              <ListProvider
                filterList={filterList}
                sorterList={sorterList}
                onFilterListChange={onFilterListChange}
                onSorterListChange={onSorterListChange}
                pageSize={["inline", "spot", "box"].includes(nestingLevel) ? 100 : 100} // Now it is 100 for both variants because there is bug in UuTilesElements.Grid
                skipInitialLoad
              >
                <View
                  {...viewProps}
                  nestingLevel={nestingLevel}
                  filterDefinitionList={filterDefinitionList}
                  sorterDefinitionList={sorterDefinitionList}
                />
              </ListProvider>
            )}
          </DefinitionProvider>
        </PermissionProvider>
      </WorkspaceProvider>
    );
    //@@viewOff:render
  },
});

List = withRouteParamsProvider(List, {
  filterMap: DataTypes.exact({
    [Joke.Filter.Keys.VISIBILITY]: DataTypes.string,
    [Joke.Filter.Keys.CATEGORY_ID_LIST]: DataTypes.arrayOf(DataTypes.string),
  }),
  sorterList: DataTypes.arrayOf(
    DataTypes.exact({
      key: DataTypes.string,
      ascending: DataTypes.bool,
    }),
  ),
});

List._useFilterDefinitionList = useFilterDefinitionList;
List._useSorterDefinitionList = useSorterDefinitionList;

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
