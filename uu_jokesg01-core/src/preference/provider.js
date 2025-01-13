//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { withReusedParentProvider } from "uu_plus4u5g02";
import { PreferenceContext, usePreference } from "./use-preference.js";
import useProvider from "./use-provider.js";
import Config from "../workspace/config/config.js";
//@@viewOff:imports

let Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    uu5Tag: PropTypes.string.isRequired,
    uu5Id: PropTypes.string,
    baseUri: PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children, ...providerProps }) {
    //@@viewOn:private
    const value = useProvider(providerProps);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <PreferenceContext.Provider value={value}>
        {typeof children === "function" ? children(value) : children}
      </PreferenceContext.Provider>
    );
    //@@viewOff:render
  },
});

Provider = withReusedParentProvider(Provider, (props) => {
  const parentValue = usePreference();

  if (!parentValue) {
    return;
  }

  if (props.baseUri && props.baseUri !== parentValue.baseUri) {
    return;
  }

  if (props.uu5Tag && props.uu5Tag !== parentValue.uu5Tag) {
    return;
  }

  if (props.uu5Id && props.uu5Id !== parentValue.uu5Id) {
    return;
  }

  return parentValue;
});

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
