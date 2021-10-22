//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef, useMemo } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import ListContext from "./list-context";
//@@viewOff:imports

// HINT: The maxNoI of schema category is 128. There is maximum of 128 categories per awid.
// Therefore we use pageSize bigger than maxNoI to load all categories by first initial call
// to optimize performance. Such strategy can be used for schemas with small maxNoI (< 1000).
const PAGE_SIZE = 200;

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "CategoryListProvider",
  //@@viewOff:statics
};

export const CategoryListProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
    skipInitialLoad: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipInitialLoad: false,
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

    const criteriaRef = useRef({});
    const prevPropsRef = useRef(props);

    function handleLoad(criteria) {
      criteriaRef.current = criteria;
      return Calls.Category.list(criteria, props.baseUri);
    }

    function handleReload() {
      return categoryDataList.handlerMap.load(criteriaRef.current);
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
          console.error(error);
        }
      }

      checkPropsAndReload();
    }, [props, categoryDataList]);

    // HINT: Data are wrapped by object for future expansion of values with backward compatibility
    const value = useMemo(() => {
      return { categoryDataList };
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

export default CategoryListProvider;
