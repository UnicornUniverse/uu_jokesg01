//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "../test-environment/config/config.js";
import LsiData from "./environment-form-lsi";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: ({ spaceB }) =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      gap: spaceB,
      paddingTop: spaceB,
      paddingBottom: spaceB,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const EnvironmentForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EnvironmentForm",
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
    const initEnvironmentRef = useRef(props.environment);

    function handleChange(event, name) {
      let environment = { ...props.environment };
      environment[name] = event.data.value === "undefined" ? undefined : event.data.value;
      props.onSubmit(environment);
    }

    function handleReset() {
      props.onSubmit(initEnvironmentRef.current);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main(spacing));

    return (
      <Box {...elementProps} significance="distinct">
        <Button colorScheme="primary" onClick={handleReset}>
          <Lsi lsi={LsiData.reset} />
        </Button>
        <SwitchSelect
          value={props.environment.isHome}
          label={LsiData.isHome}
          itemList={[
            { value: false, children: <Lsi lsi={LsiData.false} /> },
            { value: true, children: <Lsi lsi={LsiData.true} /> },
          ]}
          onChange={(e) => handleChange(e, "isHome")}
        />
        <SwitchSelect
          value={props.environment.language}
          label={LsiData.language}
          itemList={[{ value: "en-gb" }, { value: "cs-cz" }]}
          onChange={(e) => handleChange(e, "language")}
        />
        <SwitchSelect
          value={props.environment.background}
          label={LsiData.background}
          itemList={[{ value: "light" }, { value: "dark" }, { value: "full" }, { value: "soft" }]}
          onChange={(e) => handleChange(e, "background")}
        />
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EnvironmentForm };
export default EnvironmentForm;
//@@viewOff:exports
