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
                name: "contextType",
                type: "switchSelector",
                label: <Lsi lsi={LsiData.contextType} />,
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
                label: <Lsi lsi={LsiData.cardView} />,
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
            info: <Lsi lsi={LsiData.info} />,
          },
        ]}
        ref_={modalRef}
      />
    );
    //@@viewOff:render
  },
});

export default EditModalLazy;
