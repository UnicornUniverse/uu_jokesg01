//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { ArtifactLink } from "uu_tg01-elements";
import { DataStateResolver } from "uu_plus4u5g02-elements";
import { useAwscData, useSubAppData } from "uu_plus4u5g02";
import Config from "./config/config.js";
//@@viewOff:imports

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

  render(props) {
    //@@viewOn:private
    const subAppDataDto = useSubAppData();
    const { data: territoryData } = useAwscData();
    const { elementProps, componentProps } = Utils.VisualComponent.splitProps(props);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <DataStateResolver {...elementProps} dataObject={subAppDataDto} nestingLevel="inline">
        <ArtifactLink
          {...componentProps}
          href={territoryData.data.artifact.uuAppWorkspaceUri}
          baseUri={territoryData.data.context.territory.uuTerritoryBaseUri}
          artifactId={territoryData.data.artifact.id}
          stateName={territoryData.data.artifact.stateName}
          stateIcon={territoryData.data.artifact.stateIcon}
          typeIcon={territoryData.data.artifact.typeIcon}
        >
          {territoryData.data.artifact.name}
        </ArtifactLink>
      </DataStateResolver>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { View };
export default View;
//@@viewOff:exports
