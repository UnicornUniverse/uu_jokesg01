//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config.js";
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
            { value: true, children: <Lsi lsi={LsiData.true} /> },
            { value: false, children: <Lsi lsi={LsiData.false} /> },
          ]}
          onChange={(e) => handleChange(e, "isHome")}
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
