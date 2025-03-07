//@@viewOn:imports
import { createVisualComponent, useMemo, Utils } from "uu5g05";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { Joke } from "uu_jokesg01-core";
import EditModal from "./edit-modal.js";
import Statics from "./statics.js";
//@@viewOff:imports

let Detail = createVisualComponent({
  //@@viewOn:statics
  ...Statics,
  nestingLevel: Joke.Detail.nestingLevel,
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    ...Joke.Detail.propTypes,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    ...Joke.Detail.defaultProps,
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:private
    const refreshKey = useMemo(
      () => Utils.String.generateId(),
      // The component must be remounted when at least one property used for internal state initialization is modified in edit mode
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      [
        props.baseUri,
        props.oid,
        props.showAuthor,
        props.showCategories,
        props.showCreationTime,
        props.hideConfiguration,
      ],
    );
    //@@viewOff:private

    //@@viewOn:render
    return <Joke.Detail key={refreshKey} {...props} />;
    //@@viewOff:render
  },
});

Detail = withMargin(Detail);
Detail = withEditModal(Detail, EditModal);
Detail = withErrorBoundary(Detail);

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
