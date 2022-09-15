//@@viewOn:imports
import { Joke } from "uu_jokesg01-core";
import { withErrorBoundary } from "uu_plus4u5g02-elements";
import { withEditModal, withMargin } from "uu5g05-bricks-support";
import EditModal from "./detail/edit-modal";
//@@viewOff:imports

let Detail = Joke.Detail;
Detail = withMargin(Detail);
Detail = withEditModal(Detail, EditModal);
Detail = withErrorBoundary(Detail);

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
