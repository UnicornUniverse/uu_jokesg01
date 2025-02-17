//@@viewOn:imports
import { createVisualComponent, useLsi } from "uu5g05";
import { Button, useModal } from "uu5g05-elements";
import { AwidAbout } from "uu_plus4u5g02-elements";
import Config from "./config/config.js";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

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
    const lsi = useLsi(importLsi, [AboutButton.uu5Tag]);
    const [modalProps, modalOpen] = useModal();
    //@@viewOff:private

    //@@viewOn:render
    const name = lsi.about;

    return (
      <>
        <Button {...props} onClick={() => modalOpen()}>
          {name}
        </Button>
        {modalProps.open && <AwidAbout {...modalProps} displayAsModal subtitle={name} />}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { AboutButton };
export default AboutButton;
//@@viewOff:exports
