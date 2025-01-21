//@@viewOn:imports
import { createVisualComponent, useEffect } from "uu5g05";
import Config from "./config/config.js";
//@@viewOff:imports

const DocumentTitle = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DocumentTitle",
  nestingLevel: ["route"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ title: propTitle, subtitle: propSubtitle, nestingLevel, nestingLevelList }) {
    //@@viewOn:private
    const title = propTitle?.inline ?? propTitle;
    const subtitle = propSubtitle?.inline ?? propSubtitle;

    useEffect(() => {
      if (nestingLevel !== "route") {
        return;
      }

      if (!nestingLevelList.includes("route") && !nestingLevelList.includes("area")) {
        return;
      }

      let documentTitle = "";

      if (subtitle) {
        documentTitle += `${subtitle}`;
      }

      if (subtitle && title) {
        documentTitle += " - ";
      }

      if (title) {
        documentTitle += title;
      }

      document.title = documentTitle;
    }, [title, subtitle, nestingLevel, nestingLevelList]);

    useEffect(() => {
      const origTitle = document.title;
      return () => {
        document.title = origTitle;
      };
    }, []);
    //@@viewOff:private

    //@@viewOn:render
    return null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DocumentTitle };
export default DocumentTitle;
//@@viewOff:exports
