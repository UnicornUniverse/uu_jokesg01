//@@viewOn:imports
import UU5 from "uu5g04";
//@@viewOff:imports

// ISSUE: https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61724eb3a57edb002a93ba5a
// Functionality will be part of the uu5 library in the future
function redirectToPlus4UGo(componentName, componentProps, target = "_blank") {
  const query = { _component: componentName, ...componentProps };
  const plus4uGoUri = `${UU5.Environment.COMPONENT_RENDER_UVE}${UU5.Common.Url.encodeQuery(query)}`;

  UU5.Common.Tools.openWindow(plus4uGoUri, target);
}

export default redirectToPlus4UGo;
