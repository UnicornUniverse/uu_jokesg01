//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponentWithRef, PropTypes, Lsi, useRef, useImperativeHandle } from "uu5g05";
import "uu5g04-bricks";
import Config from "./config/config";
import LsiData from "./edit-modal-lazy-lsi";
//@@viewOff:imports

//TODO MFA - Add documentation link to info header

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EditModalLazy",
  //@@viewOff:statics
};

const EditModalLazy = createComponentWithRef({
  ...STATICS,

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
                name: "jokeId",
                type: "text",
                label: LsiData.jokeId,
                required: true,
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
                name: "contextType",
                type: "switchSelector",
                label: LsiData.contextType,
                getProps: () => ({
                  items: [
                    { content: <Lsi lsi={LsiData.none} />, value: "none" },
                    { content: <Lsi lsi={LsiData.basic} />, value: "basic" },
                    { content: <Lsi lsi={LsiData.full} />, value: "full" },
                  ],
                }),
              },
              {
                name: "cardView",
                type: "switchSelector",
                label: LsiData.cardView,
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
                name: "colorSchema",
                type: "colorSchema",
                label: LsiData.colorSchema,
              },
              {
                name: "bgStyle",
                type: "bgStyle",
                label: LsiData.bgStyle,
              },
              {
                name: "elevation",
                type: "elevation",
                label: LsiData.elevation,
              },
              {
                name: "borderRadius",
                type: "borderRadius",
                label: LsiData.borderRadius,
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
