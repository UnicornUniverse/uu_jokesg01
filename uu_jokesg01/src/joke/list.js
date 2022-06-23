//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { Joke } from "uu_jokesg01-core";
import { withEditMode, withErrorBoundary, withMargin } from "../core/core";
import Config from "../config/config";
import EditModal from "./list/edit-modal";
//@@viewOff:imports

let List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
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
    return <Joke.List {...props} />;
  },
  //@@viewOff:render
});

List = withMargin(List);
List = withEditMode(List, EditModal);
List = withErrorBoundary(List);

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
