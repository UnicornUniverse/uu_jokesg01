//@@viewOn:imports
import { createVisualComponent, Utils, useSession } from "uu5g05";
import { Pending } from "uu5g05-elements";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "./config/config.js";
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
    const session = useSession();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const isPending = subAppData.state === "pendingNoData" || session.state !== "authenticated";

    return (
      <div {...attrs}>
        {!isPending && (
          <>
            <Top header={props.header} />
            {props.children}
          </>
        )}
        {isPending && (
          <div className={Css.pending()}>
            <Pending size="max" />
          </div>
        )}
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SpaView as Spa };
export default SpaView;
//@@viewOff:exports
