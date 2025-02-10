//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { withReusedParentProvider } from "uu_plus4u5g02";
import Config from "./config/config.js";
import { Context, useJoke } from "./use-joke.js";
import useProvider from "./use-provider.js";
//@@viewOff:imports

let Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + `Provider`,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string,
    oid: PropTypes.string,
    skipInitialLoad: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children, ...providerProps } = props;
    const value = useProvider(providerProps);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <Context.Provider value={value}>{typeof children === "function" ? children(value) : children}</Context.Provider>
    );
    //@@viewOff:render
  },
});

Provider = withReusedParentProvider(Provider, (props) => {
  const parentValue = useJoke();

  if (!parentValue) {
    return;
  }

  if (props.baseUri && props.baseUri !== parentValue.baseUri) {
    return false;
  }

  if (props.oid && props.oid !== parentValue.oid) {
    return false;
  }

  return parentValue;
});

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
