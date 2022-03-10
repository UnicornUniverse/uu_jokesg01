//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import { SpaProvider } from "uu_plus4u5g02";
import { Core } from "uu_jokesg01-core";
import Config from "./config/config.js";
import EnvironmentSync from "./test-environment/environment-sync.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
  component: () => Config.Css.css({ display: "block", margin: "auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TestEnvironment = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TestEnvironment",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const spacing = useSpacing();
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(spacing));
    const { component: Component, componentProps, environment } = props;

    return (
      <div {...attrs}>
        <SpaProvider baseUri={environment.isHome ? componentProps.baseUri : ""} skipAppWorkspaceProvider>
          <Core.ErrorBoundary>
            <Component {...componentProps} className={Css.component(spacing)} />
          </Core.ErrorBoundary>
          <EnvironmentSync environment={environment} />
        </SpaProvider>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TestEnvironment };
export default TestEnvironment;
//@@viewOff:exports
