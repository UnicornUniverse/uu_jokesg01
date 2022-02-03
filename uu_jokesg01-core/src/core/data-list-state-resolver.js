//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";

import Config from "./config/config";
import Error from "./error";
import DataListPending from "./data-list-state-resolver/data-list-pending";
//@@viewOff:imports

export const DataListStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataListStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataList: PropTypes.object.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    customErrorLsi: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    height: "100%",
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { dataList, customErrorLsi, children, ...viewProps } = props;

    switch (dataList.state) {
      case "ready":
      case "error":
      case "pending":
      case "itemPending":
        return typeof children === "function" ? children() : children;
      case "readyNoData":
      case "pendingNoData":
        return <DataListPending {...viewProps} />;
      case "errorNoData":
      default:
        return <Error {...viewProps} errorData={dataList.errorData} customErrorLsi={customErrorLsi} moreInfo />;
    }
    //@@viewOff:render
  },
});

export default DataListStateResolver;
