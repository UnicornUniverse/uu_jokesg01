//@@viewOn:imports
import { createVisualComponent, Utils, useLsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config.js";
import importLsi from "../../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants

//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: (spacing) =>
    Config.Css.css({
      display: "flex",
      flexDirection: "column",
      gap: spacing.c,
      paddingTop: spacing.c,
      paddingBottom: spacing.c,
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
    const lsi = useLsi(importLsi, [EnvironmentForm.uu5Tag]);
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
    const { elementProps } = Utils.VisualComponent.splitProps(props, Css.main(spacing));

    return (
      <Box {...elementProps} significance="distinct">
        <Button colorScheme="primary" onClick={handleReset}>
          {lsi.reset}
        </Button>
        <SwitchSelect
          value={props.environment.isHome}
          label={lsi.isHome}
          itemList={[
            { value: false, children: lsi.false },
            { value: true, children: lsi.true },
          ]}
          onChange={(e) => handleChange(e, "isHome")}
        />
        <SwitchSelect
          value={props.environment.language}
          label={lsi.language}
          itemList={[{ value: "en-gb" }, { value: "cs-cz" }]}
          onChange={(e) => handleChange(e, "language")}
        />
        <SwitchSelect
          value={props.environment.background}
          label={lsi.background}
          itemList={[{ value: "light" }, { value: "dark" }, { value: "full" }, { value: "soft" }]}
          onChange={(e) => handleChange(e, "background")}
        />
        <SwitchSelect
          value={props.environment.spacing}
          label={lsi.spacing}
          itemList={[{ value: "tight" }, { value: "normal" }, { value: "loose" }]}
          onChange={(e) => handleChange(e, "spacing")}
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
