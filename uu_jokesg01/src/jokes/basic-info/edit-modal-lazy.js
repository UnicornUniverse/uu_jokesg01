//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponentWithRef, PropTypes, Lsi, useRef, useImperativeHandle } from "uu5g05";
import "uu5g04-bricks";
import Config from "./config/config";
import LsiData from "./edit-modal-lazy-lsi";
//@@viewOff:imports

export const EditModalLazy = createComponentWithRef({
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
      if (opt.componentProps.card === "full" && opt.componentProps.level) {
        const newProps = { ...opt.componentProps, level: undefined };
        opt.componentProps = newProps;
      }
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
        componentName={"UuJokes.Jokes.BasicInfo"}
        componentProps={props}
        componentPropsForm={[
          {
            name: <Lsi lsi={LsiData.properties} />,
            setup: [
              {
                name: "baseUri",
                type: "text",
                label: <Lsi lsi={LsiData.baseUri} />,
                required: true,
              },
            ],
            info: (
              <Lsi
                lsi={LsiData.info}
                params={[
                  "https://uuapp.plus4u.net/uu-bookkit-maing01/78462435-71f8d7b5cfdc4336b0abfe47b3cb237b/book/page?code=UuJokesJokesEditModalLazy",
                ]}
              />
            ),
          },
          {
            name: <Lsi lsi={LsiData.visual} />,
            setup: [
              {
                name: "identificationType",
                type: "switchSelector",
                label: LsiData.identificationType,
                getProps: () => ({
                  items: [
                    // ISSUE UU5.Forms.EditableModal - "switchSelector" doesn't support value undefined
                    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6208d44357296100297268b6
                    { content: <Lsi lsi={LsiData.default} />, value: undefined },
                    { content: <Lsi lsi={LsiData.none} />, value: "none" },
                    { content: <Lsi lsi={LsiData.basic} />, value: "basic" },
                  ],
                }),
              },
              {
                name: "card",
                type: "switchSelector",
                label: LsiData.card,
                getProps: () => {
                  return {
                    items: [
                      { content: "none", value: "none" },
                      { content: "full", value: "full" },
                      { content: "content", value: "content" },
                    ],
                  };
                },
              },
              {
                name: "colorScheme",
                type: "switchSelector",
                label: LsiData.colorScheme,
                getProps: () => {
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
                    ],
                  };
                },
              },
              {
                name: "significance",
                type: "switchSelector",
                label: LsiData.significance,
                getProps: () => {
                  return {
                    items: [
                      { content: "common", value: "common" },
                      { content: "highlighted", value: "highlighted" },
                      { content: "distinct", value: "distinct" },
                      { content: "subdued", value: "subdued" },
                    ],
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
                      { content: "none", value: "none" },
                      { content: "elementary", value: "elementary" },
                      { content: "moderate", value: "moderate" },
                      { content: "expressive", value: "expressive" },
                    ],
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
                name: "background",
                type: "switchSelector",
                label: LsiData.background,
                getProps: () => {
                  return {
                    items: [
                      { content: "light", value: "light" },
                      { content: "dark", value: "dark" },
                      { content: "full", value: "full" },
                      { content: "soft", value: "soft" },
                    ],
                  };
                },
              },
              {
                name: "level",
                type: "number",
                label: LsiData.level,
                getProps: (opt, componentProps) => {
                  return {
                    min: 1,
                    max: 5,
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

export default EditModalLazy;
