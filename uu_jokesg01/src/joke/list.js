//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Core, Joke } from "uu_jokesg01-core";
import Config from "./config/config";
import EditModal from "./list/edit-modal";
//@@viewOff:imports

let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",

  editMode: {
    displayType: "block",
    customEdit: true,
    lazy: true,
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: { ...Joke.List.propTypes },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  // Brick has limited row count by default
  defaultProps: { ...Joke.List.defaultProps, rowCount: 2 },
  //@@viewOff:defaultProps

  //@@viewOn:render
  render(props) {
    // ISSUE Uu5g05 - Missing utility to convert margin property to CSS class
    // https://uuapp.plus4u.net/uu-sls-maing01/e80acdfaeb5d46748a04cfc7c10fdf4e/issueDetail?id=6213b1f8572961002975d2ce
    const { editMode, ...componentProps } = props;

    return (
      <>
        <Joke.List {...componentProps} />
        {editMode?.edit && (
          <EditModal
            componentType={List}
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

List = Core.withErrorBoundary(List, { statics: { editMode: List.editMode } });

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
