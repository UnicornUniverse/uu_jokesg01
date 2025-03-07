//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { withReusedParentProvider } from "uu_plus4u5g02";
import Config from "./config/config.js";
import { JokeListContext, useJokeList } from "./use-joke-list.js";
import useListProvider from "./use-list-provider.js";
//@@viewOff:imports

let ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    filterList: PropTypes.array,
    sorterList: PropTypes.array,
    onFilterListChange: PropTypes.func,
    onSorterListChange: PropTypes.func,
    skipInitialLoad: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, ...providerProps } = props;
    const value = useListProvider(providerProps);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <JokeListContext.Provider value={value}>
        {typeof children === "function" ? children(value) : children}
      </JokeListContext.Provider>
    );
    //@@viewOff:render
  },
});

ListProvider = withReusedParentProvider(ListProvider, (props) => {
  const parentValue = useJokeList();

  if (!parentValue) {
    return;
  }

  if (props.baseUri && props.baseUri !== parentValue.baseUri) {
    return;
  }

  return parentValue;
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
