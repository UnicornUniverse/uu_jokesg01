//@@viewOn:imports
import { useLsi, useMemo } from "uu5g05";
import Plus4U5, { useSystemData } from "uu_plus4u5g02";
import useWorkspace from "../workspace/use-workspace.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:helpers
function handleControlPanelClick(event, baseUri) {
  const uri = Plus4U5.Utils.Uri.join(baseUri, "controlPanel");
  Plus4U5.Utils.Uri.open(uri.toString(), event);
}

function handleAboutClick(event, systemData) {
  const uri = Plus4U5.Utils.Uri.join(systemData.relatedObjectsMap.uuAppWebKitUri, "about-product");
  Plus4U5.Utils.Uri.open(uri.toString(), event);
}
//@@viewOff:helpers

function useInfo(help, uu5Tag) {
  const { baseUri } = useWorkspace();
  const { data: systemData } = useSystemData();
  const lsi = useLsi(importLsi, ["UuJokesCore.Common.useInfo"]);

  return useMemo(() => {
    return {
      help,
      uu5Tag,
      actionList: [
        { children: lsi.controlPanel, onClick: (event) => handleControlPanelClick(event, baseUri) },
        { children: lsi.about, onClick: (event) => handleAboutClick(event, systemData) },
      ],
    };
  }, [help, uu5Tag, baseUri, lsi, systemData]);
}

//@@viewOn:exports
export { useInfo };
export default useInfo;
//@@viewOff:exports
