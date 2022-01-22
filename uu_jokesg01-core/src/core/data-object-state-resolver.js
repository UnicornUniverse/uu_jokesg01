//@@viewOn:imports
import { createComponent, PropTypes, Utils } from "uu5g05";

import Config from "./config/config";
import Error from "./error";
import DataObjectPending from "./data-object-state-resolver/data-object-pending";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DataObjectStateResolver",
  nestingLevel: ["bigBox", "boxCollection", "box", "smallBoxCollection", "smallBox", "inline"],
  //@@viewOff:statics
};

export const DataObjectStateResolver = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object,
    height: PropTypes.number,
    customErrorLsi: PropTypes.object,
    passErrorNoData: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
    passErrorNoData: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    function renderChildren() {
      return typeof props.children === "function" ? props.children() : props.children;
    }

    switch (props.dataObject.state) {
      case "ready":
      case "error":
      case "pending":
        return renderChildren();
      case "errorNoData":
        console.log("errorNoData", props.passErrorNoData);
        return props.passErrorNoData ? (
          renderChildren()
        ) : (
          <Error
            height={props.height}
            moreInfo
            errorData={props.dataObject.errorData}
            customErrorLsi={props.customErrorLsi}
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={props.className}
            style={props.style}
          />
        );
      case "readyNoData":
      case "pendingNoData":
        return (
          <DataObjectPending
            height={props.height}
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={props.className}
            style={props.style}
          />
        );
      default:
        console.error(props.dataObject.errorData);
        return (
          <Error
            height={props.height}
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={props.className}
            style={props.style}
          />
        );
    }
    //@@viewOff:render
  },
});

export default DataObjectStateResolver;
