//@@viewOn:imports
import Uu5, { createComponent } from "uu5g05";
import { AuthenticationService } from "uu_appg01_oidc";
import Config from "./config/config.js";
//@@viewOff:imports

const SessionProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SessionProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Uu5.SessionProvider authenticationService={props.authenticated ? AuthenticationService : undefined}>
        {props.children}
      </Uu5.SessionProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SessionProvider };
export default SessionProvider;
//@@viewOff:exports
