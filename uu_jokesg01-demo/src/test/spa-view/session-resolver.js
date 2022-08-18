//@@viewOn:imports
import { createVisualComponent, useSession } from "uu5g05";
import { SpaPending } from "uu_plus4u5g02-app";
import { Unauthenticated } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const SessionResolver = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SessionResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const session = useSession();
    //@@viewOff:private

    //@@viewOn:render
    switch (session.state) {
      case "authenticated":
        return props.children;
      case "notAuthenticated":
        return <Unauthenticated />;
      case "pending":
      default:
        return <SpaPending />;
    }
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SessionResolver };
export default SessionResolver;
//@@viewOff:exports
