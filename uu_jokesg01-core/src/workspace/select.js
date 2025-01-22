//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import Uu5Forms, { withFormInput, withFormItem } from "uu5g05-forms";
import Input from "./select/input";
import Workspace from "../utils/workspace";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:helpers
const FormInput = withFormInput(Input);
//@@viewOff:helpers

let Select = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Select",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...FormInput.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...FormInput.defaultProps,
  },
  //@@viewOff:defaultProps

  render({ label, ...inputProps }) {
    //@@viewOn:private
    const workspaceLsi = useLsi(importLsi, [Workspace.APP_TYPE]);
    //@@viewOff:private

    //@@viewOn:render
    return <FormInput label={label === undefined ? workspaceLsi.appTypeName : label} {...inputProps} />;
    //@@viewOff:render
  },
});

Select.Input = Input;
Select.Options = Uu5Forms.Select.Options;
Select.Field = Uu5Forms.Select.Field;
Select.SelectedOptions = Uu5Forms.Select.SelectedOptions;

const FormSelect = withFormItem(Select);

//@@viewOn:exports
export { Select, FormSelect };
export default Select;
//@@viewOff:exports
