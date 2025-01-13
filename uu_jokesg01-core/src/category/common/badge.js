//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import Provider from "../provider.js";
import View from "./badge/view.js";
//@@viewOff:imports

const Badge = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Badge",
  nestingLevel: View.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...View.propTypes,
    baseUri: Provider.propTypes.baseUri,
    oid: Provider.propTypes.oid,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...View.defaultProps,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { baseUri, oid, ...viewProps } = props;
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Provider baseUri={baseUri} oid={oid}>
        <View {...viewProps} />
      </Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Badge };
export default Badge;
//@@viewOff:exports
