//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import ListProvider from "../list-provider.js";
import View from "./view";
import Category from "../../utils/category.js";
//@@viewOff:imports

const Input = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Input",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: ListProvider.propTypes.baseUri,
    sorterList: ListProvider.propTypes.sorterList,
    onSorterListChange: ListProvider.propTypes.onSorterListChange,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    sorterList: [{ key: Category.Sorter.Keys.NAME, ascending: true }],
  },
  //@@viewOff:defaultProps

  render({ baseUri, sorterList, onSorterListChange, ...viewProps }) {
    //@@viewOn:render
    return (
      <ListProvider baseUri={baseUri} sorterList={sorterList} onSorterListChange={onSorterListChange}>
        <View {...viewProps} />
      </ListProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Input };
export default Input;
//@@viewOff:exports
