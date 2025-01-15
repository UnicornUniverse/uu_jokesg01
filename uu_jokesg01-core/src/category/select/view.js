//@@viewOn:imports
import { createVisualComponent, useMemo } from "uu5g05";
import { Skeleton } from "uu5g05-elements";
import { Select } from "uu5g05-forms";
import Config from "./config/config.js";
import DataObject from "../../utils/data-object.js";
import useCategoryList from "../use-category-list.js";
//@@viewOff:imports

//@@viewOn:helpers
const propTypes = { ...Select.propTypes };
delete propTypes.itemList;

const defaultProps = { ...Select.defaultProps };
delete defaultProps.itemList;

function getPendingItemList() {
  const itemList = [];

  // The 7 Skeleton components will use max. allowed height by filter popover.
  for (let i = 0; i <= 7; i++) {
    itemList.push({
      value: i,
      children: <Skeleton height="100%" width="100%" borderRadius="elementary" />,
      disabled: true,
    });
  }

  return itemList;
}

function getItemList(categoryDataList) {
  return categoryDataList.data.map((categoryDto) => ({
    value: categoryDto.data.id,
    children: categoryDto.data.name,
  }));
}
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes,
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps,
  //@@viewOff:defaultProps

  render({ feedback, value, ...inputProps }) {
    //@@viewOn:private
    const { categoryDataList } = useCategoryList();
    //@@viewOff:private

    //@@viewOn:render
    const itemList = useMemo(() => {
      if (categoryDataList.state === DataObject.State.PENDING_NO_DATA) {
        return getPendingItemList();
      } else {
        return getItemList(categoryDataList);
      }
    }, [categoryDataList]);

    if (categoryDataList.state === DataObject.State.ERROR_NO_DATA) {
      feedback = "error";
    }

    return (
      <Select.Input
        {...inputProps}
        itemList={itemList}
        value={DataObject.hasData(categoryDataList) ? value : undefined}
        pending={categoryDataList.state === DataObject.State.PENDING_NO_DATA}
        feedback={feedback}
        displayCheckboxes
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
