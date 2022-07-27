//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config.js";
import LsiData from "./calls-form-lsi";
//@@viewOff:imports

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

const CallsForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CallsForm",
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
    const initCallsRef = useRef(props.calls);

    function handleChange(event, name) {
      let calls = { ...props.user };
      calls[name] = event.data.value === "undefined" ? undefined : event.data.value;
      props.onSubmit(calls);
    }

    function handleReset() {
      props.onSubmit(initCallsRef.current);
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
          value={props.calls.isError}
          label={LsiData.isError}
          itemList={[{ value: false }, { value: true }]}
          onChange={(e) => handleChange(e, "isError")}
        />
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CallsForm };
export default CallsForm;
//@@viewOff:exports
