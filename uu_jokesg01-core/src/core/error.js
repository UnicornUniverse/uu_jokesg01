//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import PropertyError from "../errors/property-error";
import PropertyErrorView from "./error/property-error-view";
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

const HttpStatus = {
  BaseNetworkError: 0,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
};

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
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sessionState } = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    // TODO MFA Add prop.className to className (array??)
    const className = props.height ? Css.placeholder(props.height) : "";

    // note: there were cases when errorData without reparsing
    // were not behaving like an object
    const errorData = JSON.parse(JSON.stringify(props.errorData));
    const errorStatus = getErrorStatus(errorData);

    if (errorStatus === HttpStatus.Unauthorized || errorStatus === HttpStatus.Forbidden) {
      if (sessionState === "authenticated") {
        return (
          <UU5.Bricks.Unauthorized
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={className}
            style={props.style}
          />
        );
      } else {
        return (
          <UU5.Bricks.Unauthenticated
            nestingLevel={currentNestingLevel}
            disabled={props.disabled}
            hidden={props.hidden}
            className={className}
            style={props.style}
          />
        );
      }
    }

    let lsi = getErrorMessage(errorData, props.customErrorLsi);
    if (!lsi) lsi = getErrorMessageByStatus(errorStatus, props.customErrorLsi);

    if (props.errorData.error instanceof PropertyError) {
      return (
        <PropertyErrorView
          nestingLevel={currentNestingLevel}
          disabled={props.disabled}
          hidden={props.hidden}
          className={className}
          style={props.style}
        >
          <UU5.Bricks.Lsi lsi={lsi} />
        </PropertyErrorView>
      );
    }

    return (
      <Plus4U5.Bricks.Error
        moreInfo={props.moreInfo}
        errorData={props.errorData}
        inline={props.inline || currentNestingLevel === "inline"}
        colorSchema="danger"
        disabled={props.disabled}
        hidden={props.hidden}
        className={className}
        style={props.style}
      >
        <UU5.Bricks.Lsi lsi={lsi} />
      </Plus4U5.Bricks.Error>
    );
    //@@viewOff:render
  },
});

//viewOn:helpers
function getErrorStatus(errorData) {
  let status = errorData?.status;

  if (status === null || status === undefined) {
    return errorData?.error?.status;
  } else {
    return status;
  }
}

function getErrorMessageByStatus(errorStatus, customErrorLsi) {
  let lsi;
  switch (errorStatus) {
    case HttpStatus.BaseNetworkError:
      lsi = customErrorLsi.baseNetworkError || Lsi.baseNetworkError;
      break;
    case HttpStatus.BadRequest:
      lsi = customErrorLsi.badRequest || Lsi.badRequest;
      break;
    case HttpStatus.Unauthorized:
      lsi = customErrorLsi.unauthorized || Lsi.unauthorized;
      break;
    case HttpStatus.Forbidden:
      lsi = customErrorLsi.forbidden || Lsi.forbidden;
      break;
    case HttpStatus.NotFound:
      lsi = customErrorLsi.notFound || Lsi.notFound;
      break;
    case HttpStatus.InternalServerError:
      lsi = customErrorLsi.internal || Lsi.internal;
      break;
    case HttpStatus.ServiceUnavailable:
      lsi = customErrorLsi.serviceUnavailable || Lsi.serviceUnavailable;
      break;
    case HttpStatus.GatewayTimeout:
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
