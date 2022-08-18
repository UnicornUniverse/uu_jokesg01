//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import { SpaPending } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import SessionResolver from "./spa-view/session-resolver.js";
import Top from "./spa-view/top.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () =>
    Config.Css.css({
      height: "100vw",
    }),
  pending: () =>
    Config.Css.css({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SpaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SpaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subAppData = useSubAppData();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const isPending = subAppData.state === "pendingNoData";

    return (
      <div {...attrs}>
        <Top header={props.header} />
        <SessionResolver>
          {!isPending && props.children}
          {isPending && (
            <div className={Css.pending()}>
              <SpaPending />
            </div>
          )}
        </SessionResolver>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SpaView as Spa };
export default SpaView;
//@@viewOff:exports
