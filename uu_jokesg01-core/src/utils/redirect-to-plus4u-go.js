//@@viewOn:imports
import { Environment } from "uu5g05";
//@@viewOff:imports

// ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61724eb3a57edb002a93ba5a
// Functionality will be part of the uu5 library in the future
export function redirectToPlus4UGo(componentName, componentProps) {
  const query = new URLSearchParams({ _component: componentName, ...componentProps });
  const plus4uGoUri = new URL(Environment.get("uu5g05_componentUveUri"));
  plus4uGoUri.search = query.toString();
  window.open(plus4uGoUri.toString());
}

export default redirectToPlus4UGo;
