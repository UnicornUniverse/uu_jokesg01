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

  // ISSUE Uu5Tiles.Utils.FilterList.mergeList - doesn't remove items from value when missing in definition
  // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6773ce0086b1a10034c7b13c
  if (permission.joke.canUpdateVisibility() === false) {
    mergedFilterList = mergedFilterList.filter((item) => item.key !== Joke.Filter.Keys.VISIBILITY);
  }

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
    filterList: ListProvider.propTypes.filterList,
    sorterList: ListProvider.propTypes.sorterList,
    filterMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
    filterList: [],
    sorterList: [],
  },
  //@@viewOff:defaultProps

  render({ baseUri, filterList, filterMap, sorterList, ...viewProps }) {
    //@@viewOn:render
    return (
      <WorkspaceProvider baseUri={baseUri}>
        <PermissionProvider>
          <DefinitionProvider filterList={filterList} filterMap={filterMap} sorterList={sorterList}>
            {({ filterList, filterDefinitionList, sorterList, sorterDefinitionList }) => (
              <ListProvider skipInitialLoad filterList={filterList} sorterList={sorterList}>
                <View
                  {...viewProps}
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
