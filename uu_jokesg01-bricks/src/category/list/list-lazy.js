//@@viewOn:imports
import { createComponent, useMemo, Utils } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { Category } from "uu_jokesg01-core";
import EditModal from "./edit-modal.js";
import Statics from "./statics.js";
//@@viewOff:imports

let List = createComponent({
  //@@viewOn:statics
  ...Statics,
  nestingLevel: Category.List.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Category.List.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Category.List.defaultProps,
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:private
    const refreshKey = useMemo(
      () => Utils.String.generateId(),
      // The component must be remounted when at least one property used for internal state initialization is modified in edit mode
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      [props.sorterList, props.serieList],
    );
    //@@viewOff:private

    //@@viewOn:render
    return <Category.List key={refreshKey} {...props} />;
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
