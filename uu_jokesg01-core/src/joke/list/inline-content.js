//@@viewOn:imports
import { createVisualComponent, useLanguage, useLsi, Utils } from "uu5g05";
import { useController } from "uu5tilesg02";
import { Badge } from "uu5g05-elements";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

const InlineContent = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "InlineContent",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data } = useController();
    const [language] = useLanguage();
    const viewLsi = useLsi(importLsi, [InlineContent.uu5Tag]);

    function getJokesCountLsi(count) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(count);
      return Utils.String.format(viewLsi[`${rule}Jokes`], count);
    }
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Badge {...props} colorScheme="blue" significance="common">
        {getJokesCountLsi(data.length)}
      </Badge>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { InlineContent };
export default InlineContent;
//@@viewOff:exports
