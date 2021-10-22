//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";

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
    dataObject: UU5.PropTypes.object,
    height: UU5.PropTypes.number,
    customErrorLsi: UU5.PropTypes.object,
    passErrorNoData: UU5.PropTypes.bool,
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
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

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
