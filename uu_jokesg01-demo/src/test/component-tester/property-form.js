//@@viewOn:imports
import { createVisualComponent, Utils, Lsi, useRef } from "uu5g05";
import { Box, Button, useSpacing } from "uu5g05-elements";
import { SwitchSelect, Select, Text } from "uu5g05-forms";
import Config from "../test-environment/config/config.js";
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
      paddingTop: spaceB,
      paddingBottom: spaceB,
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
    const initComponentPropsRef = useRef(props.componentProps);

    function handleChange(event, name) {
      let newProps = { ...props.componentProps };
      newProps[name] = event.data.value === "undefined" ? undefined : event.data.value;
      props.onSubmit(newProps);
    }

    function handleReset() {
      props.onSubmit(initComponentPropsRef.current);
    }
    //@@viewOff:private

    //@@viewOn:render
    const [elementProps] = Utils.VisualComponent.splitProps(props, Css.main(spacing));
    const { componentProps } = props;

    return (
      <Box {...elementProps} significance="distinct">
        <Button colorScheme="primary" onClick={handleReset}>
          <Lsi lsi={LsiData.reset} />
        </Button>
        <SwitchSelect
          value={componentProps.nestingLevel ?? "undefined"}
          label={LsiData.nestingLevel}
          itemList={[
            { value: "inline" },
            { value: "smallBox" },
            { value: "box" },
            { value: "bigBox" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "nestingLevel")}
        />
        <SwitchSelect
          value={componentProps.card ?? "undefined"}
          label={LsiData.card}
          itemList={[
            { value: "none" },
            { value: "full" },
            { value: "content" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          disabled={["inline", "smallBox", "box"].includes(componentProps.nestingLevel)}
          onChange={(e) => handleChange(e, "card")}
        />
        <SwitchSelect
          value={componentProps.level ?? "undefined"}
          label={LsiData.level}
          itemList={[
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          disabled={componentProps.card === "full"}
          onChange={(e) => handleChange(e, "level")}
        />
        <SwitchSelect
          value={componentProps.identificationType ?? "undefined"}
          label={LsiData.identificationType}
          itemList={[
            { value: "none" },
            { value: "basic" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "identificationType")}
        />
        <SwitchSelect
          value={componentProps.significance ?? "undefined"}
          label={LsiData.significance}
          itemList={[
            { value: "common" },
            { value: "highlighted" },
            { value: "distinct" },
            { value: "subdued" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "significance")}
        />
        <SwitchSelect
          value={componentProps.borderRadius}
          label={LsiData.borderRadius}
          itemList={[
            { value: "none" },
            { value: "elementary" },
            { value: "moderate" },
            { value: "expressive" },
            { value: "full" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          disabled={componentProps.nestingLevel === "inline"}
          onChange={(e) => handleChange(e, "borderRadius")}
        />
        <Select
          value={componentProps.colorScheme ?? "undefined"}
          label={LsiData.colorScheme}
          itemList={[
            { value: "dark-blue" },
            { value: "blue" },
            { value: "light-blue" },
            { value: "cyan" },
            { value: "dark-green" },
            { value: "green" },
            { value: "light-green" },
            { value: "lime" },
            { value: "yellow" },
            { value: "orange" },
            { value: "red" },
            { value: "pink" },
            { value: "purple" },
            { value: "dark-purple" },
            { value: "brown" },
            { value: "grey" },
            { value: "steel" },
            { children: <Lsi lsi={LsiData.undefined} />, value: "undefined" },
          ]}
          onChange={(e) => handleChange(e, "colorScheme")}
        />
        <SwitchSelect
          value={componentProps.background ?? "undefined"}
          label={LsiData.background}
          itemList={[
            { value: "light" },
            { value: "dark" },
            { value: "full" },
            { value: "soft" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "background")}
        />
        <Select
          value={componentProps.aspectRatio ?? "undefined"}
          label={LsiData.aspectRatio}
          itemList={[
            { value: "1x1" },
            { value: "1x2" },
            { value: "1x10" },
            { value: "2x1" },
            { value: "2x3" },
            { value: "3x1" },
            { value: "3x2" },
            { value: "3x4" },
            { value: "4x1" },
            { value: "4x3" },
            { value: "4x5" },
            { value: "5x4" },
            { value: "9x16" },
            { value: "10x1" },
            { value: "16x9" },
            { value: "16x10" },
            { value: "45x10" },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          disabled={
            ["inline", "smallBox", "bigBox"].includes(componentProps.nestingLevel) ||
            (componentProps.width?.length > 0 && componentProps.height?.length > 0)
          }
          onChange={(e) => handleChange(e, "aspectRatio")}
        />
        <SwitchSelect
          value={componentProps.size ?? "undefined"}
          label={LsiData.size}
          itemList={[{ value: "s" }, { value: "m" }, { value: "l" }, { value: "undefined" }]}
          disabled={
            ["inline", "bigBox"].includes(componentProps.nestingLevel) ||
            componentProps.width?.length > 0 ||
            !componentProps.aspectRatio
          }
          onChange={(e) => handleChange(e, "size")}
        />
        <Text
          value={componentProps.width}
          label={LsiData.width}
          disabled={
            ["inline", "bigBox"].includes(componentProps.nestingLevel) ||
            (componentProps.aspectRatio && componentProps.height?.length > 0)
          }
          onChange={(e) => handleChange(e, "width")}
        />
        <Text
          value={componentProps.height}
          label={LsiData.height}
          disabled={
            ["inline", "smallBox", "bigBox"].includes(componentProps.nestingLevel) ||
            (componentProps.aspectRatio && componentProps.width?.length > 0)
          }
          onChange={(e) => handleChange(e, "height")}
        />
        <SwitchSelect
          value={componentProps.disabled ?? "undefined"}
          label={LsiData.disabled}
          itemList={[
            { value: true, children: <Lsi lsi={LsiData.true} /> },
            { value: false, children: <Lsi lsi={LsiData.false} /> },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "disabled")}
        />
        <SwitchSelect
          value={componentProps.hidden ?? "undefined"}
          label={LsiData.hidden}
          itemList={[
            { value: true, children: <Lsi lsi={LsiData.true} /> },
            { value: false, children: <Lsi lsi={LsiData.false} /> },
            { value: "undefined", children: <Lsi lsi={LsiData.undefined} /> },
          ]}
          onChange={(e) => handleChange(e, "hidden")}
        />
      </Box>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { PropertyForm };
export default PropertyForm;
//@@viewOff:exports
