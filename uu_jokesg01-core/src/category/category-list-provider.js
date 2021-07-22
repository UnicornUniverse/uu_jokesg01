//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import CategoryListContext from "./category-list-view/category-list-context";
//@@viewOff:imports

// Number of items in useDataList, it is more than server maximum number of categories
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
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <CategoryListContext.Provider value={categoryDataList}>
        {typeof props.children === "function" ? props.children(categoryDataList) : props.children}
      </CategoryListContext.Provider>
    );
    //@@viewOff:render
  },
});

export default CategoryListProvider;
