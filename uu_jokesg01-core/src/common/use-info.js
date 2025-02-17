//@@viewOn:imports
import { useLsi, useMemo } from "uu5g05";
import Plus4U5 from "uu_plus4u5g02";
import useWorkspace from "../workspace/use-workspace.js";
import AboutButton from "./about-button.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:helpers
function handleControlPanelClick(event, baseUri) {
  const uri = Plus4U5.Utils.Uri.join(baseUri, "controlPanel");
  Plus4U5.Utils.Uri.open(uri.toString(), event);
}
//@@viewOff:helpers

function useInfo(help, uu5Tag) {
  const { baseUri } = useWorkspace();
  const lsi = useLsi(importLsi, ["UuJokesCore.Common.useInfo"]);

  return useMemo(() => {
    return {
      // FIXME - currently the actionList is not being propagated properly, so the about button is included in help
      help: (
        <>
          {help}
          <AboutButton />
        </>
      ),
      uu5Tag,
      actionList: [
        { children: lsi.controlPanel, onClick: (event) => handleControlPanelClick(event, baseUri) },
        // { children: <AboutButton /> },
      ],
    };
  }, [help, uu5Tag, baseUri, lsi]);
}

//@@viewOn:exports
export { useInfo };
export default useInfo;
//@@viewOff:exports
