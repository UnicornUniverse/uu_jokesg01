//@@viewOn:imports
import Uu5, { createVisualComponent } from "uu5g05";
import { UnexpectedError } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
//@@viewOff:imports

const ErrorBoundary = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ErrorBoundary",
  //@@viewOff:statics

  render(props) {
    //@@viewOn:render
    return <Uu5.ErrorBoundary fallback={UnexpectedError}>{props.children}</Uu5.ErrorBoundary>;
  },
  //@@viewOff:render
});

//@@viewOn:exports
export { ErrorBoundary };
export default ErrorBoundary;
//@@viewOff:exports
