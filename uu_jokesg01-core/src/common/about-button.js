//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";

import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  buttonBlock: () =>
    Config.Css.css({
      display: "block",
      width: "100%",
      marginTop: Uu5Elements.UuGds.SpacingPalette.getValue(["fixed", "c"]),
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const AboutButton = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "AboutButton",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [modalProps, modalOpen] = Uu5Elements.useModal();
    const lsi = useLsi(importLsi, ["UuJokesCore.Common.AboutButton"]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const name = lsi.about;

    debugger;
    return (
      <>
        <Uu5Elements.Button {...props} className={Css.buttonBlock()} onClick={() => modalOpen()}>
          {name}
        </Uu5Elements.Button>
        {modalProps.open && <Plus4U5Elements.AwidAbout {...modalProps} displayAsModal subtitle={name} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AboutButton };
export default AboutButton;
//@@viewOff:exports
