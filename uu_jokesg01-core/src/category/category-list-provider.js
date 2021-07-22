//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import CategoryListContext from "./category-list-context";
//@@viewOff:imports

// TODO LACO Const pageSize move here, rename it to PAGE_SIZE and add comment with description

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
    const pageSize = 200;
    const categoryDataList = useDataList({
      pageSize,
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

    // TODO LACO Rename it to criteriaRef, it can hold filters in future
    const orderRef = useRef({});

    function handleLoad(criteria) {
      orderRef.current = criteria;
      return Calls.Category.list(criteria, props.baseUri);
    }

    function handleReload() {
      // TODO LACO Fix it according JokeListProvider
      categoryDataList.handlerMap.load(orderRef.current);
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
      if (categoryDataList.handlerMap.load) {
        // TODO LACO Remove it and don't use debugger!
        // TODO LACO Refactor this effect according JokeListProvider
        debugger;
        categoryDataList.handlerMap.load().catch((error) => console.error(error));
      }
    }, [props.baseUri]);

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
