//@@viewOn:imports
import { Environment } from "uu5g05";
//@@viewOff:imports

function addPrefixToParams(params) {
  const prefixedParams = {};

  for (const [key, value] of Object.entries(params)) {
    prefixedParams[`_${key}`] = value;
  }

  return prefixedParams;
}

// ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61724eb3a57edb002a93ba5a
// Functionality will be part of the uu5 library in the future
export function redirectToPlus4UGo(uu5Tag, componentProps, goParams) {
  const goPrefixedParams = addPrefixToParams(goParams);
  const query = new URLSearchParams({ _uu5Tag: uu5Tag, ...componentProps, ...goPrefixedParams });
  const plus4uGoUri = new URL(Environment.get("uu5g05_componentUveUri"));
  plus4uGoUri.search = query.toString();
  window.open(plus4uGoUri.toString());
}

export default redirectToPlus4UGo;
