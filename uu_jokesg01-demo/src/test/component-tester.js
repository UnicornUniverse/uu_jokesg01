//@@viewOn:imports
import { createVisualComponent, Utils, useState, useScreenSize, useSession } from "uu5g05";
import { Box, Button, Tabs, useSpacing } from "uu5g05-elements";
import Config from "./config/config.js";
import TestEnvironment from "./test-environment.js";
import PropertyForm from "./component-tester/property-form";
import EnvironmentForm from "./component-tester/environment-form";
import UserForm from "./component-tester/user-form";
import CallsForm from "./component-tester/calls-form.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: (screenSize) =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: ["xs", "s"].includes(screenSize)
        ? `[left]  
          [right]`
        : "[left] 70% [right] 30%",
    }),
  leftColumn: ({ spaceB }) => Config.Css.css({ padding: spaceB }),
  rightColumn: ({ spaceB }) => Config.Css.css({ paddingTop: spaceB }),
  component: () => Config.Css.css({ display: "block", margin: "auto" }),
  form: ({ spaceB }) => Config.Css.css({ margin: spaceB }),
  reloadButton: () => Config.Css.css({ width: "100%" }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const ComponentTester = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ComponentTester",
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
    const session = useSession();
    const [screenSize] = useScreenSize();
    const [refreshKey, setRefreshKey] = useState(() => Utils.String.generateId());

    const [properties, setProperties] = useState({
      ...props.component.defaultProps,
      ...props.componentProps,
    });

    const [environment, setEnvironment] = useState({
      isHome: false,
      language: "en-gb",
      background: "light",
    });

    const [user, setUser] = useState({
      authenticated: session.state === "authenticated",
      authorized: true,
    });

    const [calls, setCalls] = useState({
      isError: false,
    });
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(screenSize));

    const propertyForm = (
      <Box significance="distinct">
        <PropertyForm
          componentProps={properties}
          onSubmit={(properties) => setProperties(properties)}
          className={Css.form(spacing)}
        />
      </Box>
    );

    const environmentForm = (
      <Box significance="distinct">
        <EnvironmentForm
          environment={environment}
          onSubmit={(environment) => setEnvironment(environment)}
          className={Css.form(spacing)}
        />
      </Box>
    );

    const userForm = (
      <Box significance="distinct">
        <UserForm user={user} onSubmit={(user) => setUser(user)} className={Css.form(spacing)} />
      </Box>
    );

    const callsForm = (
      <Box significance="distinct">
        <CallsForm calls={calls} onSubmit={(calls) => setCalls(calls)} className={Css.form(spacing)} />
      </Box>
    );

    return (
      <div {...attrs}>
        <div className={Css.leftColumn(spacing)}>
          <TestEnvironment
            component={props.component}
            environment={environment}
            componentProps={properties}
            user={user}
            calls={calls}
            refreshKey={refreshKey}
          />
        </div>

        <div className={Css.rightColumn(spacing)}>
          <Tabs
            itemList={[
              {
                label: "Properties",
                children: propertyForm,
              },
              {
                label: "Environment",
                children: environmentForm,
              },
              {
                label: "User",
                children: userForm,
              },
              {
                label: "Calls",
                children: callsForm,
              },
            ]}
          />
          <Button
            onClick={() => setRefreshKey(Utils.String.generateId())}
            className={Css.reloadButton()}
            colorScheme="primary"
          >
            Remount
          </Button>
        </div>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ComponentTester };
export default ComponentTester;
//@@viewOff:exports
