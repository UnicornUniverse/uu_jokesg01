//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Core, Jokes } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./basic-info/edit-modal";
//@@viewOff:imports

let BasicInfo = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "BasicInfo",

  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: { ...Jokes.BasicInfo.propTypes },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { ...Jokes.BasicInfo.defaultProps },
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    // ISSUE Uu5g05 - Missing utility to convert margin property to CSS class
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6213b1f8572961002975d2ce
    const { editMode, ...componentProps } = props;

    return (
      <>
        <Jokes.BasicInfo {...componentProps} />
        {editMode?.edit && (
          <EditModal
            props={componentProps}
            onClose={(newProps) => {
              editMode.onEditEnd({ props: newProps });
            }}
          />
        )}
      </>
    );
  },
  //@@viewOff:render
});

BasicInfo = Core.withErrorBoundary(BasicInfo);

//@@viewOn:exports
export { BasicInfo };
export default BasicInfo;
//@@viewOff:exports
