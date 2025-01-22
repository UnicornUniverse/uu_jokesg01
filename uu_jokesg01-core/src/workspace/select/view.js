//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useArtifact } from "uu_plus4u5g02";
import { TextSelectAsync } from "uu5g05-forms";
import Config from "./config/config.js";
import Calls from "calls";
import useWorkspace from "../use-workspace.js";
import DataObject from "../../utils/data-object.js";
//@@viewOff:imports

//@@viewOn:helpers
//@@viewOff:helpers

const View = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "View",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ value, onChange, ...inputProps }) {
    //@@viewOn:private
    const artifact = useArtifact();
    const { workspaceDto } = useWorkspace();

    async function handleSearch(event) {
      const dtoIn = {
        name: event.data.value,
        uuAppTypeList: ["uu-jokes-maing01"],
      };

      const dtoOut = await Calls.Territory.Artifact.find(artifact.data.context.territory.uuTerritoryBaseUri, dtoIn);
      const itemList = dtoOut.itemList.map((artifact) => ({
        value: artifact.uuAppWorkspaceUri,
        children: artifact.name,
      }));

      return itemList;
    }

    function handleChange(event) {
      const newEvent = new Utils.Event({ value: event.data.value?.value }, event);
      onChange(newEvent);
    }
    //@@viewOff:private

    //@@viewOn:render

    return (
      <TextSelectAsync.Input
        {...inputProps}
        value={value && { value, children: workspaceDto.data?.name }}
        onChange={handleChange}
        onSearch={handleSearch}
        pending={workspaceDto.state === DataObject.State.PENDING_NO_DATA}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
