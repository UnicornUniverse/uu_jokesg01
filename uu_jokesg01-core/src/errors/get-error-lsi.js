//@@viewOn:imports
import HttpStatus from "./http-status";
import getErrorStatus from "./get-error-status";
import LsiData from "./errors-lsi";
//@@viewOff:imports

function getErrorLsi(errorData, customErrorLsi) {
  let lsi = getErrorMessage(errorData, customErrorLsi);

  if (!lsi) {
    const errorStatus = getErrorStatus(errorData);
    lsi = getErrorMessageByStatus(errorStatus, customErrorLsi);
  }

  return lsi;
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
  return customErrorLsi[code] || LsiData[code] || errorData?.error?.message;
}

//@@viewOn:exports
export { getErrorLsi };
export default getErrorLsi;
//@@viewOff:exports
