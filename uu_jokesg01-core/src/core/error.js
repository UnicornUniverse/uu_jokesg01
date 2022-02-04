//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, Utils, Lsi, useSession } from "uu5g05";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";
import PropertyError from "../errors/property-error";
import PropertyErrorView from "./error/property-error-view";
import Config from "./config/config";
import LsiData from "./error-lsi";
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
  uu5Tag: Config.TAG + "Error",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

export const Error = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    moreInfo: PropTypes.bool,
    errorData: PropTypes.object,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    customErrorLsi: PropTypes.object,
    inline: PropTypes.bool,
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);

    const className = props.height
      ? Utils.Css.joinClassName(props.className, Css.placeholder(props.height))
      : props.className;

    // note: there were cases when errorData without reparsing
    // were not behaving like an object
    const errorData = JSON.parse(JSON.stringify(props.errorData));
    const errorStatus = getErrorStatus(errorData);

    if (errorStatus === HttpStatus.Unauthorized || errorStatus === HttpStatus.Forbidden) {
      if (sessionState === "authenticated") {
        // ISSUE - Plus4U5Elements - There is no alternative for UU5.Bricks.Unauthorized
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec16f3572961002969f86d
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
        // ISSUE - Unauthenticated - doesn't support nesting level inline
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec13ab572961002969f7b0

        // ISSUE - Unauthenticated - Property width does not work
        // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec1575572961002969f807
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
          <Lsi lsi={lsi} />
        </PropertyErrorView>
      );
    }

    // ISSUE - Plus4U5Elements - There is no alternative for Plus4U5.Bricks.Error
    // https://uuapp.plus4u.net/uu-sls-maing01/558dcc308da34b82bbe044d94074802f/issueDetail?id=61ec1647572961002969f848

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
        <Lsi lsi={lsi} />
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
      lsi = customErrorLsi.baseNetworkError || LsiData.baseNetworkError;
      break;
    case HttpStatus.BadRequest:
      lsi = customErrorLsi.badRequest || LsiData.badRequest;
      break;
    case HttpStatus.Unauthorized:
      lsi = customErrorLsi.unauthorized || LsiData.unauthorized;
      break;
    case HttpStatus.Forbidden:
      lsi = customErrorLsi.forbidden || LsiData.forbidden;
      break;
    case HttpStatus.NotFound:
      lsi = customErrorLsi.notFound || LsiData.notFound;
      break;
    case HttpStatus.InternalServerError:
      lsi = customErrorLsi.internal || LsiData.internal;
      break;
    case HttpStatus.ServiceUnavailable:
      lsi = customErrorLsi.serviceUnavailable || LsiData.serviceUnavailable;
      break;
    case HttpStatus.GatewayTimeout:
      lsi = customErrorLsi.requestTimeout || LsiData.requestTimeout;
      break;
    default:
      lsi = customErrorLsi.defaultError || LsiData.defaultError;
  }

  return lsi;
}

function getErrorMessage(errorData, customErrorLsi) {
  const code = errorData?.error?.code || errorData.code;
  return customErrorLsi[code] || LsiData[code];
}
//viewOff:helpers

export default Error;
