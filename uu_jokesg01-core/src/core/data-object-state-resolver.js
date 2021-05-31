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
    height: undefined,
    customErrorLsi: undefined,
    passErrorNoData: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const attrs = UU5.Common.VisualComponent.getAttrs(props);

    switch (props.dataObject.state) {
      case "ready":
      case "error":
      case "pending":
        return props.children;
      case "errorNoData":
        return props.passErrorNoData ? (
          props.children
        ) : (
          <Error
            height={props.height}
            moreInfo
            errorData={props.dataObject.errorData}
            customErrorLsi={props.customErrorLsi}
            nestingLevel={currentNestingLevel}
            {...attrs}
          />
        );
      case "readyNoData":
      case "pendingNoData":
        return <DataObjectPending height={props.height} nestingLevel={currentNestingLevel} {...attrs} />;
      default:
        return <Error height={props.height} nestingLevel={currentNestingLevel} {...attrs} />;
    }
    //@@viewOff:render
  },
});

export default DataObjectStateResolver;
