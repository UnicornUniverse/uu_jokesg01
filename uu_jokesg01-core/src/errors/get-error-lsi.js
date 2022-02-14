import HttpStatus from "./http-status";
import getErrorStatus from "./get-error-status";
import LsiData from "./errors-lsi";

export function getErrorLsi(errorData, customErrorLsi) {
  // note: there were cases when errorData without reparsing
  // were not behaving like an object
  // const errorData = JSON.parse(JSON.stringify(errorData));
  const errorStatus = getErrorStatus(errorData);
  let lsi = getErrorMessage(errorData, customErrorLsi);
  if (!lsi) lsi = getErrorMessageByStatus(errorStatus, customErrorLsi);
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
  return customErrorLsi[code] || LsiData[code];
}

export default getErrorLsi;
