//@@viewOn:imports
import { Select, withFormInput, withFormItem } from "uu5g05-forms";
import Input from "./select/input";
//@@viewOff:imports

const CategorySelect = withFormInput(Input);
CategorySelect.Input = Input;
CategorySelect.Options = Select.Options;
CategorySelect.Field = Select.Field;
CategorySelect.SelectedOptions = Select.SelectedOptions;

const FormCategorySelect = withFormItem(CategorySelect);

//@@viewOn:exports
export { CategorySelect, FormCategorySelect };
export default CategorySelect;
//@@viewOff:exports
