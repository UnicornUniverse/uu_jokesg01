//@@viewOn:imports
import { createVisualComponent, Utils } from "uu5g05";
import { useSpacing } from "uu5g05-elements";
import { Form, FormSwitchSelect } from "uu5g05-forms";
import Config from "./config/config.js";
import LsiData from "./property-form-lsi";
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
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const PropertyForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "PropertyForm",
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

    function handleChange(event) {
      props.onSubmit(event.data.form.valueMap);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main(spacing));
    const { componentProps } = props;

    return (
      <Form {...elementProps}>
        <FormSwitchSelect
          name="nestingLevel"
          initialValue={componentProps.nestingLevel}
          label={LsiData.nestingLevel}
          itemList={[{ value: "inline" }, { value: "smallBox" }, { value: "box" }, { value: "bigBox" }]}
          onChange={handleChange}
        />
        <FormSwitchSelect
          name="significance"
          initialValue={componentProps.significance}
          label={LsiData.significance}
          itemList={[{ value: "common" }, { value: "highlighted" }, { value: "distinct" }, { value: "subdued" }]}
          onChange={handleChange}
        />
      </Form>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PropertyForm };
export default PropertyForm;
//@@viewOff:exports
