//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponentWithRef, PropTypes, Lsi, useRef, useImperativeHandle } from "uu5g05";
import { Text, useSpacing } from "uu5g05-elements";
import "uu5g04-bricks";
import Config from "./config/config";
import LsiData from "./edit-modal-lazy-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  infoMessage: ({ spaceD }) =>
    Config.Css.css({
      display: "block",
      marginTop: spaceD,
      color: "rgba(0, 0, 0, 0.34)",
      fontStyle: "italic",
    }),
};
//@viewOff:css

//@@viewOn:helpers
function InfoMessage(props) {
  const spacing = useSpacing();

  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      className={Css.infoMessage(spacing)}
    >
      {props.children}
    </Text>
  );
}
//@@viewOff:helpers

//TODO MFA - Add documentation link to info header
const EditModalLazy = createComponentWithRef({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditModalLazy",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    props: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ props, onClose }, ref) {
    //@@viewOn:private
    const modalRef = useRef();

    function handleChange(opt) {
      const newProps = { ...opt.componentProps };

      // Property level make sense only for card none and content
      if (opt.componentProps.card === "full" && opt.componentProps.level) {
        newProps.level = undefined;
      }

      for (const key in newProps) {
        if (Object.hasOwnProperty.call(newProps, key)) {
          if (newProps[key] === "undefined") {
            delete newProps[key];
          }
        }
      }

      opt.componentProps = newProps;
    }
    //@@viewOff:private

    //@@viewOn:interface
    useImperativeHandle(ref, () => ({
      getPropsToSave: () => modalRef.current.getPropsToSave(),
    }));
    //@@viewOff:interface

    //@@viewOn:render

    // ISSUE Uu5g05 - No alternative for UU5.BricksEditable.Modal
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=61ec02e4572961002969f577

    return (
      <UU5.BricksEditable.Modal
        header={<Lsi lsi={LsiData.header} />}
        shown
        onChange={handleChange}
        onClose={onClose}
        componentName={"UuJokes.Joke.Detail"}
        componentProps={props}
        componentPropsForm={[
          {
            name: <Lsi lsi={LsiData.properties} />,
            setup: [
              {
                name: "baseUri",
                type: "text",
                label: LsiData.baseUri,
                required: true,
              },
              {
                name: "oid",
                type: "text",
                label: LsiData.oid,
                required: true,
              },
            ],
            info: <Lsi lsi={LsiData.info} params={[]} />,
          },
          {
            name: <Lsi lsi={LsiData.margin} />,
            setup: [
              {
                name: "margin",
                type: "margin",
                label: LsiData.margin,
              },
            ],
            info: <Lsi lsi={LsiData.info} params={[]} />,
          },
          {
            name: <Lsi lsi={LsiData.configuration} />,
            setup: [
              {
                name: "showCategories",
                type: "bool",
                label: LsiData.showCategories,
                getProps: () => {
                  return {
                    type: 1,
                    bgStyleChecked: "filled",
                    labelColWidth: "xs-6",
                    inputColWidth: "xs-6",
                  };
                },
              },
              {
                name: "showAuthor",
                type: "bool",
                label: LsiData.showAuthor,
                getProps: () => {
                  return {
                    type: 1,
                    bgStyleChecked: "filled",
                    labelColWidth: "xs-6",
                    inputColWidth: "xs-6",
                  };
                },
              },
              {
                name: "showCreationTime",
                type: "bool",
                label: LsiData.showCreationTime,
                getProps: () => {
                  return {
                    type: 1,
                    bgStyleChecked: "filled",
                    labelColWidth: "xs-6",
                    inputColWidth: "xs-6",
                  };
                },
              },
              {
                type: "separator",
              },
              {
                name: "disableUserPreference",
                type: "bool",
                label: LsiData.disableUserPreference,
                getProps: () => {
                  return {
                    type: 1,
                    bgStyleChecked: "filled",
                    labelColWidth: "xs-6",
                    inputColWidth: "xs-6",
                  };
                },
              },
            ],
            info: <Lsi lsi={LsiData.configurationInfo} params={[]} />,
          },
          {
            name: <Lsi lsi={LsiData.visual} />,
            setup: [
              {
                name: "identificationType",
                type: "switchSelector",
                label: LsiData.identificationType,
                getProps: (opt, componentProps) => ({
                  items: [
                    { content: "auto", value: "undefined" },
                    { content: <Lsi lsi={LsiData.none} />, value: "none" },
                    { content: <Lsi lsi={LsiData.basic} />, value: "basic" },
                  ],
                  value: componentProps.identificationType ?? "undefined",
                }),
              },
              {
                name: "card",
                type: "switchSelector",
                label: LsiData.card,
                getProps: () => {
                  return {
                    items: [
                      { content: "full", value: "full" },
                      { content: "content", value: "content" },
                      { content: "none", value: "none" },
                    ],
                  };
                },
              },
              {
                name: "colorScheme",
                type: "switchSelector",
                label: LsiData.colorScheme,
                getProps: (opt, componentProps) => {
                  return {
                    items: [
                      { content: "dark-blue", value: "dark-blue" },
                      { content: "blue", value: "blue" },
                      { content: "light-blue", value: "light-blue" },
                      { content: "cyan", value: "cyan" },
                      { content: "dark-green", value: "dark-green" },
                      { content: "green", value: "green" },
                      { content: "light-green", value: "light-green" },
                      { content: "lime", value: "lime" },
                      { content: "yellow", value: "yellow" },
                      { content: "orange", value: "orange" },
                      { content: "red", value: "red" },
                      { content: "pink", value: "pink" },
                      { content: "purple", value: "purple" },
                      { content: "dark-purple", value: "dark-purple" },
                      { content: "brown", value: "brown" },
                      { content: "grey", value: "grey" },
                      { content: "steel", value: "steel" },
                      { content: <Lsi lsi={LsiData.default} />, value: "undefined" },
                    ],
                    value: componentProps.colorScheme ?? "undefined",
                  };
                },
              },
              {
                name: "significance",
                type: "switchSelector",
                label: LsiData.significance,
                getProps: () => {
                  return {
                    items: [{ value: "common" }, { value: "highlighted" }, { value: "distinct" }, { value: "subdued" }],
                  };
                },
              },
              {
                name: "borderRadius",
                type: "switchSelector",
                label: LsiData.borderRadius,
                getProps: () => {
                  return {
                    items: [
                      { value: "none" },
                      { value: "elementary" },
                      { value: "moderate" },
                      { value: "expressive" },
                      { value: "full" },
                    ],
                  };
                },
              },
              {
                name: "aspectRatio",
                type: "switchSelector",
                label: LsiData.aspectRatio,
                getProps: (opt, componentProps) => {
                  return {
                    items: [
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
                      { content: <Lsi lsi={LsiData.none} />, value: "undefined" },
                    ],
                    value: componentProps.aspectRatio ?? "undefined",
                    disabled: componentProps.width?.length > 0 && componentProps.height?.length > 0,
                  };
                },
              },
              [
                {
                  name: "width",
                  type: "text",
                  label: LsiData.width,
                  getProps: (opt, componentProps) => {
                    return {
                      disabled: componentProps.aspectRatio && componentProps.height?.length > 0,
                    };
                  },
                },
                {
                  name: "height",
                  type: "text",
                  label: LsiData.height,
                  getProps: (opt, componentProps) => {
                    return {
                      disabled: componentProps.aspectRatio && componentProps.width?.length > 0,
                    };
                  },
                },
              ],
              () => (
                <InfoMessage>
                  <Lsi lsi={LsiData.widthHeightMessage} />
                </InfoMessage>
              ),
              {
                name: "size",
                type: "switchSelector",
                label: LsiData.size,
                getProps: () => {
                  return {
                    items: [{ value: "s" }, { value: "m" }, { value: "l" }],
                  };
                },
              },
            ],
            info: <Lsi lsi={LsiData.info} />,
          },
          {
            name: <Lsi lsi={LsiData.advancedConfiguration} />,
            setup: [
              {
                name: "uu5Id",
                type: "text",
                label: LsiData.uu5Id,
                getProps: (opt, componentProps) => {
                  return {
                    pattern: "^[0-9a-zA-Z_]{3,32}$",
                    patternMessage: <Lsi lsi={LsiData.invaliduu5Id} />,
                    required: !componentProps.disableUserPreference,
                  };
                },
              },
              {
                name: "level",
                type: "switchSelector",
                label: LsiData.level,
                getProps: (opt, componentProps) => {
                  return {
                    items: [
                      { content: "auto", value: "undefined" },
                      { value: 1 },
                      { value: 2 },
                      { value: 3 },
                      { value: 4 },
                      { value: 5 },
                    ],
                    value: componentProps.level ?? "undefined",
                    disabled: componentProps.card === "full",
                  };
                },
              },
            ],
            info: <Lsi lsi={LsiData.advancedConfigurationInfo} params={[]} />,
          },
        ]}
        ref_={modalRef}
      />
    );
    //@@viewOff:render
  },
});

//viewOn:exports
export default EditModalLazy;
//viewOff:exports
