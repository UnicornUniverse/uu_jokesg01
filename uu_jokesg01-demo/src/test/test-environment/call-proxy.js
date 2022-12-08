//@@viewOn:imports
import { createComponent, useLayoutEffect } from "uu5g05";
import { Client } from "uu_appg01";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:helpers
const originalGet = Client.get;
const originalPost = Client.post;

function getCallProxy(call, proxyOptions) {
  return (url, dtoIn, clientOpts) => {
    let newUrl = url;
    let newOpts = { ...clientOpts };

    if (!proxyOptions.authenticated || !proxyOptions.authorized) {
      delete newOpts.session;
      newOpts.headers = { Authorization: undefined };
    }

    if (proxyOptions.isError) {
      newUrl = "";
    }

    return call(newUrl, dtoIn, newOpts);
  };
}

function setCallProxy(proxyOptions) {
  Client.get = getCallProxy(originalGet, proxyOptions);
  Client.post = getCallProxy(originalPost, proxyOptions);
}
//@@viewOff:helpers

const CallProxy = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CallProxy",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    useLayoutEffect(() => setCallProxy(props), [props]);
    //@@viewOff:private

    //@@viewOn:render
    //setCallProxy(props);
    return props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CallProxy };
export default CallProxy;
//@@viewOff:exports
