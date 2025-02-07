//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import { FormSwitchSelect } from "uu5g05-forms";
import UuJokesCore from "uu_jokesg01-core";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

const FormFilterMode = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "FormFilterMode",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...FormSwitchSelect.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...FormSwitchSelect.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const viewLsi = useLsi(importLsi, [FormFilterMode.uu5Tag]);
    const modeList = UuJokesCore.Utils.Filter.Mode.list();
    //@@viewOff:private

    //@@viewOn:render
    return (
      <FormSwitchSelect
        {...props}
        label={viewLsi.label}
        itemList={modeList.map((mode) => ({
          value: mode,
          children: viewLsi.itemList[mode],
        }))}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { FormFilterMode };
export default FormFilterMode;
//@@viewOff:exports
