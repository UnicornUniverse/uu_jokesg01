//@@viewOn:imports
import { createVisualComponent, useMemo, Utils } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { Joke } from "uu_jokesg01-core";
import EditModal from "./edit-modal.js";
import Statics from "./statics.js";
//@@viewOff:imports

let List = createVisualComponent({
  //@@viewOn:statics
  ...Statics,
  nestingLevel: Joke.List.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Joke.List.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Joke.List.defaultProps,
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:private
    const refreshKey = useMemo(
      () => Utils.String.generateId(),
      // The component must be remounted when at least one property used for internal state initialization is modified in edit mode
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      [props.filterList, props.sorterList],
    );
    //@@viewOff:private

    //@@viewOn:render
    return <Joke.List key={refreshKey} {...props} />;
    //@@viewOff:render
  },
});

List = withMargin(List);
List = withEditModal(List, EditModal);
List = withErrorBoundary(List);

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
