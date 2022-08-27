//@@viewOn:imports
import { createVisualComponent, PropTypes, useMemo } from "uu5g05";
import { TextSelect, withFormItem } from "uu5g05-forms";
import ListProvider from "./list-provider.js";
import Config from "./config/config.js";
import Error from "../core/error.js";
//@@viewOff:imports

//@@viewOn:helpers
function getItemList(categoryDataList, initialList = []) {
  if (categoryDataList.state === "ready") {
    return categoryDataList.data.map((categoryDto) => ({
      value: categoryDto.data.id,
      children: categoryDto.data.name,
    }));
  } else {
    return initialList.map((category) => ({
      value: category.id,
      children: category.name,
    }));
  }
}

function SelectView({ categoryDataList, initialList, ...inputProps }) {
  const itemList = useMemo(() => getItemList(categoryDataList, initialList), [categoryDataList, initialList]);
  let feedback, message;

  if (categoryDataList.state === "errorNoData") {
    feedback = "error";
    message = <Error errorData={categoryDataList.errorData} nestingLevel="inline" />;
  }

  return (
    <TextSelect
      {...inputProps}
      itemList={itemList}
      pending={categoryDataList.state === "pendingNoData"}
      feedback={feedback}
      message={message}
    />
  );
}
//@@viewOff:helpers

const Select = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Select",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    initialList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    initialList: [],
  },
  //@@viewOff:defaultProps

  render({ baseUri, ...viewProps }) {
    //@@viewOn:render
    return (
      <ListProvider baseUri={baseUri}>
        {({ categoryDataList }) => <SelectView {...viewProps} categoryDataList={categoryDataList} />}
      </ListProvider>
    );
    //@@viewOff:render
  },
});

const FormSelect = withFormItem(Select);

//@@viewOn:exports
export { FormSelect, Select };
export default FormSelect;
//@@viewOff:exports
