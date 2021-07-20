//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList, useEffect, useRef } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import CategoryListContext from "./category-list-context";
//@@viewOff:imports

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
    id: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    id: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const categoryDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        reload: handleReload,
        create: handleCreate,
        update: handleUpdate,
        delete: handleDelete,
      },
    });

    const orderRef = useRef({});

    function handleLoad(criteria) {
      orderRef.current = criteria;
      return Calls.Category.list(criteria, props.baseUri);
    }

    function handleLoadNext(pageInfo) {
      const dtoIn = { ...orderRef.current, pageInfo };
      return Calls.Category.list(dtoIn, props.baseUri);
    }

    function handleReload() {
      categoryDataList.handlerMap.load(orderRef.current);
    }

    function handleCreate(values) {
      return Calls.Category.create(values, props.baseUri);
    }

    function handleUpdate(category, values) {
      const dtoIn = { id: category.id, ...values };
      return Calls.Category.update(dtoIn, props.baseUri);
    }

    function handleDelete(joke) {
      const dtoIn = { id: joke.id };
      return Calls.Category.delete(dtoIn, props.baseUri);
    }

    useEffect(() => {
      if (categoryDataList.handlerMap.load) {
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
