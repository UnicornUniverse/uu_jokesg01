//@@viewOn:imports
import { createComponent, PropTypes, useMemo } from "uu5g05";
import { AppWorkspaceProvider, withReusedParentProvider, useSubAppData, withBaseUri } from "uu_plus4u5g02";
import { Context, useWorkspace } from "./use-workspace.js";
import Config from "./config/config.js";
import Calls from "calls";
import Workspace from "../utils/workspace.js";
//@@viewOff:imports

//@@viewOn:helpers
function WorkspaceProvider({ baseUri, children }) {
  const workspaceDto = useSubAppData();
  const value = useMemo(() => ({ workspaceDto, baseUri }), [workspaceDto, baseUri]);
  return (
    <Context.Provider value={value}>{typeof children === "function" ? children(value) : children}</Context.Provider>
  );
}

function mergeDtoOut(dtoOut) {
  return (prevData) => {
    const data = {
      data: { ...prevData.data, ...dtoOut.jokes },
      // The uuJokes should work without uuBT for educational purposes
      territoryData: prevData.territoryData && {
        ...prevData.territoryData,
        data: {
          ...prevData.territoryData.data,
          artifact: dtoOut.artifact,
          context: dtoOut.context,
        },
      },
    };

    return data;
  };
}
//@@viewOff:helpers

let Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + `Provider`,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: { baseUri: PropTypes.string },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ baseUri, children }) {
    //@@viewOn:private
    const handlerMap = useMemo(
      () => ({
        load() {
          return Calls.Workspace.load(baseUri);
        },
        async update(values) {
          const dtoOut = await Calls.Workspace.update(baseUri, values);
          return mergeDtoOut(dtoOut);
        },
        async setState(state) {
          const dtoOut = await Calls.Workspace.setState(baseUri, { state });
          return mergeDtoOut(dtoOut);
        },
        async setResponsibleRole(territoryBaseUri, artifactId, roleId) {
          const dtoOut = await Calls.Territory.Artifact.setResponsibleRole(territoryBaseUri, {
            id: artifactId,
            responsibleRole: roleId,
            loadContext: true,
          });
          return mergeDtoOut(dtoOut);
        },
        async init(values) {
          const dtoOut = await Calls.Workspace.update(baseUri, values);
          return mergeDtoOut(dtoOut);
        },
      }),
      [baseUri],
    );
    //@@viewOff:private

    //@@viewOn:render
    return (
      <AppWorkspaceProvider baseUri={baseUri} subApp={Workspace.APP_TYPE} handlerMap={handlerMap} refreshKey={baseUri}>
        <WorkspaceProvider baseUri={baseUri}>{children}</WorkspaceProvider>
      </AppWorkspaceProvider>
    );
    //@@viewOff:render
  },
});

Provider = withReusedParentProvider(Provider, (props) => {
  const parentValue = useWorkspace();

  if (!parentValue) {
    return;
  }

  if (props.baseUri && props.baseUri !== parentValue.baseUri) {
    return;
  }

  return parentValue;
});

Provider = withBaseUri(Provider);

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
