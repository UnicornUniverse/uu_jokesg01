//@@viewOn:imports
import HttpStatus from "./http-status";
import getErrorStatus from "./get-error-status";
//@@viewOff:imports

function getErrorLsi(errorData, errorsLsi) {
  let lsi = getErrorMessage(errorData, errorsLsi);

  if (!lsi) {
    const errorStatus = getErrorStatus(errorData);
    lsi = getErrorMessageByStatus(errorStatus, errorsLsi);
  }

  return lsi;
}

function getErrorMessageByStatus(errorStatus, errorsLsi = {}) {
  let lsi;

  switch (errorStatus) {
    case HttpStatus.BaseNetworkError:
      lsi = errorsLsi.baseNetworkError;
      break;
    case HttpStatus.BadRequest:
      lsi = errorsLsi.badRequest;
      break;
    case HttpStatus.Unauthorized:
      lsi = errorsLsi.unauthorized;
      break;
    case HttpStatus.Forbidden:
      lsi = errorsLsi.forbidden;
      break;
    case HttpStatus.NotFound:
      lsi = errorsLsi.notFound;
      break;
    case HttpStatus.InternalServerError:
      lsi = errorsLsi.internal;
      break;
    case HttpStatus.ServiceUnavailable:
      lsi = errorsLsi.serviceUnavailable;
      break;
    case HttpStatus.GatewayTimeout:
      lsi = errorsLsi.requestTimeout;
      break;
    default:
      lsi = errorsLsi.defaultError;
  }

  return lsi;
}

function getErrorMessage(errorData, errorsLsi = {}) {
  const code = errorData?.error?.code || errorData.code;
  return errorsLsi[code];
}

//@@viewOn:exports
export { getErrorLsi };
export default getErrorLsi;
//@@viewOff:exports
