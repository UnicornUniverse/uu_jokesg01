//@@viewOn:imports
import * as UU5 from "uu5g04";
import { createComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import "uu5g04-bricks";
import Config from "./config/config";
import Lsi from "./edit-modal-lazy-lsi";
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
    props: UU5.PropTypes.object,
    onClose: UU5.PropTypes.func,
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
    return (
      <UU5.BricksEditable.Modal
        header={<UU5.Bricks.Lsi lsi={Lsi.header} />}
        shown
        onClose={onClose}
        componentName={"UuJokes.Joke.Detail"}
        componentProps={props}
        componentPropsForm={[
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.properties} />,
            setup: [
              {
                name: "baseUri",
                type: "text",
                label: Lsi.baseUri,
                required: true,
              },
              {
                name: "jokeId",
                type: "text",
                label: Lsi.jokeId,
                required: true,
              },
            ],
            info: <UU5.Bricks.Lsi lsi={Lsi.info} params={[]} />,
          },
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.configuration} />,
            setup: [
              {
                name: "showCategories",
                type: "bool",
                label: Lsi.showCategories,
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
                label: Lsi.showAuthor,
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
                label: Lsi.showCreationTime,
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
                label: Lsi.disableUserPreference,
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
            info: <UU5.Bricks.Lsi lsi={Lsi.configurationInfo} params={[]} />,
          },
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.visual} />,
            setup: [
              {
                name: "contextType",
                type: "switchSelector",
                label: Lsi.contextType,
                getProps: () => ({
                  items: [
                    { content: <UU5.Bricks.Lsi lsi={Lsi.none} />, value: "none" },
                    { content: <UU5.Bricks.Lsi lsi={Lsi.basic} />, value: "basic" },
                    { content: <UU5.Bricks.Lsi lsi={Lsi.full} />, value: "full" },
                  ],
                }),
              },
              {
                name: "cardView",
                type: "switchSelector",
                label: Lsi.cardView,
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
                label: Lsi.colorSchema,
              },
              {
                name: "bgStyle",
                type: "bgStyle",
                label: Lsi.bgStyle,
              },
              {
                name: "elevation",
                type: "elevation",
                label: Lsi.elevation,
              },
              {
                name: "borderRadius",
                type: "borderRadius",
                label: Lsi.borderRadius,
              },
            ],
            info: <UU5.Bricks.Lsi lsi={Lsi.info} />,
          },
          {
            name: <UU5.Bricks.Lsi lsi={Lsi.advancedConfiguration} />,
            setup: [
              {
                name: "uu5Id",
                type: "text",
                label: Lsi.uu5Id,
                getProps: (opt, componentProps) => {
                  return {
                    pattern: "^[0-9a-zA-Z_]{3,32}$",
                    patternMessage: <UU5.Bricks.Lsi lsi={Lsi.invaliduu5Id} />,
                    required: !componentProps.disableUserPreference,
                  };
                },
              },
            ],
            info: <UU5.Bricks.Lsi lsi={Lsi.advancedConfigurationInfo} params={[]} />,
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
