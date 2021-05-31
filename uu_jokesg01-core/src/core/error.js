//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import Config from "./config/config";
import Lsi from "./error-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) => Config.Css.css`
    height: ${height}px;
    overflow: scroll
  `,
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Error",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const Error = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    moreInfo: UU5.PropTypes.bool,
    errorData: UU5.PropTypes.object,
    height: UU5.PropTypes.number,
    customErrorLsi: UU5.PropTypes.object,
    inline: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    moreInfo: false,
    errorData: {},
    height: undefined,
    customErrorLsi: {},
    inline: undefined,
  },
  //@@viewOff:defaultProps

  //@@viewOn:private
  //@@viewOff:private

  //@@viewOn:render
  render(props) {
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const className = props.height ? Css.placeholder(props.height) : "";
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);

    // note: there were cases when errorData without reparsing
    // were not behaving like an object
    let error = JSON.parse(JSON.stringify(props.errorData));

    let lsi = getErrorMessage(error, props.customErrorLsi);
    if (!lsi) lsi = getErrorMessageByStatus(error, props.customErrorLsi);

    return (
      <Plus4U5.Bricks.Error
        moreInfo={props.moreInfo}
        errorData={props.errorData}
        inline={props.inline || currentNestingLevel === "inline"}
        colorSchema="danger"
        {...attrs}
      >
        <UU5.Bricks.Lsi lsi={lsi} />
      </Plus4U5.Bricks.Error>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function getErrorMessageByStatus(errorData, customErrorLsi) {
  let lsi;
  switch (errorData?.error?.status) {
    case 0:
      lsi = customErrorLsi.baseNetworkError || Lsi.baseNetworkError;
      break;
    case 400:
      lsi = customErrorLsi.badRequest || Lsi.badRequest;
      break;
    case 401:
      lsi = customErrorLsi.unauthorized || Lsi.unauthorized;
      break;
    case 403:
      lsi = customErrorLsi.forbidden || Lsi.forbidden;
      break;
    case 404:
      lsi = customErrorLsi.notFound || Lsi.notFound;
      break;
    case 500:
      lsi = customErrorLsi.internal || Lsi.internal;
      break;
    case 503:
      lsi = customErrorLsi.serviceUnavailable || Lsi.serviceUnavailable;
      break;
    case 504:
      lsi = customErrorLsi.requestTimeout || Lsi.requestTimeout;
      break;
    default:
      lsi = customErrorLsi.defaultError || Lsi.defaultError;
  }

  return lsi;
}

function getErrorMessage(errorData, customErrorLsi) {
  const code = errorData?.error?.code || errorData.code;
  return customErrorLsi[code] || Lsi[code];
}
//viewOff:helpers

export default Error;
