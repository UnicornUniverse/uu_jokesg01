//@@viewOn:imports
import { createComponent, PropTypes, Utils } from "uu5g05";

import Config from "./config/config";
import Error from "./error";
import DataListPending from "./data-list-state-resolver/data-list-pending";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DataListStateResolver",
  nestingLevel: ["bigBox", "boxCollection", "box", "smallBoxCollection", "smallBox", "inline"],
  //@@viewOff:statics
};

export const DataListStateResolver = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    dataList: PropTypes.object,
    height: PropTypes.number,
    customErrorLsi: PropTypes.object,
    passErrorNoData: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataList: {},
    passErrorNoData: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    function renderChildren() {
      return typeof props.children === "function" ? props.children() : props.children;
    }

    switch (props.dataList.state) {
      case "ready":
      case "error":
      case "pending":
      case "itemPending":
        return renderChildren();
      case "errorNoData":
        return props.passErrorNoData ? (
          renderChildren()
        ) : (
          <Error
            height={props.height}
            moreInfo
            errorData={props.dataList.errorData}
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
          <DataListPending
            height={props.height}
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={props.className}
            style={props.style}
          />
        );
      default:
        console.error(props.dataList.errorData);
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

export default DataListStateResolver;
