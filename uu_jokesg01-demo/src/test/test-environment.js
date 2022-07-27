//@@viewOn:imports
import { BackgroundProvider, createVisualComponent, Utils } from "uu5g05";
import { SpacingProvider, useSpacing } from "uu5g05-elements";
import { SpaProvider } from "uu_plus4u5g02";
import Config from "./config/config.js";
import EnvironmentSync from "./test-environment/environment-sync.js";
import BackgroundView from "./test-environment/background-view.js";
import CallProxy from "./test-environment/call-proxy.js";
import SessionProvider from "./test-environment/session-provider.js";
import ErrorBoundary from "./test-environment/error-boundary.js";
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
    const { component: Component, componentProps, environment, user, calls } = props;

    return (
      <div {...attrs}>
        <SpaProvider baseUri={environment.isHome ? componentProps.baseUri : ""} skipAppWorkspaceProvider>
          <BackgroundView background={environment.background}>
            <BackgroundProvider background={environment.background}>
              <SessionProvider authenticated={user.authenticated}>
                <CallProxy authenticated={user.authenticated} authorized={user.authorized} isError={calls.isError}>
                  <SpacingProvider type={environment.spacing}>
                    <ErrorBoundary>
                      <Component {...componentProps} className={Css.component(spacing)} key={props.refreshKey} />
                    </ErrorBoundary>
                  </SpacingProvider>
                </CallProxy>
              </SessionProvider>
            </BackgroundProvider>
          </BackgroundView>
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
