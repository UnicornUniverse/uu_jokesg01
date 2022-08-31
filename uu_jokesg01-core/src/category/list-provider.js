//@@viewOn:imports
import { createComponent, PropTypes, useDataList, useEffect, useRef, useMemo } from "uu5g05";
import Calls from "calls";
import Config from "./config/config";
import ListContext from "./list-context";
//@@viewOff:imports

// HINT: The maxNoI of schema category is 128. There is maximum of 128 categories per awid.
// Therefore we use pageSize bigger than maxNoI to load all categories by first initial call
// to optimize performance. Such strategy can be used for schemas with small maxNoI (< 1000).
const PAGE_SIZE = 200;

//@@viewOn:helpers
function getLoadDtoIn(filterList, sorterList, pageInfo, projection, disableTotal) {
  const filters = filterList.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

  let dtoIn = { ...filters, projection };

  if (pageInfo) {
    dtoIn.pageInfo = pageInfo;
  } else {
    dtoIn.pageInfo = {};
  }

  if (disableTotal) {
    dtoIn.pageInfo.total = -1;
  }

  const sorter = sorterList?.at(0);

  if (sorter) {
    dtoIn.order = sorter.ascending ? "asc" : "desc";
  } else {
    dtoIn.order = "asc";
  }

  return dtoIn;
}
//@@viewOff:helpers

export const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    skipInitialLoad: PropTypes.bool,
    disableTotal: PropTypes.bool,
    projection: PropTypes.shape({
      name: PropTypes.bool,
      icon: PropTypes.bool,
    }),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipInitialLoad: false,
    projection: undefined,
    disableTotal: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const categoryDataList = useDataList({
      pageSize: PAGE_SIZE,
      handlerMap: {
        load: handleLoad,
        reload: handleReload,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: handleUpdate,
        delete: handleDelete,
      },
      skipInitialLoad: props.skipInitialLoad,
    });

    const prevPropsRef = useRef(props);
    const filterList = useRef([]);
    const sorterList = useRef([]);

    function handleLoad(criteria) {
      filterList.current = criteria?.filterList || [];
      sorterList.current = criteria?.sorterList || [];
      const dtoIn = getLoadDtoIn(
        filterList.current,
        sorterList.current,
        criteria?.pageInfo,
        props.projection,
        props.disableTotal
      );
      return Calls.Category.list(dtoIn, props.baseUri);
    }

    function handleReload() {
      return categoryDataList.handlerMap.load({ filterList: filterList.current, sorterList: sorterList.current });
    }

    function handleCreate(values) {
      return Calls.Category.create(values, props.baseUri);
    }

    function handleUpdate(values) {
      return Calls.Category.update(values, props.baseUri);
    }

    function handleDelete(category) {
      const dtoIn = { id: category.id };
      return Calls.Category.delete(dtoIn, props.baseUri);
    }

    useEffect(() => {
      async function checkPropsAndReload() {
        // No change of baseUri = no reload is required
        if (prevPropsRef.current.baseUri === props.baseUri) {
          return;
        }

        // If there is another operation pending = we can't reload data
        if (!categoryDataList.handlerMap.load) {
          return;
        }

        try {
          prevPropsRef.current = props;
          await categoryDataList.handlerMap.load();
        } catch (error) {
          ListProvider.logger.error("Error while reloading data.", error);
        }
      }

      checkPropsAndReload();
    }, [props, categoryDataList]);

    const value = useMemo(() => {
      return { categoryDataList, filterList: filterList.current, sorterList: sorterList.current };
    }, [categoryDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ListProvider;
