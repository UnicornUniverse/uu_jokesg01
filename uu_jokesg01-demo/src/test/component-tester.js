//@@viewOn:imports
import { createVisualComponent, Utils, useState, useScreenSize } from "uu5g05";
import { Box, Tabs, useSpacing } from "uu5g05-elements";
import { SpaProvider } from "uu_plus4u5g02";
import { Core } from "uu_jokesg01-core";
import Config from "./config/config.js";
import PropertyForm from "./component-tester/property-form";
import EnvironmentForm from "./component-tester/environment-form";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: ({ spaceA }, screenSize) =>
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
    const [screenSize] = useScreenSize();

    const { component: Component, componentProps } = props;
    const [properties, setProperties] = useState({
      ...Component.defaultProps,
      ...componentProps,
    });

    const [environment, setEnvironment] = useState({
      isHome: false,
    });

    function handlePropertyFormSubmit(properties) {
      setProperties(properties);
    }

    function handleEnvironmentFormSubmit(environment) {
      setEnvironment(environment);
    }
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main(spacing, screenSize));

    const propertyForm = (
      <Box significance="distinct">
        <PropertyForm componentProps={properties} onSubmit={handlePropertyFormSubmit} className={Css.form(spacing)} />
      </Box>
    );

    const environmentForm = (
      <Box significance="distinct">
        <EnvironmentForm
          environment={environment}
          onSubmit={handleEnvironmentFormSubmit}
          className={Css.form(spacing)}
        />
      </Box>
    );

    return (
      <div {...attrs}>
        <div className={Css.leftColumn(spacing)}>
          <SpaProvider baseUri={environment.isHome ? componentProps.baseUri : ""} skipAppWorkspaceProvider>
            <Core.ErrorBoundary>
              <Component {...componentProps} {...properties} className={Css.component(spacing)} />
            </Core.ErrorBoundary>
          </SpaProvider>
        </div>

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
          ]}
          className={Css.rightColumn(spacing)}
        />
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ComponentTester };
export default ComponentTester;
//@@viewOff:exports
