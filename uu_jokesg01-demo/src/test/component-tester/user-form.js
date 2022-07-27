//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect } from "uu5g05-forms";
import Config from "./config/config.js";
import LsiData from "./user-form-lsi";
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

const UserForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserForm",
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
    const initUserRef = useRef(props.user);

    function handleChange(event, name) {
      let user = { ...props.user };
      user[name] = event.data.value === "undefined" ? undefined : event.data.value;
      props.onSubmit(user);
    }

    function handleReset() {
      props.onSubmit(initUserRef.current);
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
          value={props.user.authenticated}
          label={LsiData.authenticated}
          itemList={[{ value: true }, { value: false }]}
          onChange={(e) => handleChange(e, "authenticated")}
        />
        <SwitchSelect
          value={props.user.authorized}
          label={LsiData.authorized}
          itemList={[{ value: true, children: "auto" }, { value: false }]}
          onChange={(e) => handleChange(e, "authorized")}
        />
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UserForm };
export default UserForm;
//@@viewOff:exports
