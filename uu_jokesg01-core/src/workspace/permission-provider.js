//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { withReusedParentProvider } from "uu_plus4u5g02";
import { PermissionContext, usePermission } from "./use-permission";
import Config from "./config/config";
import usePermissionProvider from "./use-permission-provider";
//@@viewOff:imports

let PermissionProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PermissionProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    profileList: PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children, ...providerProps }) {
    //@@viewOn:private
    const permission = usePermissionProvider(providerProps);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <PermissionContext.Provider value={permission}>
        {typeof children === "function" ? children(permission) : children}
      </PermissionContext.Provider>
    );
    //@@viewOff:render
  },
});

PermissionProvider = withReusedParentProvider(PermissionProvider, (props) => {
  const parentValue = usePermission();

  if (!parentValue) {
    return;
  }

  if (props.baseUri && props.baseUri !== parentValue.baseUri) {
    return;
  }

  return parentValue;
});

//@@viewOn:exports
export { PermissionProvider };
export default PermissionProvider;
//@@viewOff:exports
