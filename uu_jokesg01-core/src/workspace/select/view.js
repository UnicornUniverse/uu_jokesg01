//@@viewOn:imports
import { createVisualComponent, PropTypes, useMemo, Utils } from "uu5g05";
import { useArtifact, useSubAppData } from "uu_plus4u5g02";
import { TextSelectAsync } from "uu5g05-forms";
import Config from "./config/config.js";
import Calls from "calls";
import DataObject from "../../utils/data-object.js";
import Workspace from "../../utils/workspace.js";
//@@viewOff:imports

//@@viewOn:helpers
const propTypes = { ...TextSelectAsync.propTypes };
delete propTypes.onSearch;
delete propTypes.pending;
propTypes.territoryBaseUri = PropTypes.string;

const defaultProps = { ...TextSelectAsync.defaultProps };
delete defaultProps.onSearch;
delete defaultProps.pending;

async function searchArtifacts(name, territoryBaseUri) {
  const dtoIn = { name, uuAppTypeList: [Workspace.APP_TYPE] };

  const dtoOut = await Calls.Territory.Artifact.find(territoryBaseUri, dtoIn);
  const itemList = dtoOut.itemList.map((artifact) => ({
    value: artifact.uuAppWorkspaceUri,
    children: artifact.name,
  }));

  return itemList;
}

async function searchWorkspace(baseUri) {
  const dtoOut = await Calls.Workspace.load(baseUri);
  const itemList = [];

  if (dtoOut.territoryData.data.artifact.typeCode === Workspace.APP_TYPE) {
    itemList.push({
      value: dtoOut.territoryData.data.artifact.uuAppWorkspaceUri,
      children: dtoOut.territoryData.data.artifact.name,
    });
  }

  return itemList;
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

  render({ value, onChange, territoryBaseUri, ...inputProps }) {
    //@@viewOn:private
    const territoryData = useArtifact();
    const subAppData = useSubAppData();

    const internalValue = useMemo(() => {
      if (value && territoryData) {
        return { value, children: territoryData.data.artifact.name };
      } else if (value) {
        return { value, children: value };
      } else {
        return value;
      }
    }, [value, territoryData]);

    async function handleSearch(event) {
      const name = event.data.value;

      if (name.startsWith("https://")) {
        return searchWorkspace(name);
      } else {
        return searchArtifacts(name, territoryBaseUri ?? territoryData?.data?.context?.territory.uuTerritoryBaseUri);
      }
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
        value={internalValue}
        onChange={handleChange}
        onSearch={handleSearch}
        pending={subAppData.state === DataObject.State.PENDING_NO_DATA}
      />
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
