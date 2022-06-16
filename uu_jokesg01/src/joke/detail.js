//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Core, Joke } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./detail/edit-modal";
//@@viewOff:imports

let Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",

  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: { ...Joke.Detail.propTypes },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { ...Joke.Detail.defaultProps },
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    // ISSUE Uu5g05 - Missing utility to convert margin property to CSS class
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6213b1f8572961002975d2ce
    const { editMode, ...componentProps } = props;

    return (
      <>
        <Joke.Detail {...componentProps} />
        {editMode?.edit && (
          <EditModal
            componentType={Detail}
            componentProps={componentProps}
            onSave={editMode.onEditEnd}
            onClose={editMode.onEditEnd}
            onReady={editMode.onReady}
          />
        )}
      </>
    );
  },
  //@@viewOff:render
});

Detail = Core.withErrorBoundary(Detail);

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
