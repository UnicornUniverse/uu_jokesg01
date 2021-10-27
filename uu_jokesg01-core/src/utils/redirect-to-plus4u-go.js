//@@viewOn:imports
import UU5 from "uu5g04";
//@@viewOff:imports

function redirectToPlus4UGo(componentName, componentProps, target = "_blank") {
  const query = { _component: componentName, ...componentProps };
  const plus4uGoUri = `${UU5.Environment.COMPONENT_RENDER_UVE}${UU5.Common.Url.encodeQuery(query)}`;

  UU5.Common.Tools.openWindow(plus4uGoUri, target);
}

export default redirectToPlus4UGo;
